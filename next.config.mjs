/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: true,
  },
  images: {
    remotePatterns: [
      {
      hostname: 'files.stripe.com',
      }
    ],
  },
  // metadata: {
  //   title: "Cozy Threads",
  //   description: "Ethically-source apparel and accessories",
  // },
};

export default nextConfig;