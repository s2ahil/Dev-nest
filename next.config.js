/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
     serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [{
      protocol: 'https',

      hostname: 'lh3.googleusercontent.com'
    }

    ],
  },

}

module.exports = nextConfig
