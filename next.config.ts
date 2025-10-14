import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000", // agar tumhara backend 3000 pe run ho raha hai
        pathname: "/**", // ye required hai
      },
    ],
  },
};

export default nextConfig;
