/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: process.env.NEXT_PUBLIC_API_URL
      ? [process.env.NEXT_PUBLIC_API_URL, "example.com", "picsum.photos"]
      : ["amz.dunghaysai.site", "example.com", "picsum.photos"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    const domain =
        process.env.NEXT_PUBLIC_API_URL || "amz.dunghaysai.site";
        return [
      {
        source: "/api/:path*",
        destination: `https://${domain}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
