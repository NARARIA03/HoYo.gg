const landing = {
  genshin: 'https://i.redd.it/66ic9c791ih61.png',
  hsr: 'https://i.redd.it/zf4z6utfezua1.png',
  zzz: 'https://i.redd.it/zenless-zone-zero-cbt2-images-v0-r3kvi8vt7cyb1.jpg?width=1080&crop=smart&auto=webp&s=93fb6ac323f6e407e60a7913820820e8977857aa',
} as const;

const logo = {
  genshin: '/images/logos/Genshin.webp',
  hsr: '/images/logos/HSR.webp',
  zzz: '/images/logos/ZZZ.webp',
} as const;

const header = {
  genshin: '/images/header/Hutao.webp',
  hsr: '/images/header/Silverwolf.webp',
  zzz: '/images/header/Anby.webp',
} as const;

const genshin = {
  emblem: {
    몬드: '/images/genshin/emblem/Mondstadt.webp',
    리월: '/images/genshin/emblem/Liyue.webp',
    이나즈마: '/images/genshin/emblem/Inazuma.webp',
    수메르: '/images/genshin/emblem/Sumeru.webp',
    폰타인: '/images/genshin/emblem/Fontaine.webp',
    나타: '/images/genshin/emblem/Natlan.webp',
    스네즈나야: '/images/genshin/emblem/Snezhnaya.webp',
  },
  rarity: {
    4: '/images/genshin/rarity/4Star.webp',
    5: '/images/genshin/rarity/5Star.webp',
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
  landing,
  logo,
  header,
  genshin,
} as const;
