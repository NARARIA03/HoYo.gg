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
    Geo: '/images/genshin/elements/Geo.webp',
    Dendro: '/images/genshin/elements/Dendro.webp',
    Cryo: '/images/genshin/elements/Cryo.webp',
    Pyro: '/images/genshin/elements/Pyro.webp',
    Hydro: '/images/genshin/elements/Hydro.webp',
    Electro: '/images/genshin/elements/Electro.webp',
    Anemo: '/images/genshin/elements/Anemo.webp',
  },
  weapon: {
    WEAPON_BOW: '/images/genshin/weapons/WEAPON_BOW.webp',
    WEAPON_SWORD_ONE_HAND: '/images/genshin/weapons/WEAPON_SWORD_ONE_HAND.webp',
    WEAPON_CLAYMORE: '/images/genshin/weapons/WEAPON_CLAYMORE.webp',
    WEAPON_POLE: '/images/genshin/weapons/WEAPON_POLE.webp',
    WEAPON_CATALYST: '/images/genshin/weapons/WEAPON_CATALYST.webp',
  },
} as const;

export const IMAGES = {
  genshin,
} as const;
