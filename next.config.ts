import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // הוסף את הדומיין של Cloudinary
  },
};

export default nextConfig;
