export default ({ config }) => variantConfig(config);

const variantConfig = (config) => {
  if (process.env.APP_VARIANT === "development") {
    return {
      ...config,
      name: "Andescalada Dev",
      icon: "./assets/expoConfig/icon_ae_dev.png",
      slug: config.slug,
      owner: config.owner,
      currentFullName: `@${config.owner}/${config.slug}`,
      originalFullName: `@${config.owner}/${config.slug}`,
      ios: {
        ...config.ios,
        bundleIdentifier: "com.andescalada-dev.app",
      },
      android: {
        ...config.android,
        package: "com.andescalada-dev.app",
        adaptiveIcon: {
          foregroundImage:
            "./assets/expoConfig/android-foregroundImage-adaptiveIcon_dev.png",
          backgroundImage:
            "./assets/expoConfig/android-backgroundImage-adaptiveIcon_dev.png",
        },
      },
      runtimeVersion: {
        policy: "sdkVersion",
      },
      updates: {
        url: "https://u.expo.dev/a034137d-75c2-4941-a3b0-003e7b6ff487",
      },
    };
  }
  if (process.env.APP_VARIANT === "preview") {
    return {
      ...config,
      name: "Andescalada Preview",
      icon: "./assets/expoConfig/icon_ae_preview.png",
      slug: config.slug,
      owner: config.owner,
      currentFullName: `@${config.owner}/${config.slug}`,
      originalFullName: `@${config.owner}/${config.slug}`,
      ios: {
        ...config.ios,
        bundleIdentifier: "com.andescalada-preview.app",
      },
      android: {
        ...config.android,
        package: "com.andescalada-preview.app",
        adaptiveIcon: {
          foregroundImage:
            "./assets/expoConfig/android-foregroundImage-adaptiveIcon_preview.png",
          backgroundImage:
            "./assets/expoConfig/android-backgroundImage-adaptiveIcon_preview.png",
        },
      },
      runtimeVersion: {
        policy: "sdkVersion",
      },
      updates: {
        url: "https://u.expo.dev/a034137d-75c2-4941-a3b0-003e7b6ff487",
      },
    };
  }
  return {
    ...config,
    slug: config.slug,
    owner: config.owner,
    currentFullName: `@${config.owner}/${config.slug}`,
    originalFullName: `@${config.owner}/${config.slug}`,
    runtimeVersion: {
      policy: "sdkVersion",
    },
    updates: {
      url: "https://u.expo.dev/a034137d-75c2-4941-a3b0-003e7b6ff487",
    },
  };
};
