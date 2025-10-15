import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // ✅ Local backend (development)
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      // ✅ Production backend (Render, etc.)
      {
        protocol: "https",
        hostname: "blogbackend-mowg.onrender.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
