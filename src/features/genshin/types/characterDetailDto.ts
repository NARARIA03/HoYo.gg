import type { GIElementDTO, GIRegionDTO, GIWeaponDTO } from './baseDto';

type GIRankDTO = 3 | 4 | 5;

type GIVoiceActorDTO = {
  Chinese: string;
  Japanese: string;
  English: string;
  Korean: string;
};

type GICharacterStoryDTO = {
  Title: string; // 스토리 제목
  Text: string; // 스토리 텍스트
  Unlock: string[]; // 해금 조건 텍스트 배열
};

type GICharacterQuoteDTO = {
  Title: string; // 대사 제목
  Text: string; // 대사 텍스트
  Unlocked: string[]; // 해금 조건 배열
};

// * 특제 요리
type GISpecialFoodDTO = {
  Id: number;
  Recipe: number;
  Name: string;
  Icon: string;
  Rank: GIRankDTO;
};

// * 명함
type GINameCardDTO = {
  Id: number;
  Name: string;
  Desc: string;
  Icon: string;
};

// * 코스튬 (스킨)
type GICostumeDTO = {
  Id: number;
  Name: string;
  Desc: string;
  Icon: string;
  Quality: number;
};

type GISkillPromoteDTO = {
  Level: number; // ! 사용 X
  Icon: string;
  Desc: string[]; // ! 사용 X
  Param: number[]; // ! 사용 X
};

// * 전투 특성
type GISkillDTO = {
  Id: number;
  Name: string;
  Desc: string; // HTML 태그가 포함되어있음에 주의
  Promote: Record<string, GISkillPromoteDTO>; // key: 0 ~ 14
};

// * 고유 특성
type GIPassiveDTO = {
  Name: string;
  Desc: string; // HTML 태그가 포함되어있음에 주의
  Icon: string;
  ParamList: number[]; // ! 사용 X
  Unlock: number; // ! 미확인
};

// * 별자리 돌파
type GIConstellationDTO = {
  Name: string;
  Desc: string; // HTML 태그가 포함되어있음에 주의
  Icon: string;
  ParamList: number[]; // ! 사용 X
};

// * 돌파/스킬 아이템 상세
type GIMaterialItemDTO = {
  Name: string; // 아이템 이름
  Id: number; // https://api.hakush.in/gi/UI/UI_ItemIcon_{id}.webp로 아이콘 이미지 획득
  Count: number; // 필요 개수
  Rank: GIRankDTO;
};

// * 돌파/스킬 재료
type GIMaterialDTO = {
  Cost: number; // 모라
  Mats: GIMaterialItemDTO[]; // 아이템
};

// * 돌파/스킬 재료 리스트
type GIMaterialsDTO = {
  Ascensions: GIMaterialDTO[]; // 6번 돌파 재료
  Talents: GIMaterialDTO[][]; // [3개 스킬][9단계 레벨업]
};

type GICharacterInfoDTO = {
  ReleaseDate: string; // 출시일
  Birth: [number, number]; // n월 n일
  Vision: string; // 원소명
  Constellation: string; // 운명의 자리명
  Native: string; // 소속 이름
  Region: GIRegionDTO; // 소속 key
  Title: string; // 캐릭터 칭호
  Detail: string; // 캐릭터 설명
  VA: GIVoiceActorDTO; // 성우 정보
  Stories: GICharacterStoryDTO[]; // 캐릭터 스토리 정보
  Quotes: GICharacterQuoteDTO[]; // 캐릭터 대사 정보
  SpecialFood: GISpecialFoodDTO; // 특제 요리 정보
  Namecard: GINameCardDTO; // 명함 정보
  Costume: GICostumeDTO[]; // 스킨 정보
};

export type GICharacterDetailDTO = {
  Name: string; // 캐릭터 이름
  Desc: string; // 캐릭터 설명
  CharaInfo: GICharacterInfoDTO;
  Weapon: GIWeaponDTO; // 무기 key
  Rarity: GIRankDTO; // 4성, 5성, 특수 5성
  Element: GIElementDTO; // 원소 key
  Icon: string; // 아바타 아이콘
  Skills: GISkillDTO[]; // 전투 특성 정보
  Passives: GIPassiveDTO[]; // 고유 특성 정보
  Constellations: GIConstellationDTO[]; // 운명의 자리 정보
  Materials: GIMaterialsDTO; // 돌파, 스킬 레벨업 재료 정보
  StaminaRecovery: number;
  BaseHP: number;
  BaseATK: number;
  BaseDEF: number;
  CritRate: number;
  CritDMG: number;
  ElementalMastery: number;
};
