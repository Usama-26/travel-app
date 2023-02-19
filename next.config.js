/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.dog.ceo",
        port: "",
        // pathname: "/account123/**",
      },
    ],
    domains: [
      "res.cloudinary.com",
      "media.istockphoto.com",
      "upload.wikimedia.org",
      "media.istockphoto.com",
    ],
  },
};

module.exports = nextConfig;
