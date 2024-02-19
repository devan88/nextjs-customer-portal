/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'reqres.in',
        pathname: '/img/faces/**'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      }
    ]
  }
};

export default nextConfig;
