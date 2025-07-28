import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Glare } from './Glare';

// Mock requestAnimationFrame and cancelAnimationFrame
const mockRequestAnimationFrame = vi.fn();
const mockCancelAnimationFrame = vi.fn();
global.requestAnimationFrame = mockRequestAnimationFrame;
global.cancelAnimationFrame = mockCancelAnimationFrame;

// Mock getBoundingClientRect
const mockGetBoundingClientRect = vi.fn();

describe('Glare 컴포넌트 테스트 코드', () => {
  let parentRef: React.RefObject<HTMLDivElement>;
  let parentElement: HTMLDivElement;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    mockRequestAnimationFrame.mockImplementation((callback) => {
      callback();
      return 1;
    });

    // Create parent element and ref
    parentElement = document.createElement('div');
    parentRef = createRef<HTMLDivElement>();
    (parentRef as any).current = parentElement;

    // Mock getBoundingClientRect with default values
    mockGetBoundingClientRect.mockReturnValue({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      right: 100,
      bottom: 100,
    });
    parentElement.getBoundingClientRect = mockGetBoundingClientRect;

    // Add parent to DOM
    document.body.appendChild(parentElement);
  });

  afterEach(() => {
    // Clean up DOM
    document.body.innerHTML = '';
  });

  it('정상적으로 렌더링되는지 확인', () => {
    render(<Glare parentRef={parentRef} data-testid="glare" />);
    expect(screen.getByTestId('glare')).toBeInTheDocument();
  });

  it('추가 props가 wrapper에 전달되는지 확인', () => {
    render(
      <Glare 
        parentRef={parentRef} 
        data-testid="glare"
        className="custom-class"
        id="glare-id"
      />
    );
    
    const glareElement = screen.getByTestId('glare');
    expect(glareElement).toHaveClass('custom-class');
    expect(glareElement).toHaveAttribute('id', 'glare-id');
  });

  it('children이 올바르게 렌더링되는지 확인', () => {
    render(
      <Glare parentRef={parentRef} data-testid="glare">
        <span>Child content</span>
      </Glare>
    );
    
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('parentRef가 null일 때 크래시하지 않는지 확인', () => {
    const nullRef = createRef<HTMLDivElement>();
    render(<Glare parentRef={nullRef} data-testid="glare" />);
    expect(screen.getByTestId('glare')).toBeInTheDocument();
  });

  it('parentRef.current가 null일 때 크래시하지 않는지 확인', () => {
    const nullRef = { current: null };
    render(<Glare parentRef={nullRef} data-testid="glare" />);
    expect(screen.getByTestId('glare')).toBeInTheDocument();
  });

  it('마운트 시 parent element에 이벤트 리스너가 추가되는지 확인', () => {
    const addEventListenerSpy = vi.spyOn(parentElement, 'addEventListener');
    
    render(<Glare parentRef={parentRef} data-testid="glare" />);
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
  });

  it('언마운트 시 이벤트 리스너가 제거되는지 확인', () => {
    const removeEventListenerSpy = vi.spyOn(parentElement, 'removeEventListener');
    
    const { unmount } = render(<Glare parentRef={parentRef} data-testid="glare" />);
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
  });

  it('mousemove 이벤트를 처리하고 glare 스타일을 업데이트하는지 확인', () => {
    render(<Glare parentRef={parentRef} data-testid="glare" />);
    const glareElement = screen.getByTestId('glare');

    // mousemove 이벤트 시뮬레이션
    const mouseMoveEvent = new MouseEvent('mousemove', {
      clientX: 50,
      clientY: 30,
    });

    parentElement.dispatchEvent(mouseMoveEvent);

    expect(mockRequestAnimationFrame).toHaveBeenCalled();
    expect(glareElement.style.display).toBe('block');
    expect(glareElement.style.background).toContain('radial-gradient');
    expect(glareElement.style.background).toContain('50%'); // x position
    expect(glareElement.style.background).toContain('30%'); // y position
  });

  it('mousemove에 대한 올바른 위치 백분율 계산을 확인', () => {
    // 특정 bounding rect 설정
    mockGetBoundingClientRect.mockReturnValue({
      left: 10,
      top: 20,
      width: 200,
      height: 100,
      right: 210,
      bottom: 120,
    });

    render(<Glare parentRef={parentRef} data-testid="glare" />);
    const glareElement = screen.getByTestId('glare');

    // 뷰포트 기준 (110, 70) 위치의 마우스
    // 엘리먼트 기준: (100, 50) = (50%, 50%)
    const mouseMoveEvent = new MouseEvent('mousemove', {
      clientX: 110,
      clientY: 70,
    });

    parentElement.dispatchEvent(mouseMoveEvent);

    expect(glareElement.style.background).toContain('50%');
  });

  it('mouseleave 이벤트를 처리하고 glare를 숨기는지 확인', () => {
    render(<Glare parentRef={parentRef} data-testid="glare" />);
    const glareElement = screen.getByTestId('glare');

    // 먼저 mousemove로 glare를 표시
    const mouseMoveEvent = new MouseEvent('mousemove', {
      clientX: 50,
      clientY: 30,
    });
    parentElement.dispatchEvent(mouseMoveEvent);
    expect(glareElement.style.display).toBe('block');

    // mouseleave로 숨기기
    const mouseLeaveEvent = new MouseEvent('mouseleave');
    parentElement.dispatchEvent(mouseLeaveEvent);

    expect(glareElement.style.display).toBe('none');
  });

  it('mouseleave 시 animation frame이 취소되는지 확인', () => {
    mockRequestAnimationFrame.mockReturnValue(123);
    
    render(<Glare parentRef={parentRef} data-testid="glare" />);

    // mousemove로 frameId 설정
    const mouseMoveEvent = new MouseEvent('mousemove', {
      clientX: 50,
      clientY: 30,
    });
    parentElement.dispatchEvent(mouseMoveEvent);

    // mouseleave 트리거
    const mouseLeaveEvent = new MouseEvent('mouseleave');
    parentElement.dispatchEvent(mouseLeaveEvent);

    expect(mockCancelAnimationFrame).toHaveBeenCalledWith(123);
  });

  it('새로운 mousemove 시 이전 animation frame이 취소되는지 확인', () => {
    let callCount = 0;
    mockRequestAnimationFrame.mockImplementation((callback) => {
      callCount++;
      if (callCount > 1) callback(); // 첫 번째 호출 후에만 콜백 실행
      return callCount;
    });

    render(<Glare parentRef={parentRef} data-testid="glare" />);

    // 첫 번째 mousemove
    const mouseMoveEvent1 = new MouseEvent('mousemove', {
      clientX: 25,
      clientY: 25,
    });
    parentElement.dispatchEvent(mouseMoveEvent1);

    // 첫 번째가 완료되기 전에 두 번째 mousemove
    const mouseMoveEvent2 = new MouseEvent('mousemove', {
      clientX: 75,
      clientY: 75,
    });
    parentElement.dispatchEvent(mouseMoveEvent2);

    expect(mockCancelAnimationFrame).toHaveBeenCalledWith(1);
  });

  it('올바른 CSS gradient와 rgba 값이 적용되는지 확인', () => {
    render(<Glare parentRef={parentRef} data-testid="glare" />);
    const glareElement = screen.getByTestId('glare');

    const mouseMoveEvent = new MouseEvent('mousemove', {
      clientX: 25,
      clientY: 25,
    });
    parentElement.dispatchEvent(mouseMoveEvent);

    const backgroundStyle = glareElement.style.background;
    expect(backgroundStyle).toContain('circle 200px');
    expect(backgroundStyle).toContain('rgba(255, 255, 255, 0.4)');
    expect(backgroundStyle).toContain('rgba(255, 255, 255, 0.2)');
    expect(backgroundStyle).toContain('rgba(255, 255, 255, 0.05)');
    expect(backgroundStyle).toContain('rgba(255, 255, 255, 0)');
  });

  it('엣지 케이스 좌표 (0, 0)를 처리하는지 확인', () => {
    render(<Glare parentRef={parentRef} data-testid="glare" />);
    const glareElement = screen.getByTestId('glare');

    const mouseMoveEvent = new MouseEvent('mousemove', {
      clientX: 0,
      clientY: 0,
    });
    parentElement.dispatchEvent(mouseMoveEvent);

    expect(glareElement.style.background).toContain('0%');
  });

  it('최대 경계의 엣지 케이스 좌표를 처리하는지 확인', () => {
    mockGetBoundingClientRect.mockReturnValue({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      right: 100,
      bottom: 100,
    });

    render(<Glare parentRef={parentRef} data-testid="glare" />);
    const glareElement = screen.getByTestId('glare');

    const mouseMoveEvent = new MouseEvent('mousemove', {
      clientX: 100,
      clientY: 100,
    });
    parentElement.dispatchEvent(mouseMoveEvent);

    expect(glareElement.style.background).toContain('100%');
  });

  it('parent 경계 밖의 좌표를 처리하는지 확인', () => {
    mockGetBoundingClientRect.mockReturnValue({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      right: 100,
      bottom: 100,
    });

    render(<Glare parentRef={parentRef} data-testid="glare" />);
    const glareElement = screen.getByTestId('glare');

    // 경계 밖의 마우스
    const mouseMoveEvent = new MouseEvent('mousemove', {
      clientX: 150, // 오른쪽 경계 밖
      clientY: 150, // 아래쪽 경계 밖
    });
    parentElement.dispatchEvent(mouseMoveEvent);

    expect(glareElement.style.background).toContain('150%'); // 100%보다 클 것
  });

  it('너비/높이가 0인 parent element를 처리하는지 확인', () => {
    mockGetBoundingClientRect.mockReturnValue({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      right: 0,
      bottom: 0,
    });

    render(<Glare parentRef={parentRef} data-testid="glare" />);
    const glareElement = screen.getByTestId('glare');

    const mouseMoveEvent = new MouseEvent('mousemove', {
      clientX: 50,
      clientY: 50,
    });
    parentElement.dispatchEvent(mouseMoveEvent);

    // 0으로 나누기를 우아하게 처리해야 함
    expect(glareElement.style.display).toBe('block');
    expect(glareElement.style.background).toContain('radial-gradient');
  });

  it('parentRef가 변경될 때 이벤트 리스너가 재초기화되는지 확인', () => {
    const { rerender } = render(<Glare parentRef={parentRef} data-testid="glare" />);
    
    const addEventListenerSpy1 = vi.spyOn(parentElement, 'addEventListener');
    const removeEventListenerSpy1 = vi.spyOn(parentElement, 'removeEventListener');

    // 새로운 parent ref 생성
    const newParentElement = document.createElement('div');
    const newParentRef = createRef<HTMLDivElement>();
    (newParentRef as any).current = newParentElement;
    newParentElement.getBoundingClientRect = mockGetBoundingClientRect;
    document.body.appendChild(newParentElement);

    const addEventListenerSpy2 = vi.spyOn(newParentElement, 'addEventListener');

    rerender(<Glare parentRef={newParentRef} data-testid="glare" />);

    // 이전 parent에서 리스너 제거되어야 함
    expect(removeEventListenerSpy1).toHaveBeenCalledTimes(2);
    // 새로운 parent에 리스너 추가되어야 함
    expect(addEventListenerSpy2).toHaveBeenCalledTimes(2);
  });

  it('적절한 styled component 구조를 유지하는지 확인', () => {
    render(<Glare parentRef={parentRef} data-testid="glare" />);
    const glareElement = screen.getByTestId('glare');

    // styled component 클래스가 적용되었는지 확인
    expect(glareElement).toHaveStyle({
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      'z-index': '2',
      'border-radius': '10px',
      'pointer-events': 'none',
      filter: 'blur(60px)',
      transition: 'background 0.1s',
    });
  });

  it('연속적인 mousemove 이벤트가 올바르게 처리되는지 확인', () => {
    render(<Glare parentRef={parentRef} data-testid="glare" />);
    const glareElement = screen.getByTestId('glare');

    // 여러 mousemove 이벤트 시뮬레이션
    const positions = [
      { x: 10, y: 10 },
      { x: 20, y: 20 },
      { x: 30, y: 30 },
      { x: 40, y: 40 },
    ];

    positions.forEach(({ x, y }) => {
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: x,
        clientY: y,
      });
      parentElement.dispatchEvent(mouseMoveEvent);
    });

    expect(mockRequestAnimationFrame).toHaveBeenCalledTimes(4);
    expect(glareElement.style.display).toBe('block');
    expect(glareElement.style.background).toContain('40%'); // 마지막 위치
  });

  it('빠른 마우스 움직임에서 성능 최적화가 작동하는지 확인', () => {
    mockRequestAnimationFrame.mockReturnValue(999);
    
    render(<Glare parentRef={parentRef} data-testid="glare" />);

    // 빠른 연속 움직임 시뮬레이션
    for (let i = 0; i < 10; i++) {
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: i * 10,
        clientY: i * 10,
      });
      parentElement.dispatchEvent(mouseMoveEvent);
    }

    // cancelAnimationFrame이 이전 프레임들을 취소했는지 확인
    expect(mockCancelAnimationFrame).toHaveBeenCalledTimes(9); // 첫 번째 제외하고 모두
    expect(mockCancelAnimationFrame).toHaveBeenCalledWith(999);
  });
});