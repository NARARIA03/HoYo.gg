import type { GIElementDTO, GIRankDTO, GIWeaponDTO } from './baseDto';

export type GICharacterDTO = {
  birth: [number, number]; // n월 n일
  icon: string; //아이콘 이름
  rank: GIRankDTO;
  weapon: GIWeaponDTO;
  release: string; // 출시일
  element: GIElementDTO; // 원소
  EN: string; // 영어 캐릭터명
  desc: string; // 영어 캐릭터 설명
  KR: string; // 한국어 캐릭터명
  CHS: string; // 중국어 캐릭터명
  JP: string; // 일본어 캐릭터명
};

export type GICharactersDTO = Record<string, GICharacterDTO>;
