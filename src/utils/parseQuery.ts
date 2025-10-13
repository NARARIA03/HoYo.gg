export const parseQuery = <T>(query: string | string[] | undefined) => {
  return (Array.isArray(query) ? query[0] : query) as T | undefined;
};

export const parseArrayQuery = <T>(query: string | string[] | undefined) => {
  if (!query) return undefined;
  return (Array.isArray(query) ? query : [query]) as T[];
};

export const parseNameAndId = (nameId: string | string[] | undefined) => {
  if (typeof nameId !== 'string') return undefined;
  const [name, id] = nameId.split('-');
  return { name, id };
};
