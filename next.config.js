/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["react-day-picker"],
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
