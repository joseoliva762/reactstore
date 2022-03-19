/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'tailwindui.com', 'ui-avatars.com', 'placeimg.com']
  }
};

module.exports = nextConfig;
