/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: process.env.NEXT_PUBLIC_API_URL
      ? [process.env.NEXT_PUBLIC_API_URL]
      : ["amz.dunghaysai.site"], // Đảm bảo images.domains luôn là một mảng hợp lệ
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    const domain =
        process.env.NEXT_PUBLIC_API_URL || "amz.dunghaysai.site";
        console.log("Domain:", domain);
        return [
      {
        source: "/api/:path*",
        destination: `https://${domain}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
