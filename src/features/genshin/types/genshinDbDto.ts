export type ItemDTO = {
  id: number; // 아이템 id
  name: string; // 풍차 국화
  count: number; // 10개
};

export type FullGenshinCharacterDTO = {
  id: number;
  name: string; // 캐릭터 이름
  title: string; // 캐릭터 이명
  description: string; // 캐릭터 설명
  weaponType: string; // 무기 타입, 추후 ENum화 필요
  weaponText: string; // 무기 타입에 대한 텍스트 (한손검)
  bodyType: string; // 이건 뭐지? body_boy, body_male, body_girl, body_lady -> 캐릭터 모델링 크기인듯, ENum화 필요
  gender: '남성' | '여성';
  qualityType: 'QUALITY_PURPLE' | 'QUALITY_ORANGE'; // 4성, 5성
  rarity: 4 | 5; // 4성, 5성
  birthdaymmdd: string; // 2/11 형식의 생일
  birthday: string; // 2월 11일 형식의 생일
  elementType: string; // 사용 원소에 대한 내용, ENum화 필요
  elementText: string; // 사용 원소에 대한 텍스트
  affiliation: string; // 소속 단체 텍스트 (페보니우스 기사단, 우인단 등)
  associationType: string; // 소속 단체 ENum
  region: string; // 고향? 몬드 이나즈마 수메르 등
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
  rarity: 4 | 5;
  elementType: string;
  elementText: string;
  affiliation: string;
  region: string;
  constellation: string;
  image: string;
};
