export type GIWeaponDTO =
  | 'WEAPON_BOW'
  | 'WEAPON_SWORD_ONE_HAND'
  | 'WEAPON_CLAYMORE'
  | 'WEAPON_POLE'
  | 'WEAPON_CATALYST';

export type GIElementDTO = 'Cryo' | 'Hydro' | 'Pyro' | 'Electro' | 'Anemo' | 'Geo' | 'Dendro';

export type GIRankDTO =
  | 'QUALITY_ORANGE' // 5성
  | 'QUALITY_PURPLE' // 4성
  | 'QUALITY_ORANGE_SP'; // 특수 5성

export type GIRegionDTO =
  | 'ASSOC_TYPE_MAINACTOR' // 주인공, 인형
  | 'ASSOC_TYPE_FATUI' // 우인단
  | 'ASSOC_TYPE_OMNI_SCOURGE' // 스커크
  | 'ASSOC_TYPE_MONDSTADT' // 몬드
  | 'ASSOC_TYPE_LIYUE' // 리월
  | 'ASSOC_TYPE_INAZUMA' // 이나즈마
  | 'ASSOC_TYPE_SUMERU' // 수메르
  | 'ASSOC_TYPE_FONTAINE' // 폰타인
  | 'ASSOC_TYPE_NATLAN' // 나타
  | 'ASSOC_TYPE_NODKRAI'; // 노드크라이
