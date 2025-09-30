export const seoConstants = {
  '/': {
    title: 'HoYo.gg',
    description: '호요버스 게임들의 데이터&진열장 검색 기능을 제공합니다.',
  },
  '/genshin': {
    title: 'Genshin.gg',
    description: '캐릭터, 성유물 등의 정보를 확인해보세요.',
  },
} satisfies Record<string, { title: string; description: string }>;
