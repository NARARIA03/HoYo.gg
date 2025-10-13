export const createSlugText = (text: string) => {
  return text.replace(/\s+/g, '-');
};

export const parseSlug = (slug: string | string[] | undefined) => {
  if (typeof slug !== 'string') return undefined;

  const splittedSlug = slug.split('-');
  const id = splittedSlug.pop();
  const name = splittedSlug.join('-');

  return { id, name };
};
