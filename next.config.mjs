/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable webpack's filesystem cache in dev
      config.cache = false;
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/headless/backend/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
