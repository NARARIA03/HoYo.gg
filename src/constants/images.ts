const genshin = {
  emblem: {
    ASSOC_TYPE_MONDSTADT: '/images/genshin/emblem/Mondstadt.webp',
    ASSOC_TYPE_LIYUE: '/images/genshin/emblem/Liyue.webp',
    ASSOC_TYPE_INAZUMA: '/images/genshin/emblem/Inazuma.webp',
    ASSOC_TYPE_SUMERU: '/images/genshin/emblem/Sumeru.webp',
    ASSOC_TYPE_FONTAINE: '/images/genshin/emblem/Fontaine.webp',
    ASSOC_TYPE_NATLAN: '/images/genshin/emblem/Natlan.webp',
    ASSOC_TYPE_NODKRAI: '/images/genshin/emblem/Nodkrai.webp',
    ASSOC_TYPE_MAINACTOR: '/images/genshin/emblem/Unknown.webp', // Todo: 물음표로 유지
    ASSOC_TYPE_FATUI: '/images/genshin/emblem/Fatui.webp',
    ASSOC_TYPE_OMNI_SCOURGE: '/images/genshin/emblem/Unknown.webp', // Todo: 물음표로 유지 (스커크 전용)
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
