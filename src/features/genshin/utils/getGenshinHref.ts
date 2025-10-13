export const getGenshinDetailHref = (characterName: string, id: string) => {
  return `/genshin/characters/${encodeURIComponent(characterName)}-${id}`;
};
