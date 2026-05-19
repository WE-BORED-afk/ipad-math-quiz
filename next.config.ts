import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix: Move allowedDevOrigins to top level for Next.js 15+
  allowedDevOrigins: ['100.68.173.117', 'localhost:3000'],
  
  devIndicators: {
    appIsrStatus: false,
  },

  // Proxy to bypass CORS issues with n8n
  async rewrites() {
    return [
      {
        source: '/api/generate-math',
        destination: 'http://127.0.0.1:5678/webhook/generate-math',
      },
    ];
  },
};

export default nextConfig;
