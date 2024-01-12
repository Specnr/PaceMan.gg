/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.mineatar.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "mc-heads.net",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
