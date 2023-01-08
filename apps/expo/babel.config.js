module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          safe: false,
          allowUndefined: true,
        },
      ],
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@navigation": "./navigation",
            "@features": "./features",
            "@assets": "./assets",
            "@utils": "./utils",
            "@store": "./store",
            "@hooks": "./hooks",
            "@templates": "./templates",
          },
        },
      ],
      ["react-native-reanimated/plugin"],
    ],
  };
};
