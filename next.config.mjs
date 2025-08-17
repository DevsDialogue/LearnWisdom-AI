/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com", 
      "s3.us-west-2.amazonaws.com",
      "images.unsplash.com"
    ],
  },
  // Updated: serverComponentsExternalPackages moved to serverExternalPackages
  serverExternalPackages: ['@prisma/client'],
};

export default nextConfig;