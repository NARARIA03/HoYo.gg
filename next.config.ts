import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'enka.network',
        pathname: '**/*',
      },
      {
        hostname: 'i.redd.it',
        pathname: '**/*',
      },
      {
        hostname: 'i.namu.wiki',
        pathname: '**/*',
      },
    ],
  },
};

export default nextConfig;
