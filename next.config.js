/** @type {import('next').NextConfig} */
const nextConfig = { 
  reactStrictMode: true,
  optimizeFonts: false,
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};
module.exports = nextConfig;