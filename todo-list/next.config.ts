import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  env: {
    TENANT_ID: process.env.TENANT_ID,
  },
};

export default nextConfig;
