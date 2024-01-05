/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.mineatar.io",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
