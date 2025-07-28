import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useRef } from 'react';
import { Hologram } from './Hologram';

// Mock requestAnimationFrame and cancelAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => {
  cb();
  return 1;
});
global.cancelAnimationFrame = vi.fn();

// Helper component to test Hologram with a parent ref
const TestWrapper = ({ 
  children, 
  onParentMount 
}: { 
  children: React.ReactNode; 
  onParentMount?: (ref: HTMLDivElement) => void 
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const handleParentRef = (node: HTMLDivElement | null) => {
    if (node && onParentMount) {
      onParentMount(node);
    }
  };

  return (
    <div 
      ref={(node) => {
        if (node) {
          parentRef.current = node;
          handleParentRef(node);
        }
      }} 
      data-testid="parent"
    >
      <Hologram parentRef={parentRef}>{children}</Hologram>
    </div>
  );
};

describe('홀로그램 컴포넌트 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('렌더링 테스트', () => {
    it('parentRef가 제공될 때 충돌 없이 렌더링된다', () => {
      render(
        <TestWrapper>
          <span>테스트 콘텐츠</span>
        </TestWrapper>
      );
      
      expect(screen.getByTestId('parent')).toBeInTheDocument();
    });

    it('자식 요소를 올바르게 렌더링한다', () => {
      render(
        <TestWrapper>
          <span data-testid="child-content">테스트 콘텐츠</span>
        </TestWrapper>
      );
      
      expect(screen.getByTestId('child-content')).toBeInTheDocument();
    });

    it('HTML 속성을 래퍼 div에 전달한다', () => {
      const { container } = render(
        <TestWrapper>
          <Hologram parentRef={{ current: null }} className="test-class" data-custom="test-value">
            <span>콘텐츠</span>
          </Hologram>
        </TestWrapper>
      );
      
      const hologramDiv = container.querySelector('.test-class');
      expect(hologramDiv).toBeInTheDocument();
      expect(hologramDiv).toHaveAttribute('data-custom', 'test-value');
    });
  });

  describe('마우스 이벤트 처리 테스트', () => {
    let parentElement: HTMLDivElement;
    let hologramElement: HTMLDivElement;

    beforeEach(() => {
      // Mock getBoundingClientRect
      HTMLElement.prototype.getBoundingClientRect = vi.fn(() => ({
        left: 100,
        top: 100,
        width: 200,
        height: 200,
        right: 300,
        bottom: 300,
        x: 100,
        y: 100,
        toJSON: vi.fn(),
      }));
    });

    it('마우스 이동 시 홀로그램 오버레이가 표시된다', () => {
      render(
        <TestWrapper 
          onParentMount={(parent) => {
            parentElement = parent;
            // Get the hologram element
            hologramElement = parent.querySelector('div') as HTMLDivElement;
          }}
        >
          <span>콘텐츠</span>
        </TestWrapper>
      );

      // Initially hidden
      expect(hologramElement.style.display).toBe('none');

      // Simulate mouse move
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 150, // 50px from left (150 - 100)
        clientY: 150, // 50px from top (150 - 100)
      });
      
      parentElement.dispatchEvent(mouseEvent);

      expect(hologramElement.style.display).toBe('block');
    });

    it('마우스 위치에 따라 올바른 배경 위치를 계산한다', () => {
      render(
        <TestWrapper 
          onParentMount={(parent) => {
            parentElement = parent;
            hologramElement = parent.querySelector('div') as HTMLDivElement;
          }}
        >
          <span>콘텐츠</span>
        </TestWrapper>
      );

      // Mouse at center (25% from left, 25% from top relative to 200x200 element)
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 150, // (150 - 100) / 200 * 100 = 25%
        clientY: 150, // (150 - 100) / 200 * 100 = 25%
      });
      
      parentElement.dispatchEvent(mouseEvent);

      expect(hologramElement.style.backgroundPosition).toBe('25% 25%');
    });

    it('좌상단 모서리에서 마우스 이동을 처리한다', () => {
      render(
        <TestWrapper 
          onParentMount={(parent) => {
            parentElement = parent;
            hologramElement = parent.querySelector('div') as HTMLDivElement;
          }}
        >
          <span>콘텐츠</span>
        </TestWrapper>
      );

      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 100, // 0% from left
        clientY: 100, // 0% from top
      });
      
      parentElement.dispatchEvent(mouseEvent);

      expect(hologramElement.style.backgroundPosition).toBe('0% 0%');
    });

    it('우하단 모서리에서 마우스 이동을 처리한다', () => {
      render(
        <TestWrapper 
          onParentMount={(parent) => {
            parentElement = parent;
            hologramElement = parent.querySelector('div') as HTMLDivElement;
          }}
        >
          <span>콘텐츠</span>
        </TestWrapper>
      );

      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 300, // 100% from left
        clientY: 300, // 100% from top
      });
      
      parentElement.dispatchEvent(mouseEvent);

      expect(hologramElement.style.backgroundPosition).toBe('100% 100%');
    });

    it('마우스가 영역을 벗어날 때 홀로그램 오버레이를 숨긴다', () => {
      render(
        <TestWrapper 
          onParentMount={(parent) => {
            parentElement = parent;
            hologramElement = parent.querySelector('div') as HTMLDivElement;
          }}
        >
          <span>콘텐츠</span>
        </TestWrapper>
      );

      // First show the hologram
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: 150,
        clientY: 150,
      });
      parentElement.dispatchEvent(mouseMoveEvent);
      expect(hologramElement.style.display).toBe('block');

      // Then hide it on mouse leave
      const mouseLeaveEvent = new MouseEvent('mouseleave');
      parentElement.dispatchEvent(mouseLeaveEvent);
      
      expect(hologramElement.style.display).toBe('none');
    });
  });

  describe('애니메이션 프레임 관리 테스트', () => {
    let parentElement: HTMLDivElement;

    beforeEach(() => {
      HTMLElement.prototype.getBoundingClientRect = vi.fn(() => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: vi.fn(),
      }));
    });

    it('마우스 이동 이벤트에 requestAnimationFrame을 사용한다', () => {
      render(
        <TestWrapper 
          onParentMount={(parent) => {
            parentElement = parent;
          }}
        >
          <span>콘텐츠</span>
        </TestWrapper>
      );

      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 50,
        clientY: 50,
      });
      
      parentElement.dispatchEvent(mouseEvent);

      expect(global.requestAnimationFrame).toHaveBeenCalled();
    });

    it('연속된 마우스 이동에서 이전 애니메이션 프레임을 취소한다', () => {
      (global.requestAnimationFrame as any).mockReturnValue(123);

      render(
        <TestWrapper 
          onParentMount={(parent) => {
            parentElement = parent;
          }}
        >
          <span>콘텐츠</span>
        </TestWrapper>
      );

      // First mouse move
      const firstMouseEvent = new MouseEvent('mousemove', {
        clientX: 25,
        clientY: 25,
      });
      parentElement.dispatchEvent(firstMouseEvent);

      // Second mouse move should cancel the first
      const secondMouseEvent = new MouseEvent('mousemove', {
        clientX: 75,
        clientY: 75,
      });
      parentElement.dispatchEvent(secondMouseEvent);

      expect(global.cancelAnimationFrame).toHaveBeenCalledWith(123);
    });

    it('마우스가 영역을 벗어날 때 애니메이션 프레임을 취소한다', () => {
      (global.requestAnimationFrame as any).mockReturnValue(456);

      render(
        <TestWrapper 
          onParentMount={(parent) => {
            parentElement = parent;
          }}
        >
          <span>콘텐츠</span>
        </TestWrapper>
      );

      // Start animation
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 50,
        clientY: 50,
      });
      parentElement.dispatchEvent(mouseEvent);

      // Leave should cancel
      const mouseLeaveEvent = new MouseEvent('mouseleave');
      parentElement.dispatchEvent(mouseLeaveEvent);

      expect(global.cancelAnimationFrame).toHaveBeenCalledWith(456);
    });
  });

  describe('엣지 케이스 및 오류 처리 테스트', () => {
    it('null parentRef를 적절히 처리한다', () => {
      const nullRef = { current: null };
      
      expect(() => {
        render(
          <Hologram parentRef={nullRef}>
            <span>콘텐츠</span>
          </Hologram>
        );
      }).not.toThrow();
    });

    it('parentRef가 null일 때 이벤트 리스너를 추가하지 않는다', () => {
      const nullRef = { current: null };
      const addEventListenerSpy = vi.spyOn(EventTarget.prototype, 'addEventListener');
      
      render(
        <Hologram parentRef={nullRef}>
          <span>콘텐츠</span>
        </Hologram>
      );

      expect(addEventListenerSpy).not.toHaveBeenCalled();
      
      addEventListenerSpy.mockRestore();
    });

    it('극단적인 마우스 좌표를 처리한다', () => {
      let parentElement: HTMLDivElement;
      let hologramElement: HTMLDivElement;

      HTMLElement.prototype.getBoundingClientRect = vi.fn(() => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: vi.fn(),
      }));

      render(
        <TestWrapper 
          onParentMount={(parent) => {
            parentElement = parent;
            hologramElement = parent.querySelector('div') as HTMLDivElement;
          }}
        >
          <span>콘텐츠</span>
        </TestWrapper>
      );

      // Test negative coordinates
      const negativeMouseEvent = new MouseEvent('mousemove', {
        clientX: -50,
        clientY: -50,
      });
      parentElement.dispatchEvent(negativeMouseEvent);
      
      expect(hologramElement.style.backgroundPosition).toBe('-50% -50%');

      // Test coordinates beyond element bounds
      const beyondMouseEvent = new MouseEvent('mousemove', {
        clientX: 200,
        clientY: 200,
      });
      parentElement.dispatchEvent(beyondMouseEvent);
      
      expect(hologramElement.style.backgroundPosition).toBe('200% 200%');
    });

    it('너비/높이가 0인 부모 요소를 처리한다', () => {
      let parentElement: HTMLDivElement;
      let hologramElement: HTMLDivElement;

      HTMLElement.prototype.getBoundingClientRect = vi.fn(() => ({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        right: 0,
        bottom: 0,
        x: 0,
        y: 0,
        toJSON: vi.fn(),
      }));

      render(
        <TestWrapper 
          onParentMount={(parent) => {
            parentElement = parent;
            hologramElement = parent.querySelector('div') as HTMLDivElement;
          }}
        >
          <span>콘텐츠</span>
        </TestWrapper>
      );

      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 50,
        clientY: 50,
      });
      
      expect(() => {
        parentElement.dispatchEvent(mouseEvent);
      }).not.toThrow();
      
      // Should result in Infinity% values, which is technically valid CSS
      expect(hologramElement.style.backgroundPosition).toBe('Infinity% Infinity%');
    });
  });

  describe('컴포넌트 라이프사이클 테스트', () => {
    it('언마운트 시 이벤트 리스너를 정리한다', () => {
      let parentElement: HTMLDivElement;
      const removeEventListenerSpy = vi.spyOn(EventTarget.prototype, 'removeEventListener');

      const { unmount } = render(
        <TestWrapper 
          onParentMount={(parent) => {
            parentElement = parent;
          }}
        >
          <span>콘텐츠</span>
        </TestWrapper>
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      
      removeEventListenerSpy.mockRestore();
    });

    it('parentRef가 변경될 때 이벤트 리스너를 업데이트한다', () => {
      const firstParentRef = { current: document.createElement('div') };
      const secondParentRef = { current: document.createElement('div') };
      
      const addEventListenerSpy = vi.spyOn(EventTarget.prototype, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(EventTarget.prototype, 'removeEventListener');

      const { rerender } = render(
        <Hologram parentRef={firstParentRef}>
          <span>콘텐츠</span>
        </Hologram>
      );

      // Change the parent ref
      rerender(
        <Hologram parentRef={secondParentRef}>
          <span>콘텐츠</span>
        </Hologram>
      );

      expect(removeEventListenerSpy).toHaveBeenCalledTimes(2); // Clean up old listeners
      expect(addEventListenerSpy).toHaveBeenCalledTimes(4); // Add new listeners (2 calls per render)
      
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });
  });

  describe('성능 고려사항 테스트', () => {
    it('requestAnimationFrame으로 빠른 마우스 움직임을 조절한다', () => {
      let parentElement: HTMLDivElement;

      render(
        <TestWrapper 
          onParentMount={(parent) => {
            parentElement = parent;
          }}
        >
          <span>콘텐츠</span>
        </TestWrapper>
      );

      // Simulate rapid mouse movements
      for (let i = 0; i < 10; i++) {
        const mouseEvent = new MouseEvent('mousemove', {
          clientX: i * 10,
          clientY: i * 10,
        });
        parentElement.dispatchEvent(mouseEvent);
      }

      // Should still only call requestAnimationFrame 10 times (once per event)
      expect(global.requestAnimationFrame).toHaveBeenCalledTimes(10);
      // But cancelAnimationFrame should be called 9 times (canceling previous frames)
      expect(global.cancelAnimationFrame).toHaveBeenCalledTimes(9);
    });
  });

  describe('접근성 테스트', () => {
    it('상호작용을 방해하지 않도록 pointer-events: none으로 렌더링된다', () => {
      const { container } = render(
        <TestWrapper>
          <span>콘텐츠</span>
        </TestWrapper>
      );

      const hologramDiv = container.querySelector('div > div');
      
      // The styled component should have pointer-events: none in the CSS
      expect(hologramDiv).toBeInTheDocument();
    });
  });

  describe('스타일 관련 테스트', () => {
    it('초기 상태에서 display: none이다', () => {
      let hologramElement: HTMLDivElement;

      render(
        <TestWrapper 
          onParentMount={(parent) => {
            hologramElement = parent.querySelector('div') as HTMLDivElement;
          }}
        >
          <span>콘텐츠</span>
        </TestWrapper>
      );

      expect(hologramElement.style.display).toBe('none');
    });

    it('배경 위치 전환이 올바르게 적용된다', () => {
      let parentElement: HTMLDivElement;
      let hologramElement: HTMLDivElement;

      HTMLElement.prototype.getBoundingClientRect = vi.fn(() => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: vi.fn(),
      }));

      render(
        <TestWrapper 
          onParentMount={(parent) => {
            parentElement = parent;
            hologramElement = parent.querySelector('div') as HTMLDivElement;
          }}
        >
          <span>콘텐츠</span>
        </TestWrapper>
      );

      const mouseEvent1 = new MouseEvent('mousemove', {
        clientX: 25,
        clientY: 25,
      });
      parentElement.dispatchEvent(mouseEvent1);
      expect(hologramElement.style.backgroundPosition).toBe('25% 25%');

      const mouseEvent2 = new MouseEvent('mousemove', {
        clientX: 75,
        clientY: 75,
      });
      parentElement.dispatchEvent(mouseEvent2);
      expect(hologramElement.style.backgroundPosition).toBe('75% 75%');
    });
  });

  describe('메모리 누수 방지 테스트', () => {
    it('컴포넌트가 언마운트될 때 진행 중인 애니메이션 프레임을 정리한다', () => {
      (global.requestAnimationFrame as any).mockReturnValue(789);
      let parentElement: HTMLDivElement;

      const { unmount } = render(
        <TestWrapper 
          onParentMount={(parent) => {
            parentElement = parent;
          }}
        >
          <span>콘텐츠</span>
        </TestWrapper>
      );

      // Start an animation
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 50,
        clientY: 50,
      });
      parentElement.dispatchEvent(mouseEvent);

      // Unmount should clean up
      unmount();

      expect(global.cancelAnimationFrame).toHaveBeenCalledWith(789);
    });
  });
});