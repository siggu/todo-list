import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
  },
  env: {
    TENANT_ID: process.env.TENANT_ID,
  },
};

export default nextConfig;
