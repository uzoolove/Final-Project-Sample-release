import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/market/files/**',
      },
      {
        protocol: 'https',
        hostname: 'fesp-api.koyeb.app',
        port: '',
        pathname: '/market/files/**',
      },
      {
        protocol: 'http',
        hostname: '*.kakaocdn.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.pstatic.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.githubusercontent.com',
        pathname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // 서버액션에 전달하는 바디 크기(기본은 1MB)
    },
  },
};

export default nextConfig;
