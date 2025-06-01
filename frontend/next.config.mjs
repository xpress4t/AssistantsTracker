/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost/backend/:path*" + "/index.php",
      },
    ];
  },
};

export default nextConfig;
