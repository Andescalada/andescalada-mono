module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
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
            "@atoms": "./atoms",
            "@local-database": "./local-database",
          },
        },
      ],
      ["react-native-reanimated/plugin"],
    ],
  };
};
