/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      esmExternals: true,
    },
    images: {
      domains: ['files.stripe.com'],
    },
    metadata: {
      title: "Cozy Threads",
      description: "Ethically-source apparel and accessories",
    },
  };
  
  module.exports = nextConfig;