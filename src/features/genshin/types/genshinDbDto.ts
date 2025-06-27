export type ItemDTO = {
  id: number; // 아이템 id
  name: string; // 풍차 국화
  count: number; // 10개
};

/**
 * 소속 단체 ENum
 */
export type AssociationTypeDTO =
  | 'ASSOC_MAINACTOR'
  | 'ASSOC_MONDSTADT'
  | 'ASSOC_SUMERU'
  | 'ASSOC_RANGER'
  | 'ASSOC_INAZUMA'
  | 'ASSOC_FATUI'
  | 'ASSOC_LIYUE'
  | 'ASSOC_FONTAINE'
  | 'ASSOC_NATLAN';

/**
 * 캐릭터 모델링 ENum
 */
export type BodyTypeDTO = 'BODY_BOY' | 'BODY_MALE' | 'BODY_GIRL' | 'BODY_LADY' | 'BODY_LOLI';

/**
 * 캐릭터 원소 Text
 */
export type ElementTextDTO = '바위' | '풀' | '얼음' | '불' | '물' | '번개' | '바람';

/**
 * 캐릭터 원소 ENum
 */
export type ElementTypeDTO =
  | 'ELEMENT_GEO'
  | 'ELEMENT_DENDRO'
  | 'ELEMENT_CRYO'
  | 'ELEMENT_PYRO'
  | 'ELEMENT_HYDRO'
  | 'ELEMENT_ELECTRO'
  | 'ELEMENT_ANEMO';

/**
 * 지역명 Text
 */
export type RegionDTO = '몬드' | '수메르' | '이나즈마' | '스네즈나야' | '리월' | '폰타인' | '나타' | '';

/**
 * 무기 Text
 */
export type WeaponTextDTO = '한손검' | '활' | '양손검' | '장병기' | '법구';

/**
 * 무기 ENum
 */
export type WeaponTypeDTO =
  | 'WEAPON_SWORD_ONE_HAND'
  | 'WEAPON_BOW'
  | 'WEAPON_CLAYMORE'
  | 'WEAPON_POLE'
  | 'WEAPON_CATALYST';

export type FullGenshinCharacterDTO = {
  id: number;
  name: string; // 캐릭터 이름
  title: string; // 캐릭터 이명
  description: string; // 캐릭터 설명
  weaponType: WeaponTypeDTO;
  weaponText: WeaponTextDTO;
  bodyType: BodyTypeDTO;
  gender: '남성' | '여성';
  rarity: 4 | 5; // 4성, 5성
  birthdaymmdd: string; // 2/11 형식의 생일
  birthday: string; // 2월 11일 형식의 생일
  elementType: ElementTypeDTO;
  elementText: ElementTextDTO;
  affiliation: string; // 소속 단체 텍스트 (페보니우스 기사단, 우인단 등)
  associationType: AssociationTypeDTO;
  region: RegionDTO;
  substatType: string; // 레벨 올릴 때 들어가는 부스텟 ENum
  substatText: string; // 부스텟 텍스트
  constellation: string; // 별자리 텍스트
  cv: {
    english: string;
    chinese: string;
    japanese: string;
    korean: string;
  };
  costs: {
    ascend1: ItemDTO[];
    ascend2: ItemDTO[];
    ascend3: ItemDTO[];
    ascend4: ItemDTO[];
    ascend5: ItemDTO[];
    ascend6: ItemDTO[];
  };
  images: {
    card?: string;
    portrait?: string;
    'hoyolab-avatar'?: string;
    filename_icon: string;
    filename_sideIcon: string;
    filename_iconCard?: string;
    mihoyo_icon?: string;
    mihoyo_sideIcon?: string;
  };
  url: {
    fandom: string; // genshin impact fandom 사이트 주소인듯, 안 쓸듯
  };
  version: string; // 캐릭터 등장 버전
};

export type MinimizedGenshinCharacterDTO = {
  id: number;
  name: string;
  title: string;
  description: string;
  rarity: 4 | 5;
  elementText: ElementTextDTO;
  region: RegionDTO;
  image: string;
};
