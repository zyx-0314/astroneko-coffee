import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Configure image domains if needed
  images: {
    unoptimized: true,
  },

  // Webpack configuration for framer-motion
  webpack: (config: any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'framer-motion': require.resolve('framer-motion'),
    };
    return config;
  },

  // API rewrite for backend communication
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: process.env.NODE_ENV === 'production' 
          ? 'http://backend:8083/api/:path*'
          : 'http://localhost:8083/api/:path*',
      },
    ];
  },
};

export default nextConfig;
