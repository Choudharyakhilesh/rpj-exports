import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Legacy components under src/components/website are no longer rendered; lint only live code.
  eslint: { dirs: ['src/app', 'src/components/rpj', 'src/components/ui', 'src/lib', 'src/store'] },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.vastraexports.com",
      },
    ],
  },
};

export default nextConfig;