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
        hostname: 'api.hakush.in',
        pathname: '**/*',
      },
    ],
  },
};

export default nextConfig;
