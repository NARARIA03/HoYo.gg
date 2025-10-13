import { createSlugText } from '@/utils/slug';

export const getGenshinDetailHref = (characterName: string, id: string) => {
  const nameSlug = createSlugText(characterName);
  return `/genshin/characters/${encodeURIComponent(nameSlug)}-${id}`;
};
