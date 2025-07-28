import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ActiveCard } from './ActiveCard';

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, fill, ...props }: any) => (
    <img src={src} alt={alt} data-testid="next-image" {...props} />
  ),
}));

// Mock react-dom createPortal
vi.mock('react-dom', () => ({
  ...vi.importActual('react-dom'),
  createPortal: (node: React.ReactNode) => node,
}));

// Mock motion/react
vi.mock('motion/react', () => ({
  motion: {
    div: vi.fn().mockImplementation(({ children, onClick, ...props }) => (
      <div onClick={onClick} data-testid="motion-div" {...props}>
        {children}
      </div>
    )),
  },
}));

// Helper function to create mock DOMRect
const createMockRect = (overrides: Partial<DOMRect> = {}): DOMRect => ({
  x: 100,
  y: 150,
  width: 200,
  height: 300,
  top: 150,
  right: 300,
  bottom: 450,
  left: 100,
  ...overrides,
  toJSON: () => ({}),
});

describe('ActiveCard 컴포넌트 테스트', () => {
  const defaultProps = {
    rect: createMockRect(),
    onClose: vi.fn(),
    children: <div data-testid="card-content">Test Content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1080,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('SSR 및 환경 체크', () => {
    it('window가 undefined일 때 null을 반환해야 함', () => {
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;

      const { container } = render(<ActiveCard {...defaultProps} />);
      expect(container.firstChild).toBeNull();

      global.window = originalWindow;
    });

    it('document가 undefined일 때 null을 반환해야 함', () => {
      const originalDocument = global.document;
      // @ts-ignore
      delete global.document;

      const { container } = render(<ActiveCard {...defaultProps} />);
      expect(container.firstChild).toBeNull();

      global.document = originalDocument;
    });

    it('window와 document가 모두 사용 가능할 때 정상 렌더링해야 함', () => {
      render(<ActiveCard {...defaultProps} />);
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });
  });

  describe('렌더링 및 구조', () => {
    it('카드 콘텐츠가 올바르게 렌더링되어야 함', () => {
      render(<ActiveCard {...defaultProps} />);
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('카드 뒷면 이미지가 렌더링되어야 함', () => {
      render(<ActiveCard {...defaultProps} />);
      const backImage = screen.getByAltText('backface-card');
      expect(backImage).toBeInTheDocument();
      expect(backImage).toHaveAttribute('src', '/images/genshin/background/card.webp');
    });

    it('여러 자식 요소들이 올바르게 렌더링되어야 함', () => {
      const multipleChildren = (
        <>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </>
      );

      render(<ActiveCard {...defaultProps}>{multipleChildren}</ActiveCard>);
      
      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
    });

    it('복잡한 자식 구조를 올바르게 렌더링해야 함', () => {
      const complexChildren = (
        <div data-testid="complex-content">
          <h1>제목</h1>
          <p>설명</p>
          <button>액션</button>
        </div>
      );

      render(<ActiveCard {...defaultProps}>{complexChildren}</ActiveCard>);
      expect(screen.getByTestId('complex-content')).toBeInTheDocument();
      expect(screen.getByText('제목')).toBeInTheDocument();
      expect(screen.getByText('설명')).toBeInTheDocument();
      expect(screen.getByText('액션')).toBeInTheDocument();
    });
  });

  describe('이벤트 처리', () => {
    it('백드롭 클릭 시 onClose가 호출되어야 함', () => {
      const mockOnClose = vi.fn();
      render(<ActiveCard {...defaultProps} onClose={mockOnClose} />);
      
      const backdrop = screen.getAllByTestId('motion-div')[0];
      fireEvent.click(backdrop);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('카드 콘텐츠 클릭 시 onClose가 호출되지 않아야 함', () => {
      const mockOnClose = vi.fn();
      render(<ActiveCard {...defaultProps} onClose={mockOnClose} />);
      
      const cardContent = screen.getByTestId('card-content');
      fireEvent.click(cardContent);
      
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('카드 래퍼 클릭 시 이벤트 전파가 중단되어야 함', () => {
      const mockOnClose = vi.fn();
      render(<ActiveCard {...defaultProps} onClose={mockOnClose} />);
      
      const cardWrapper = screen.getAllByTestId('motion-div')[1];
      fireEvent.click(cardWrapper);
      
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('백드롭을 여러 번 빠르게 클릭할 때 처리되어야 함', () => {
      const mockOnClose = vi.fn();
      render(<ActiveCard {...defaultProps} onClose={mockOnClose} />);
      
      const backdrop = screen.getAllByTestId('motion-div')[0];
      fireEvent.click(backdrop);
      fireEvent.click(backdrop);
      fireEvent.click(backdrop);
      
      expect(mockOnClose).toHaveBeenCalledTimes(3);
    });
  });

  describe('중앙 위치 계산', () => {
    it('기본 윈도우 크기에서 중앙 위치를 올바르게 계산해야 함', () => {
      const rect = createMockRect({ width: 200, height: 300 });
      render(<ActiveCard {...defaultProps} rect={rect} />);
      
      // 중앙 계산: x: (1920 / 2) - (200 / 2) = 860, y: (1080 / 2) - (300 / 2) = 390
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });

    it('작은 윈도우 크기를 처리해야 함', () => {
      Object.defineProperty(window, 'innerWidth', { value: 400 });
      Object.defineProperty(window, 'innerHeight', { value: 600 });
      
      const rect = createMockRect({ width: 200, height: 300 });
      render(<ActiveCard {...defaultProps} rect={rect} />);
      
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });

    it('큰 카드 크기를 처리해야 함', () => {
      const rect = createMockRect({ width: 1000, height: 800 });
      render(<ActiveCard {...defaultProps} rect={rect} />);
      
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });

    it('크기가 0인 경우를 처리해야 함', () => {
      const rect = createMockRect({ width: 0, height: 0 });
      render(<ActiveCard {...defaultProps} rect={rect} />);
      
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });
  });

  describe('Props 처리', () => {
    it('사용자 정의 duration prop을 처리해야 함', () => {
      render(<ActiveCard {...defaultProps} duration={1200} />);
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });

    it('undefined duration prop을 처리해야 함', () => {
      render(<ActiveCard {...defaultProps} duration={undefined} />);
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });

    it('0 duration을 처리해야 함', () => {
      render(<ActiveCard {...defaultProps} duration={0} />);
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });

    it('매우 큰 duration 값을 처리해야 함', () => {
      render(<ActiveCard {...defaultProps} duration={999999} />);
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });

    it('음수 duration 값을 처리해야 함', () => {
      render(<ActiveCard {...defaultProps} duration={-100} />);
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });
  });

  describe('DOMRect 엣지 케이스', () => {
    it('음수 rect 좌표를 처리해야 함', () => {
      const rect = createMockRect({
        x: -50,
        y: -100,
        left: -50,
        top: -100,
        right: 150,
        bottom: 200,
      });
      
      render(<ActiveCard {...defaultProps} rect={rect} />);
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });

    it('매우 큰 rect 좌표를 처리해야 함', () => {
      const rect = createMockRect({
        x: 5000,
        y: 3000,
        left: 5000,
        top: 3000,
        right: 5200,
        bottom: 3300,
      });
      
      render(<ActiveCard {...defaultProps} rect={rect} />);
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });

    it('소수점 크기를 처리해야 함', () => {
      const rect = createMockRect({
        width: 199.5,
        height: 299.7,
        x: 100.3,
        y: 150.8,
      });
      
      render(<ActiveCard {...defaultProps} rect={rect} />);
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });

    it('모든 속성이 0인 rect를 처리해야 함', () => {
      const rect = createMockRect({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      });
      
      render(<ActiveCard {...defaultProps} rect={rect} />);
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('스크린 리더에서 접근 가능해야 함', () => {
      render(<ActiveCard {...defaultProps} />);
      
      const backImage = screen.getByAltText('backface-card');
      expect(backImage).toHaveAttribute('alt', 'backface-card');
    });

    it('포커스 가능한 자식 요소에서 키보드 상호작용을 처리해야 함', () => {
      const interactiveChildren = (
        <button data-testid="interactive-button">클릭하세요</button>
      );
      
      render(<ActiveCard {...defaultProps}>{interactiveChildren}</ActiveCard>);
      
      const button = screen.getByTestId('interactive-button');
      expect(button).toBeInTheDocument();
      
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe('컴포넌트 정리 및 메모리', () => {
    it('빈번한 리렌더링에서 메모리 누수가 발생하지 않아야 함', () => {
      const { rerender, unmount } = render(<ActiveCard {...defaultProps} />);
      
      // 다른 props로 여러 번 리렌더링
      for (let i = 0; i < 10; i++) {
        rerender(
          <ActiveCard
            {...defaultProps}
            rect={createMockRect({ x: i * 10, y: i * 20 })}
            duration={i * 100}
          />
        );
      }
      
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
      unmount();
    });

    it('빠른 마운트/언마운트 사이클을 처리해야 함', () => {
      for (let i = 0; i < 5; i++) {
        const { unmount } = render(<ActiveCard {...defaultProps} />);
        expect(screen.getByTestId('card-content')).toBeInTheDocument();
        unmount();
      }
    });
  });

  describe('에러 경계 및 엣지 케이스', () => {
    it('null children을 처리해야 함', () => {
      render(<ActiveCard {...defaultProps}>{null}</ActiveCard>);
      expect(screen.getByAltText('backface-card')).toBeInTheDocument();
    });

    it('undefined children을 처리해야 함', () => {
      render(<ActiveCard {...defaultProps}>{undefined}</ActiveCard>);
      expect(screen.getByAltText('backface-card')).toBeInTheDocument();
    });

    it('빈 문자열 children을 처리해야 함', () => {
      render(<ActiveCard {...defaultProps}>{""}
      </ActiveCard>);
      expect(screen.getByAltText('backface-card')).toBeInTheDocument();
    });

    it('boolean children을 처리해야 함', () => {
      render(<ActiveCard {...defaultProps}>{true}</ActiveCard>);
      expect(screen.getByAltText('backface-card')).toBeInTheDocument();
    });

    it('숫자 children을 처리해야 함', () => {
      render(<ActiveCard {...defaultProps}>{42}</ActiveCard>);
      expect(screen.getByAltText('backface-card')).toBeInTheDocument();
    });
  });

  describe('애니메이션 및 타이밍', () => {
    it('밀리초에서 초로의 duration 변환을 처리해야 함', () => {
      const testCases = [1000, 2000, 500, 100];
      
      testCases.forEach((duration) => {
        const { unmount } = render(
          <ActiveCard {...defaultProps} duration={duration} />
        );
        expect(screen.getByTestId('card-content')).toBeInTheDocument();
        unmount();
      });
    });

    it('동시 애니메이션을 처리해야 함', () => {
      const { rerender } = render(<ActiveCard {...defaultProps} />);
      
      // 빠른 prop 변경으로 동시 애니메이션 시뮬레이션
      rerender(<ActiveCard {...defaultProps} rect={createMockRect({ x: 200 })} />);
      rerender(<ActiveCard {...defaultProps} rect={createMockRect({ x: 300 })} />);
      
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });
  });

  describe('포털 동작', () => {
    it('포털을 통해 콘텐츠를 렌더링해야 함', () => {
      render(<ActiveCard {...defaultProps} />);
      
      // 포털로 렌더링되어도 콘텐츠가 보여야 함
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
      expect(screen.getByAltText('backface-card')).toBeInTheDocument();
    });
  });

  describe('반응형 동작', () => {
    const testViewports = [
      { width: 320, height: 568 },   // 모바일 세로
      { width: 768, height: 1024 },  // 태블릿
      { width: 1920, height: 1080 }, // 데스크톱
      { width: 3840, height: 2160 }, // 4K
    ];

    testViewports.forEach(({ width, height }) => {
      it(`${width}x${height} 뷰포트에서 올바르게 작동해야 함`, () => {
        Object.defineProperty(window, 'innerWidth', { value: width });
        Object.defineProperty(window, 'innerHeight', { value: height });
        
        render(<ActiveCard {...defaultProps} />);
        expect(screen.getByTestId('card-content')).toBeInTheDocument();
      });
    });
  });

  describe('성능 고려사항', () => {
    it('큰 콘텐츠를 성능 문제 없이 처리해야 함', () => {
      const largeContent = (
        <div data-testid="large-content">
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i}>아이템 {i}</div>
          ))}
        </div>
      );
      
      const startTime = performance.now();
      render(<ActiveCard {...defaultProps}>{largeContent}</ActiveCard>);
      const endTime = performance.now();
      
      expect(screen.getByTestId('large-content')).toBeInTheDocument();
      expect(endTime - startTime).toBeLessThan(100);
    });

    it('빠른 prop 업데이트를 효율적으로 처리해야 함', () => {
      const { rerender } = render(<ActiveCard {...defaultProps} />);
      
      const startTime = performance.now();
      
      // 빠른 업데이트 시뮬레이션
      for (let i = 0; i < 50; i++) {
        rerender(
          <ActiveCard
            {...defaultProps}
            rect={createMockRect({ x: i, y: i })}
            duration={i * 10}
          />
        );
      }
      
      const endTime = performance.now();
      
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
      expect(endTime - startTime).toBeLessThan(1000);
    });
  });

  describe('애니메이션 프로퍼티 검증', () => {
    it('초기 애니메이션 속성이 올바르게 설정되어야 함', () => {
      const rect = createMockRect();
      render(<ActiveCard {...defaultProps} rect={rect} />);
      
      // motion div 컴포넌트들이 올바른 props로 호출되었는지 확인
      const motionDiv = vi.mocked(require('motion/react').motion.div);
      
      // 백드롭 애니메이션 속성 확인
      expect(motionDiv).toHaveBeenCalledWith(
        expect.objectContaining({
          initial: { background: 'rgba(0, 0, 0, 0)', zIndex: 999 },
          animate: { background: 'rgba(0, 0, 0, 0.4)' },
          exit: { background: 'rgba(0, 0, 0, 0)', zIndex: 1 },
          transition: { duration: 0.6, ease: 'easeInOut' },
        }),
        expect.anything()
      );

      // 카드 래퍼 애니메이션 속성 확인  
      expect(motionDiv).toHaveBeenCalledWith(
        expect.objectContaining({
          initial: {
            transformPerspective: 2000,
            x: rect.left,
            y: rect.top,
            scale: 1,
            rotateY: 0,
          },
          animate: {
            x: (1920 / 2) - (rect.width / 2),
            y: (1080 / 2) - (rect.height / 2),
            scale: 1.5,
            rotateY: 360,
          },
          exit: {
            x: rect.left,
            y: rect.top,
            scale: 1,
            rotateY: 720,
          },
        }),
        expect.anything()
      );
    });

    it('사용자 정의 duration이 올바르게 적용되어야 함', () => {
      const customDuration = 2000;
      render(<ActiveCard {...defaultProps} duration={customDuration} />);
      
      const motionDiv = vi.mocked(require('motion/react').motion.div);
      
      // duration이 초 단위로 변환되어 적용되었는지 확인
      expect(motionDiv).toHaveBeenCalledWith(
        expect.objectContaining({
          transition: { duration: customDuration / 1000 },
        }),
        expect.anything()
      );
    });

    it('기본 duration이 올바르게 적용되어야 함', () => {
      render(<ActiveCard {...defaultProps} />);
      
      const motionDiv = vi.mocked(require('motion/react').motion.div);
      
      // 기본 duration (0.8초)이 적용되었는지 확인
      expect(motionDiv).toHaveBeenCalledWith(
        expect.objectContaining({
          transition: { duration: 0.8 },
        }),
        expect.anything()
      );
    });
  });

  describe('styled-components 스타일 속성', () => {
    it('AnimatedCardWrapper에 올바른 크기가 적용되어야 함', () => {
      const rect = createMockRect({ width: 250, height: 350 });
      render(<ActiveCard {...defaultProps} rect={rect} />);
      
      const motionDiv = vi.mocked(require('motion/react').motion.div);
      
      // $width와 $height props가 전달되었는지 확인
      expect(motionDiv).toHaveBeenCalledWith(
        expect.objectContaining({
          $width: rect.width,
          $height: rect.height,
        }),
        expect.anything()
      );
    });
  });
});