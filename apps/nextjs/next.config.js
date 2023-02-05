// @ts-check

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
  ],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  typescript: { ignoreBuildErrors: !!process.env.CI },
  images: {
    domains: ["res.cloudinary.com"],
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

module.exports = config;
