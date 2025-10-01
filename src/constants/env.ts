const getEnv = (key: string) => {
  if (!process.env[key]) throw new Error(`${key} env is required.`);
  return process.env[key];
};

export const BASE_URL = getEnv('NEXT_PUBLIC_BASE_URL');
