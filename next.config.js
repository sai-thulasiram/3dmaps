/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_MAPBOX_TOKEN: 'pk.eyJ1IjoibWFwc2FpIiwiYSI6ImNsbTJ5MmZvajB6N3AzZXA5cmIyMzV3YWoifQ.aBMiWfn5mRYjylCNUxISJQ'
  },
};

module.exports = nextConfig;
