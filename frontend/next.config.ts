import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "bridgestoabrighterfuture.org" },
      { protocol: "https", hostname: "blogger.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
