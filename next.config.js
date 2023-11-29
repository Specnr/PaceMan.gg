/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mc-heads.net',
        pathname: '**',
      },
    ]
  }
}

module.exports = nextConfig
