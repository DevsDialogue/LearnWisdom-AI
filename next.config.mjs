/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com", "s3.us-west-2.amazonaws.com"], // Add the domain for Google user profile images
  },
};

export default nextConfig;
