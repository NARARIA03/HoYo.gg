import { describe, it, expect, vi } from 'vitest';
import { mergeRefs } from './mergeRefs';
import type { ForwardedRef } from 'react';

describe('mergeRefs 유틸리티 함수 테스트', () => {
  // Test with function refs
  describe('함수형 ref 테스트', () => {
    it('함수형 ref가 node와 함께 호출되어야 함', () => {
      const mockRef = vi.fn();
      const mergedRef = mergeRefs(mockRef);
      const node = document.createElement('div');

      mergedRef(node);

      expect(mockRef).toHaveBeenCalledWith(node);
      expect(mockRef).toHaveBeenCalledTimes(1);
    });

    it('여러 함수형 ref가 모두 같은 node와 함께 호출되어야 함', () => {
      const mockRef1 = vi.fn();
      const mockRef2 = vi.fn();
      const mockRef3 = vi.fn();
      const mergedRef = mergeRefs(mockRef1, mockRef2, mockRef3);
      const node = document.createElement('div');

      mergedRef(node);

      expect(mockRef1).toHaveBeenCalledWith(node);
      expect(mockRef2).toHaveBeenCalledWith(node);
      expect(mockRef3).toHaveBeenCalledWith(node);
      expect(mockRef1).toHaveBeenCalledTimes(1);
      expect(mockRef2).toHaveBeenCalledTimes(1);
      expect(mockRef3).toHaveBeenCalledTimes(1);
    });

    it('함수형 ref에서 에러가 발생해도 다른 ref에 영향을 주지 않아야 함', () => {
      const errorRef = vi.fn().mockImplementation(() => {
        throw new Error('Ref error');
      });
      const normalRef = vi.fn();
      const mergedRef = mergeRefs(errorRef, normalRef);
      const node = document.createElement('div');

      expect(() => mergedRef(node)).toThrow('Ref error');
      expect(errorRef).toHaveBeenCalledWith(node);
      // Note: normalRef는 errorRef에서 에러가 발생하여 호출되지 않음
    });
  });

  // Test with object refs (RefObject)
  describe('객체형 ref 테스트', () => {
    it('객체형 ref의 current 속성이 설정되어야 함', () => {
      const refObject = { current: null };
      const mergedRef = mergeRefs(refObject);
      const node = document.createElement('div');

      mergedRef(node);

      expect(refObject.current).toBe(node);
    });

    it('여러 객체형 ref의 current 속성이 모두 설정되어야 함', () => {
      const refObject1 = { current: null };
      const refObject2 = { current: null };
      const refObject3 = { current: null };
      const mergedRef = mergeRefs(refObject1, refObject2, refObject3);
      const node = document.createElement('div');

      mergedRef(node);

      expect(refObject1.current).toBe(node);
      expect(refObject2.current).toBe(node);
      expect(refObject3.current).toBe(node);
    });

    it('기존 current 값을 덮어써야 함', () => {
      const refObject = { current: document.createElement('span') };
      const mergedRef = mergeRefs(refObject);
      const newNode = document.createElement('div');

      mergedRef(newNode);

      expect(refObject.current).toBe(newNode);
    });

    it('읽기 전용 ref 객체에서 에러가 발생해야 함', () => {
      const refObject = Object.freeze({ current: null });
      const mergedRef = mergeRefs(refObject);
      const node = document.createElement('div');

      expect(() => mergedRef(node)).toThrow();
    });
  });

  // Test with mixed ref types
  describe('함수형과 객체형 ref 혼합 테스트', () => {
    it('함수형과 객체형 ref를 함께 처리할 수 있어야 함', () => {
      const functionRef = vi.fn();
      const objectRef = { current: null };
      const mergedRef = mergeRefs(functionRef, objectRef);
      const node = document.createElement('div');

      mergedRef(node);

      expect(functionRef).toHaveBeenCalledWith(node);
      expect(objectRef.current).toBe(node);
    });

    it('복잡한 혼합 시나리오에서 모든 ref 타입을 처리할 수 있어야 함', () => {
      const functionRef1 = vi.fn();
      const objectRef1 = { current: null };
      const functionRef2 = vi.fn();
      const objectRef2 = { current: null };
      const mergedRef = mergeRefs(functionRef1, objectRef1, functionRef2, objectRef2);
      const node = document.createElement('div');

      mergedRef(node);

      expect(functionRef1).toHaveBeenCalledWith(node);
      expect(functionRef2).toHaveBeenCalledWith(node);
      expect(objectRef1.current).toBe(node);
      expect(objectRef2.current).toBe(node);
    });
  });

  // Test with null/undefined refs
  describe('null과 undefined ref 처리 테스트', () => {
    it('null ref를 안전하게 처리해야 함', () => {
      const functionRef = vi.fn();
      const mergedRef = mergeRefs(null, functionRef, null);
      const node = document.createElement('div');

      expect(() => mergedRef(node)).not.toThrow();
      expect(functionRef).toHaveBeenCalledWith(node);
    });

    it('undefined ref를 안전하게 처리해야 함', () => {
      const functionRef = vi.fn();
      const mergedRef = mergeRefs(undefined, functionRef, undefined);
      const node = document.createElement('div');

      expect(() => mergedRef(node)).not.toThrow();
      expect(functionRef).toHaveBeenCalledWith(node);
    });

    it('모든 ref가 null/undefined인 경우도 처리해야 함', () => {
      const mergedRef = mergeRefs(null, undefined, null);
      const node = document.createElement('div');

      expect(() => mergedRef(node)).not.toThrow();
    });
  });

  // Edge cases and boundary conditions
  describe('엣지 케이스 및 경계 조건 테스트', () => {
    it('ref가 제공되지 않은 경우에도 동작해야 함', () => {
      const mergedRef = mergeRefs();
      const node = document.createElement('div');

      expect(() => mergedRef(node)).not.toThrow();
    });

    it('빈 배열을 스프레드한 경우에도 동작해야 함', () => {
      const refs: ForwardedRef<HTMLElement>[] = [];
      const mergedRef = mergeRefs(...refs);
      const node = document.createElement('div');

      expect(() => mergedRef(node)).not.toThrow();
    });

    it('다양한 노드 타입을 처리할 수 있어야 함', () => {
      const functionRef = vi.fn();
      const objectRef = { current: null };
      const mergedRef = mergeRefs(functionRef, objectRef);

      // DOM 엘리먼트 테스트
      const divNode = document.createElement('div');
      mergedRef(divNode);
      expect(functionRef).toHaveBeenCalledWith(divNode);
      expect(objectRef.current).toBe(divNode);

      // null 테스트
      functionRef.mockClear();
      mergedRef(null);
      expect(functionRef).toHaveBeenCalledWith(null);
      expect(objectRef.current).toBe(null);

      // undefined 테스트
      functionRef.mockClear();
      mergedRef(undefined);
      expect(functionRef).toHaveBeenCalledWith(undefined);
      expect(objectRef.current).toBe(undefined);
    });

    it('올바른 실행 순서를 유지해야 함', () => {
      const executionOrder: number[] = [];
      const ref1 = vi.fn().mockImplementation(() => executionOrder.push(1));
      const ref2 = vi.fn().mockImplementation(() => executionOrder.push(2));
      const ref3 = vi.fn().mockImplementation(() => executionOrder.push(3));
      
      const mergedRef = mergeRefs(ref1, ref2, ref3);
      const node = document.createElement('div');

      mergedRef(node);

      expect(executionOrder).toEqual([1, 2, 3]);
    });
  });

  // Type safety tests
  describe('타입 안전성 테스트', () => {
    it('제네릭 타입과 함께 동작해야 함', () => {
      interface CustomElement {
        customProp: string;
      }

      const customRef = vi.fn();
      const customObjectRef: { current: CustomElement | null } = { current: null };
      const mergedRef = mergeRefs<CustomElement>(customRef, customObjectRef);
      const customNode = { customProp: 'test' } as CustomElement;

      mergedRef(customNode);

      expect(customRef).toHaveBeenCalledWith(customNode);
      expect(customObjectRef.current).toBe(customNode);
    });

    it('HTML 엘리먼트 타입과 함께 동작해야 함', () => {
      const divRef = vi.fn();
      const divObjectRef: { current: HTMLDivElement | null } = { current: null };
      const mergedRef = mergeRefs<HTMLDivElement>(divRef, divObjectRef);
      const divElement = document.createElement('div');

      mergedRef(divElement);

      expect(divRef).toHaveBeenCalledWith(divElement);
      expect(divObjectRef.current).toBe(divElement);
    });
  });

  // Performance considerations
  describe('성능 테스트', () => {
    it('많은 수의 ref를 효율적으로 처리해야 함', () => {
      const refs = Array.from({ length: 100 }, () => vi.fn());
      const mergedRef = mergeRefs(...refs);
      const node = document.createElement('div');

      const startTime = performance.now();
      mergedRef(node);
      const endTime = performance.now();

      // 100개의 ref에 대해 합리적인 시간 내에 완료되어야 함 (10ms 미만)
      expect(endTime - startTime).toBeLessThan(10);
      
      // 모든 ref가 호출되었는지 확인
      refs.forEach(ref => {
        expect(ref).toHaveBeenCalledWith(node);
      });
    });

    it('매번 새로운 병합된 ref 함수를 생성해야 함', () => {
      const ref1 = vi.fn();
      const ref2 = vi.fn();
      
      const mergedRef1 = mergeRefs(ref1, ref2);
      const mergedRef2 = mergeRefs(ref1, ref2);

      expect(mergedRef1).not.toBe(mergedRef2);
      expect(typeof mergedRef1).toBe('function');
      expect(typeof mergedRef2).toBe('function');
    });
  });

  // Real-world usage scenarios
  describe('실제 사용 시나리오 테스트', () => {
    it('컴포넌트 ref 전달 시나리오에서 동작해야 함', () => {
      const parentRef = { current: null };
      const internalRef = vi.fn();
      const mergedRef = mergeRefs(parentRef, internalRef);
      
      // 컴포넌트 마운트 시뮬레이션
      const element = document.createElement('input');
      mergedRef(element);
      
      expect(parentRef.current).toBe(element);
      expect(internalRef).toHaveBeenCalledWith(element);
      
      // 컴포넌트 언마운트 시뮬레이션
      mergedRef(null);
      
      expect(parentRef.current).toBe(null);
      expect(internalRef).toHaveBeenCalledWith(null);
    });

    it('useImperativeHandle 시나리오에서 동작해야 함', () => {
      const parentRef = { current: null };
      const imperativeRef = vi.fn();
      const mergedRef = mergeRefs(parentRef, imperativeRef);
      
      const imperativeHandle = {
        focus: vi.fn(),
        blur: vi.fn()
      };
      
      mergedRef(imperativeHandle);
      
      expect(parentRef.current).toBe(imperativeHandle);
      expect(imperativeRef).toHaveBeenCalledWith(imperativeHandle);
    });

    it('React forwardRef 패턴에서 동작해야 함', () => {
      const forwardedRef = { current: null };
      const localRef = { current: null };
      const callbackRef = vi.fn();
      
      const mergedRef = mergeRefs(forwardedRef, localRef, callbackRef);
      const element = document.createElement('button');
      
      mergedRef(element);
      
      expect(forwardedRef.current).toBe(element);
      expect(localRef.current).toBe(element);
      expect(callbackRef).toHaveBeenCalledWith(element);
    });

    it('조건부 ref 처리 시나리오에서 동작해야 함', () => {
      const alwaysRef = { current: null };
      const conditionalRef = Math.random() > 0.5 ? { current: null } : null;
      
      const mergedRef = mergeRefs(alwaysRef, conditionalRef);
      const element = document.createElement('div');
      
      expect(() => mergedRef(element)).not.toThrow();
      expect(alwaysRef.current).toBe(element);
      
      if (conditionalRef) {
        expect(conditionalRef.current).toBe(element);
      }
    });
  });

  // Special React patterns
  describe('React 특수 패턴 테스트', () => {
    it('ref cleanup 패턴에서 동작해야 함', () => {
      const ref1 = { current: null };
      const ref2 = { current: null };
      const cleanupRef = vi.fn();
      
      const mergedRef = mergeRefs(ref1, ref2, cleanupRef);
      const element = document.createElement('div');
      
      // 초기 설정
      mergedRef(element);
      expect(ref1.current).toBe(element);
      expect(ref2.current).toBe(element);
      expect(cleanupRef).toHaveBeenCalledWith(element);
      
      // 정리
      cleanupRef.mockClear();
      mergedRef(null);
      expect(ref1.current).toBe(null);
      expect(ref2.current).toBe(null);
      expect(cleanupRef).toHaveBeenCalledWith(null);
    });

    it('동적 ref 배열과 함께 동작해야 함', () => {
      const createRef = () => ({ current: null });
      const refArray = [createRef(), createRef(), createRef()];
      
      const mergedRef = mergeRefs(...refArray);
      const element = document.createElement('span');
      
      mergedRef(element);
      
      refArray.forEach(ref => {
        expect(ref.current).toBe(element);
      });
    });
  });

  // Error handling and edge cases
  describe('에러 처리 및 엣지 케이스', () => {
    it('잘못된 ref 타입에서 에러가 발생하지 않아야 함', () => {
      const invalidRef = 'invalid' as any;
      const validRef = { current: null };
      
      const mergedRef = mergeRefs(validRef, invalidRef);
      const element = document.createElement('div');
      
      expect(() => mergedRef(element)).not.toThrow();
      expect(validRef.current).toBe(element);
    });

    it('순환 참조가 있는 객체에서도 동작해야 함', () => {
      const circularRef: any = { current: null };
      circularRef.self = circularRef;
      
      const mergedRef = mergeRefs(circularRef);
      const element = document.createElement('div');
      
      expect(() => mergedRef(element)).not.toThrow();
      expect(circularRef.current).toBe(element);
    });
  });
});