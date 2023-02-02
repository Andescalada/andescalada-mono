/* eslint-disable @typescript-eslint/no-var-requires */
const { withExpo } = require("@expo/next-adapter");
const withPlugins = require("next-compose-plugins");
const withFonts = require("next-fonts");
const withTM = require("next-transpile-modules")([
  "react-native",
  "expo",
  "@shopify/restyle",
  "@expo/vector-icons",
  "@andescalada/api",
  "@andescalada/utils",
  "@andescalada/db",
  "@andescalada/ui",
  "@andescalada/icons",
  "react-native-reanimated",
  "expo-font",
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reanimated (and thus, Moti) doesn't work with strict mode currently...
  // https://github.com/nandorojo/moti/issues/224
  // https://github.com/necolas/react-native-web/pull/2330
  // https://github.com/nandorojo/moti/issues/224
  // once that gets fixed, set this back to true
  reactStrictMode: true,
  webpack5: true,
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
    "@andescalada/icons",
    "react-native-reanimated",
    "expo-font",
  ],
  experimental: {
    forceSwcTransforms: true,
    swcPlugins: [[require.resolve("./plugins/swc_plugin_reanimated.wasm")]],
  },
};

module.exports = withPlugins(
  [
    withTM,
    withFonts,
    [
      withExpo,
      {
        projectRoot: __dirname + "../../..",
      },
    ],
  ],
  nextConfig,
);
