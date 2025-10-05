export const parseQuery = <T>(query: string | string[] | undefined) => {
  return Array.isArray(query) ? (query[0] as T | undefined) : (query as T | undefined);
};
