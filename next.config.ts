import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  serverExternalPackages: ['bcryptjs'],
  // Disable telemetry-based trace file to avoid EPERM on Windows
  generateBuildId: async () => 'portfolio-build',
};

export default nextConfig;
