/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  rewrites: async () => {
    return [
      {
        source: "/api/users/uploadPhoto.php",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/users/uploadPhoto.php`,
      },
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*/index.php`,
      },
    ];
  },
};

export default nextConfig;
