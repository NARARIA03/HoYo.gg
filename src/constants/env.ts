const getEnv = (value?: string) => {
  if (!value) throw new Error('환경 변수가 누락되었습니다.');
  return value;
};

export const BASE_URL = getEnv(process.env.NEXT_PUBLIC_BASE_URL);
