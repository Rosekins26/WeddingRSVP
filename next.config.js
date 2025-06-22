/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports if needed
  output: "standalone",

  // Image optimization
  images: {
    domains: ["your-domain.com"],
    unoptimized: true, // For static export
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Compression
  compress: true,

  // Remove powered by header
  poweredByHeader: false,

  // Headers for embedding
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL", // Allow embedding in iframes
          },
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://*.google.com https://*.googleusercontent.com https://sites.google.com;",
          },
        ],
      },
    ]
  },

  // Redirects if needed
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ]
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig
