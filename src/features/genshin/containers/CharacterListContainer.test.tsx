import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CharacterListContainer } from './CharacterListContainer';
import { useGetGenshinCharacters } from '../hooks/queries/useGetGenshinCharacters';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import type { MinimizedGenshinCharacterDTO } from '../types/genshinDbDto';

// Mock the hooks
vi.mock('../hooks/queries/useGetGenshinCharacters');
vi.mock('@/hooks/useLockBodyScroll');
vi.mock('../components/CharacterCard/CharacterCard', () => ({
  CharacterCard: React.forwardRef<HTMLDivElement, any>(({ onClick, name, ...props }, ref) => (
    <div ref={ref} onClick={onClick} data-testid={`character-card-${name}`} {...props}>
      {name}
    </div>
  ))
}));
vi.mock('../components/ActiveCard/ActiveCard', () => ({
  ActiveCard: ({ children, onClose, rect, duration }: any) => (
    <div data-testid="active-card" onClick={onClose} data-rect={JSON.stringify(rect)} data-duration={duration}>
      {children}
    </div>
  )
}));

const mockUseGetGenshinCharacters = vi.mocked(useGetGenshinCharacters);
const mockUseLockBodyScroll = vi.mocked(useLockBodyScroll);

const mockCharacters: MinimizedGenshinCharacterDTO[] = [
  {
    id: 1,
    name: 'Albedo',
    title: 'Kreideprinz',
    description: 'A genius known as the Kreideprinz',
    rarity: 5,
    elementText: 'Geo',
    region: 'Mondstadt',
    image: 'albedo.png'
  },
  {
    id: 2,
    name: 'Amber',
    title: 'Gliding Champion',
    description: 'Always energetic and full of life',
    rarity: 4,
    elementText: 'Pyro',
    region: 'Mondstadt',
    image: 'amber.png'
  },
  {
    id: 3,
    name: 'Barbara',
    title: 'Shining Idol',
    description: 'The deaconess of the Favonius Church',
    rarity: 4,
    elementText: 'Hydro',
    region: 'Mondstadt',
    image: 'barbara.png'
  }
];

describe('CharacterListContainer 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    
    mockUseGetGenshinCharacters.mockReturnValue({
      data: mockCharacters,
      isLoading: false,
      error: null
    } as any);
    
    mockUseLockBodyScroll.mockImplementation(() => {});
    
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      x: 100,
      y: 100,
      width: 200,
      height: 300,
      top: 100,
      left: 100,
      bottom: 400,
      right: 300,
      toJSON: () => ({})
    }));
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe('컴포넌트 렌더링', () => {
    it('컴포넌트가 오류 없이 렌더링되어야 함', () => {
      render(<CharacterListContainer />);
      const wrapper = screen.getByRole('region');
      expect(wrapper).toBeInTheDocument();
    });

    it('캐릭터 데이터가 있을 때 모든 캐릭터 카드가 렌더링되어야 함', () => {
      render(<CharacterListContainer />);
      
      mockCharacters.forEach(character => {
        expect(screen.getByTestId(`character-card-${character.name}`)).toBeInTheDocument();
      });
    });

    it('캐릭터 데이터가 없을 때 빈 그리드가 렌더링되어야 함', () => {
      mockUseGetGenshinCharacters.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: null
      } as any);

      render(<CharacterListContainer />);
      const characterCards = screen.queryAllByTestId(/character-card-/);
      expect(characterCards).toHaveLength(0);
    });

    it('캐릭터 배열이 비어있을 때 빈 그리드가 렌더링되어야 함', () => {
      mockUseGetGenshinCharacters.mockReturnValue({
        data: [],
        isLoading: false,
        error: null
      } as any);

      render(<CharacterListContainer />);
      const characterCards = screen.queryAllByTestId(/character-card-/);
      expect(characterCards).toHaveLength(0);
    });

    it('적절한 스타일링으로 그리드가 렌더링되어야 함', () => {
      render(<CharacterListContainer />);
      const wrapper = screen.getByRole('region');
      expect(wrapper).toHaveStyle('background-color: rgb(30, 30, 47)');
    });
  });

  describe('카드 클릭 상호작용', () => {
    it('캐릭터 카드를 클릭하면 활성 카드가 열려야 함', () => {
      render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      fireEvent.click(albedoCard);

      expect(screen.getByTestId('active-card')).toBeInTheDocument();
    });

    it('클릭했을 때 카드 투명도가 0으로 설정되어야 함', () => {
      render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      fireEvent.click(albedoCard);

      expect(albedoCard.style.opacity).toBe('0');
    });

    it('카드를 클릭했을 때 스크롤 잠금이 활성화되어야 함', () => {
      render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      fireEvent.click(albedoCard);

      expect(mockUseLockBodyScroll).toHaveBeenCalledWith({ isLock: true });
    });

    it('활성 카드에 올바른 rect 데이터가 전달되어야 함', () => {
      render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      fireEvent.click(albedoCard);

      const activeCard = screen.getByTestId('active-card');
      const rectData = JSON.parse(activeCard.getAttribute('data-rect') || '{}');
      
      expect(rectData).toEqual({
        x: 100,
        y: 100,
        width: 200,
        height: 300,
        top: 100,
        left: 100,
        bottom: 400,
        right: 300,
        toJSON: expect.any(Function)
      });
    });

    it('ref가 사용할 수 없을 때 활성 카드가 열리지 않아야 함', () => {
      render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      
      // Mock null ref by removing the element from DOM
      Object.defineProperty(albedoCard, 'getBoundingClientRect', {
        value: null,
        writable: true
      });
      
      fireEvent.click(albedoCard);
      expect(screen.queryByTestId('active-card')).not.toBeInTheDocument();
    });

    it('올바른 캐릭터 데이터로 카드 클릭을 처리해야 함', () => {
      render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      fireEvent.click(albedoCard);

      const activeCard = screen.getByTestId('active-card');
      expect(activeCard).toBeInTheDocument();
      
      // Active card should contain the character card with correct data
      const characterCardInActive = activeCard.querySelector('[data-testid*="character-card"]');
      expect(characterCardInActive).toBeInTheDocument();
    });
  });

  describe('카드 닫기 상호작용', () => {
    it('클릭했을 때 활성 카드가 닫혀야 함', async () => {
      render(<CharacterListContainer />);
      
      // Open card first
      const albedoCard = screen.getByTestId('character-card-Albedo');
      fireEvent.click(albedoCard);
      
      expect(screen.getByTestId('active-card')).toBeInTheDocument();
      
      // Close card
      const activeCard = screen.getByTestId('active-card');
      fireEvent.click(activeCard);

      await waitFor(() => {
        expect(screen.queryByTestId('active-card')).not.toBeInTheDocument();
      });
    });

    it('애니메이션 지속시간 후 카드 투명도가 복원되어야 함', async () => {
      render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      fireEvent.click(albedoCard);
      
      const activeCard = screen.getByTestId('active-card');
      fireEvent.click(activeCard);

      expect(albedoCard.style.opacity).toBe('0');

      act(() => {
        vi.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(albedoCard.style.opacity).toBe('1');
      });
    });

    it('애니메이션 지속시간 후 스크롤 잠금이 해제되어야 함', async () => {
      render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      fireEvent.click(albedoCard);
      
      const activeCard = screen.getByTestId('active-card');
      fireEvent.click(activeCard);

      act(() => {
        vi.advanceTimersByTime(600);
      });

      await waitFor(() => {
        expect(mockUseLockBodyScroll).toHaveBeenLastCalledWith({ isLock: false });
      });
    });

    it('ref가 더 이상 존재하지 않을 때 카드 닫기를 처리해야 함', async () => {
      render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      fireEvent.click(albedoCard);
      
      const activeCard = screen.getByTestId('active-card');
      fireEvent.click(activeCard);

      // Simulate ref being null by removing from DOM
      albedoCard.remove();

      act(() => {
        vi.advanceTimersByTime(600);
      });

      // Should not throw error even when ref doesn't exist
      await waitFor(() => {
        expect(mockUseLockBodyScroll).toHaveBeenLastCalledWith({ isLock: false });
      });
    });

    it('여러 번의 닫기 시도를 적절히 처리해야 함', async () => {
      render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      fireEvent.click(albedoCard);
      
      const activeCard = screen.getByTestId('active-card');
      
      // Multiple close clicks
      fireEvent.click(activeCard);
      fireEvent.click(activeCard);
      fireEvent.click(activeCard);

      await waitFor(() => {
        expect(screen.queryByTestId('active-card')).not.toBeInTheDocument();
      });
    });
  });

  describe('다중 카드 상호작용', () => {
    it('다른 카드들을 순차적으로 클릭하는 것을 처리해야 함', () => {
      render(<CharacterListContainer />);
      
      // Click first card
      const albedoCard = screen.getByTestId('character-card-Albedo');
      fireEvent.click(albedoCard);
      expect(screen.getByTestId('active-card')).toBeInTheDocument();
      
      // Click second card
      const amberCard = screen.getByTestId('character-card-Amber');
      fireEvent.click(amberCard);
      
      // Should still have one active card (the new one)
      expect(screen.getByTestId('active-card')).toBeInTheDocument();
      expect(albedoCard.style.opacity).toBe('0');
      expect(amberCard.style.opacity).toBe('0');
    });

    it('빠른 카드 클릭을 처리해야 함', () => {
      render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      const amberCard = screen.getByTestId('character-card-Amber');
      const barbaraCard = screen.getByTestId('character-card-Barbara');
      
      // Rapid clicks
      fireEvent.click(albedoCard);
      fireEvent.click(amberCard);
      fireEvent.click(barbaraCard);
      
      expect(screen.getByTestId('active-card')).toBeInTheDocument();
    });

    it('다른 카드를 클릭했을 때 활성 카드를 교체해야 함', () => {
      render(<CharacterListContainer />);
      
      // Click first card
      const albedoCard = screen.getByTestId('character-card-Albedo');
      fireEvent.click(albedoCard);
      
      // Click second card - should replace the active card
      const amberCard = screen.getByTestId('character-card-Amber');
      fireEvent.click(amberCard);
      
      // Should only have one active card
      const activeCards = screen.getAllByTestId('active-card');
      expect(activeCards).toHaveLength(1);
    });
  });

  describe('애니메이션 및 타이밍', () => {
    it('ActiveCard에 올바른 애니메이션 지속시간을 전달해야 함', () => {
      render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      fireEvent.click(albedoCard);

      const activeCard = screen.getByTestId('active-card');
      expect(activeCard.getAttribute('data-duration')).toBe('600');
    });

    it('컴포넌트 언마운트 시 타임아웃을 정리해야 함', () => {
      const { unmount } = render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      fireEvent.click(albedoCard);
      
      const activeCard = screen.getByTestId('active-card');
      fireEvent.click(activeCard);
      
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
      
      unmount();
      
      expect(clearTimeoutSpy).toHaveBeenCalled();
    });

    it('일관된 애니메이션 지속시간 상수를 사용해야 함', () => {
      render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      fireEvent.click(albedoCard);
      
      const activeCard = screen.getByTestId('active-card');
      fireEvent.click(activeCard);

      // Check that timer uses the same duration as ActiveCard
      expect(activeCard.getAttribute('data-duration')).toBe('600');
      
      act(() => {
        vi.advanceTimersByTime(599); // Just before timeout
      });
      
      expect(albedoCard.style.opacity).toBe('0');
      
      act(() => {
        vi.advanceTimersByTime(1); // Complete timeout
      });
      
      expect(albedoCard.style.opacity).toBe('1');
    });
  });

  describe('캐릭터 데이터 처리', () => {
    it('모든 캐릭터 속성을 CharacterCard에 전달해야 함', () => {
      render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      
      expect(albedoCard).toHaveAttribute('name', 'Albedo');
      expect(albedoCard).toHaveAttribute('title', 'Kreideprinz');
      expect(albedoCard).toHaveAttribute('description', 'A genius known as the Kreideprinz');
      expect(albedoCard).toHaveAttribute('rarity', '5');
      expect(albedoCard).toHaveAttribute('elementText', 'Geo');
      expect(albedoCard).toHaveAttribute('region', 'Mondstadt');
      expect(albedoCard).toHaveAttribute('image', 'albedo.png');
    });

    it('다른 희귀도 레벨의 캐릭터들을 처리해야 함', () => {
      const mixedRarityCharacters = [
        { ...mockCharacters[0], rarity: 3 },
        { ...mockCharacters[1], rarity: 4 },
        { ...mockCharacters[2], rarity: 5 }
      ];

      mockUseGetGenshinCharacters.mockReturnValue({
        data: mixedRarityCharacters,
        isLoading: false,
        error: null
      } as any);

      render(<CharacterListContainer />);
      
      mixedRarityCharacters.forEach(character => {
        const card = screen.getByTestId(`character-card-${character.name}`);
        expect(card).toHaveAttribute('rarity', character.rarity.toString());
      });
    });

    it('이름에 특수 문자가 있는 캐릭터를 처리해야 함', () => {
      const specialCharacters = [
        { ...mockCharacters[0], name: "Zhong'li", id: 999 }
      ];

      mockUseGetGenshinCharacters.mockReturnValue({
        data: specialCharacters,
        isLoading: false,
        error: null
      } as any);

      render(<CharacterListContainer />);
      
      expect(screen.getByTestId("character-card-Zhong'li")).toBeInTheDocument();
    });

    it('유니코드 이름을 가진 캐릭터를 처리해야 함', () => {
      const unicodeCharacters = [
        { ...mockCharacters[0], name: "钟离", id: 998 },
        { ...mockCharacters[1], name: "雷電将軍", id: 997 }
      ];

      mockUseGetGenshinCharacters.mockReturnValue({
        data: unicodeCharacters,
        isLoading: false,
        error: null
      } as any);

      render(<CharacterListContainer />);
      
      expect(screen.getByTestId("character-card-钟离")).toBeInTheDocument();
      expect(screen.getByTestId("character-card-雷電将軍")).toBeInTheDocument();
    });
  });

  describe('훅 상호작용', () => {
    it('올바른 초기 상태로 useLockBodyScroll을 호출해야 함', () => {
      render(<CharacterListContainer />);
      
      expect(mockUseLockBodyScroll).toHaveBeenCalledWith({ isLock: false });
    });

    it('useGetGenshinCharacters 훅을 호출해야 함', () => {
      render(<CharacterListContainer />);
      
      expect(mockUseGetGenshinCharacters).toHaveBeenCalled();
    });

    it('useGetGenshinCharacters의 로딩 상태를 처리해야 함', () => {
      mockUseGetGenshinCharacters.mockReturnValue({
        data: undefined,
        isLoading: true,
        error: null
      } as any);

      render(<CharacterListContainer />);
      
      // Should render without characters while loading
      const characterCards = screen.queryAllByTestId(/character-card-/);
      expect(characterCards).toHaveLength(0);
    });

    it('useGetGenshinCharacters의 에러 상태를 처리해야 함', () => {
      mockUseGetGenshinCharacters.mockReturnValue({
        data: undefined,
        isLoading: false,
        error: new Error('Failed to fetch')
      } as any);

      render(<CharacterListContainer />);
      
      // Should render without characters on error
      const characterCards = screen.queryAllByTestId(/character-card-/);
      expect(characterCards).toHaveLength(0);
    });

    it('상호작용 사이클을 통해 스크롤 잠금 상태를 올바르게 업데이트해야 함', () => {
      render(<CharacterListContainer />);
      
      // Initial state
      expect(mockUseLockBodyScroll).toHaveBeenCalledWith({ isLock: false });
      
      // Click card - should enable lock
      const albedoCard = screen.getByTestId('character-card-Albedo');
      fireEvent.click(albedoCard);
      expect(mockUseLockBodyScroll).toHaveBeenLastCalledWith({ isLock: true });
      
      // Close card - should eventually disable lock
      const activeCard = screen.getByTestId('active-card');
      fireEvent.click(activeCard);
      
      act(() => {
        vi.advanceTimersByTime(600);
      });
      
      expect(mockUseLockBodyScroll).toHaveBeenLastCalledWith({ isLock: false });
    });
  });

  describe('에지 케이스', () => {
    it('null 캐릭터 데이터를 적절히 처리해야 함', () => {
      mockUseGetGenshinCharacters.mockReturnValue({
        data: null,
        isLoading: false,
        error: null
      } as any);

      render(<CharacterListContainer />);
      
      const characterCards = screen.queryAllByTestId(/character-card-/);
      expect(characterCards).toHaveLength(0);
    });

    it('선택적 속성이 누락된 캐릭터를 처리해야 함', () => {
      const incompleteCharacters = [
        {
          id: 1,
          name: 'TestCharacter',
          title: '',
          description: '',
          rarity: 4,
          elementText: 'Pyro',
          region: '',
          image: ''
        }
      ];

      mockUseGetGenshinCharacters.mockReturnValue({
        data: incompleteCharacters,
        isLoading: false,
        error: null
      } as any);

      render(<CharacterListContainer />);
      
      expect(screen.getByTestId('character-card-TestCharacter')).toBeInTheDocument();
    });

    it('리렌더링 간에 ref 일관성을 유지해야 함', () => {
      const { rerender } = render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      fireEvent.click(albedoCard);
      
      expect(albedoCard.style.opacity).toBe('0');
      
      rerender(<CharacterListContainer />);
      
      // Ref should still be maintained
      const albedoCardAfterRerender = screen.getByTestId('character-card-Albedo');
      expect(albedoCardAfterRerender.style.opacity).toBe('0');
    });

    it('중복된 캐릭터 ID를 적절히 처리해야 함', () => {
      const duplicateIdCharacters = [
        { ...mockCharacters[0], id: 1 },
        { ...mockCharacters[1], id: 1, name: 'Duplicate' }
      ];

      mockUseGetGenshinCharacters.mockReturnValue({
        data: duplicateIdCharacters,
        isLoading: false,
        error: null
      } as any);

      render(<CharacterListContainer />);
      
      // Should render both cards despite duplicate IDs
      expect(screen.getByTestId('character-card-Albedo')).toBeInTheDocument();
      expect(screen.getByTestId('character-card-Duplicate')).toBeInTheDocument();
    });

    it('희귀도가 0인 캐릭터를 처리해야 함', () => {
      const zeroRarityCharacters = [
        { ...mockCharacters[0], rarity: 0 }
      ];

      mockUseGetGenshinCharacters.mockReturnValue({
        data: zeroRarityCharacters,
        isLoading: false,
        error: null
      } as any);

      render(<CharacterListContainer />);
      
      const card = screen.getByTestId('character-card-Albedo');
      expect(card).toHaveAttribute('rarity', '0');
    });

    it('음수 캐릭터 ID를 처리해야 함', () => {
      const negativeIdCharacters = [
        { ...mockCharacters[0], id: -1 }
      ];

      mockUseGetGenshinCharacters.mockReturnValue({
        data: negativeIdCharacters,
        isLoading: false,
        error: null
      } as any);

      render(<CharacterListContainer />);
      
      expect(screen.getByTestId('character-card-Albedo')).toBeInTheDocument();
    });
  });

  describe('성능 고려사항', () => {
    it('같은 카드를 여러 번 클릭해도 불필요한 재렌더링이 발생하지 않아야 함', () => {
      render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      
      // Multiple clicks on same card
      fireEvent.click(albedoCard);
      fireEvent.click(albedoCard);
      fireEvent.click(albedoCard);
      
      // Should still only have one active card
      expect(screen.getAllByTestId('active-card')).toHaveLength(1);
    });

    it('많은 수의 캐릭터를 효율적으로 처리해야 함', () => {
      const largeCharacterSet = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Character${i + 1}`,
        title: `Title${i + 1}`,
        description: `Description${i + 1}`,
        rarity: (i % 3) + 3, // Rarity between 3-5
        elementText: ['Pyro', 'Hydro', 'Geo', 'Electro'][i % 4],
        region: ['Mondstadt', 'Liyue', 'Inazuma'][i % 3],
        image: `character${i + 1}.png`
      }));

      mockUseGetGenshinCharacters.mockReturnValue({
        data: largeCharacterSet,
        isLoading: false,
        error: null
      } as any);

      render(<CharacterListContainer />);
      
      const characterCards = screen.getAllByTestId(/character-card-/);
      expect(characterCards).toHaveLength(100);
    });

    it('빠른 상태 변경을 효율적으로 처리해야 함', () => {
      render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      
      // Open and close rapidly
      fireEvent.click(albedoCard);
      let activeCard = screen.getByTestId('active-card');
      fireEvent.click(activeCard);
      
      fireEvent.click(albedoCard);
      activeCard = screen.getByTestId('active-card');
      fireEvent.click(activeCard);
      
      fireEvent.click(albedoCard);
      activeCard = screen.getByTestId('active-card');
      expect(activeCard).toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('적절한 ARIA 역할을 제공해야 함', () => {
      render(<CharacterListContainer />);
      
      const wrapper = screen.getByRole('region');
      expect(wrapper).toBeInTheDocument();
    });

    it('키보드 상호작용을 적절히 처리해야 함', () => {
      render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      
      // Simulate keyboard click
      fireEvent.keyDown(albedoCard, { key: 'Enter', code: 'Enter' });
      fireEvent.keyUp(albedoCard, { key: 'Enter', code: 'Enter' });
      
      // Should not break the component
      expect(albedoCard).toBeInTheDocument();
    });

    it('상호작용 중 포커스 관리를 유지해야 함', () => {
      render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      albedoCard.focus();
      
      fireEvent.click(albedoCard);
      
      // Active card should be present
      expect(screen.getByTestId('active-card')).toBeInTheDocument();
      
      // Original card should still exist in DOM
      expect(albedoCard).toBeInTheDocument();
    });
  });

  describe('메모리 관리', () => {
    it('언마운트 시 타이머를 정리해야 함', () => {
      const { unmount } = render(<CharacterListContainer />);
      
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
      
      unmount();
      
      expect(clearTimeoutSpy).toHaveBeenCalled();
    });

    it('활성 타임아웃 중 컴포넌트 언마운트를 처리해야 함', () => {
      const { unmount } = render(<CharacterListContainer />);
      
      const albedoCard = screen.getByTestId('character-card-Albedo');
      fireEvent.click(albedoCard);
      
      const activeCard = screen.getByTestId('active-card');
      fireEvent.click(activeCard);
      
      // Unmount before timeout completes
      unmount();
      
      // Should not cause memory leaks or errors
      expect(() => {
        vi.advanceTimersByTime(600);
      }).not.toThrow();
    });
  });
});