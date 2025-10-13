export const getGenshinDetailHref = (characterName: string, id: string) => {
  return `${encodeURIComponent(characterName)}-${id}`;
};
