/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
  // Optimize production build
  swcMinify: true,
  reactStrictMode: true,
  // Compression
  compress: true,
  // Optimize page loading
  poweredByHeader: false,
  // Trailing slash consistency
  trailingSlash: false,
}

export default nextConfig
