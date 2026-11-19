import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1600, 1920],
  },
  async redirects() {
    return [
      { source: "/locations/lehi", destination: "/locations/lehi-ut", permanent: true },
      { source: "/service-areas", destination: "/locations", permanent: true },
      { source: "/blog", destination: "/guides", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
