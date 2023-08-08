/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "3000",
        pathname: "users/**/profile",
      },
    ],
  },
};

module.exports = nextConfig;
