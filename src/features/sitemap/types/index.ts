export type TSitemapConfig = {
  [key: string]: TSitemapConfig | (() => Promise<string[]>) | null;
};
