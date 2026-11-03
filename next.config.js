/** @type {import('next').NextConfig} */
const nextConfig = {
  // Rotas antigas renomeadas: mantém links e indexação do Google (301)
  async redirects() {
    return [
      { source: "/about", destination: "/historia", permanent: true },
      { source: "/blog", destination: "/programacao", permanent: true },
    ];
  },
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
