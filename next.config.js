/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "earnest-egret-344.convex.cloud",
        port: "",
        pathname: "/api/storage/**",
      },
    ],
  },
};

module.exports = nextConfig;
