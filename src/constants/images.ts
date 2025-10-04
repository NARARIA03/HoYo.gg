const genshin = {
  emblem: {
    몬드: '/images/genshin/emblem/Mondstadt.webp',
    리월: '/images/genshin/emblem/Liyue.webp',
    이나즈마: '/images/genshin/emblem/Inazuma.webp',
    수메르: '/images/genshin/emblem/Sumeru.webp',
    폰타인: '/images/genshin/emblem/Fontaine.webp',
    나타: '/images/genshin/emblem/Natlan.webp',
    스네즈나야: '/images/genshin/emblem/Snezhnaya.webp', // Todo: 실제 스네즈나야 아이콘 나오면 변경
    노드크라이: '/images/genshin/emblem/Nodkrai.webp',
    없음: '/images/genshin/emblem/Snezhnaya.webp',
  },
  element: {
    바위: '/images/genshin/elements/Geo.webp',
    풀: '/images/genshin/elements/Dendro.webp',
    얼음: '/images/genshin/elements/Cryo.webp',
    불: '/images/genshin/elements/Pyro.webp',
    물: '/images/genshin/elements/Hydro.webp',
    번개: '/images/genshin/elements/Electro.webp',
    바람: '/images/genshin/elements/Anemo.webp',
  },
} as const;

export const IMAGES = {
  genshin,
} as const;
