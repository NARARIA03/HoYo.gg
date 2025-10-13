import type { elementTextMap, rankColorMap, regionTextMap, weaponTextMap } from '../constants';

export type GIWeaponDTO = keyof typeof weaponTextMap;

export type GIElementDTO = keyof typeof elementTextMap;

export type GIRarityDTO = keyof typeof rankColorMap;

export type GIRegionDTO = keyof typeof regionTextMap;
