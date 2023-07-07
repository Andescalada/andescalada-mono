/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check

const { withSentryConfig } = require("@sentry/nextjs");
const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@andescalada/api",
    "@andescalada/utils",
    "@andescalada/db",
    "@andescalada/hooks",
    "@andescalada/climbs-drawer",
    "@andescalada/icons",
    "@andescalada/common-assets",
  ],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    config.module.rules.push({
      test: /\.svg$/i,
      type: "asset",
      resourceQuery: /url/, // *.svg?url
    });
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
      use: ["@svgr/webpack"],
    });
    return config;
  },
  sentry: {
    hideSourceMaps: true,
  },
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  typescript: { ignoreBuildErrors: !!process.env.CI },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  // Mobile app deep link config
  headers: async () => {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "content-type", value: "application/json" }],
      },
      {
        source: "/.well-known/assetlinks.json",
        headers: [{ key: "content-type", value: "application/json" }],
      },
    ];
  },
  experimental: {
    swcPlugins: [
      [
        "next-superjson-plugin",
        {
          excluded: [],
        },
      ],
    ],
  },
};

module.exports = withSentryConfig(
  config,
  {
    silent: true,
    org: "andescalada",
    project: "andescalada-nextjs",
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
  },
);
