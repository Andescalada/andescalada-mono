/* eslint-disable @typescript-eslint/no-var-requires */
const { withExpo } = require("@expo/next-adapter");

/** @type {import('next').NextConfig} */
const nextConfig = withExpo({
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    "react-native",
    "expo",
    "@shopify/restyle",
    "@expo/vector-icons",
    "@andescalada/api",
    "@andescalada/utils",
    "@andescalada/db",
    "@andescalada/ui",
    // Add more React Native / Expo packages here...
  ],
  experimental: {
    forceSwcTransforms: true,
  },
});

module.exports = nextConfig;
