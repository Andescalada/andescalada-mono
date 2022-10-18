import { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => variantConfig(config);

const variantConfig = (config: ConfigContext["config"]): ExpoConfig => {
  if (process.env.APP_VARIANT === "development") {
    return {
      ...config,
      name: "Andescalada Dev",
      icon: "./assets/expoConfig/icon_ae_dev.png",
      slug: "andescalada-app",
      owner: config.owner,
      currentFullName: `@${config.owner}/${config.slug}`,
      originalFullName: `@${config.owner}/${config.slug}`,
      ios: {
        ...config.ios,
        bundleIdentifier: "com.andescalada-dev.app",
      },
      android: {
        ...config.android,
        package: "com.andescalada.dev",
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
      name: "Andescalada β",
      icon: "./assets/expoConfig/icon_ae_preview.png",
      slug: "andescalada-app",
      owner: config.owner,
      currentFullName: `@${config.owner}/${config.slug}`,
      originalFullName: `@${config.owner}/${config.slug}`,
      ios: {
        ...config.ios,
        bundleIdentifier: "com.andescalada-preview.app",
      },
      android: {
        ...config.android,
        package: "com.andescalada.preview",
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
      extra: {
        ...config.extra,
        API_URL: "https://preview-andescalada-mono.vercel.app",
      },
    };
  }
  return {
    ...config,
    name: "Andescalada",
    slug: "andescalada-app",
    owner: config.owner,
    currentFullName: `@${config.owner}/${config.slug}`,
    originalFullName: `@${config.owner}/${config.slug}`,
    runtimeVersion: {
      policy: "sdkVersion",
    },
    updates: {
      url: "https://u.expo.dev/a034137d-75c2-4941-a3b0-003e7b6ff487",
    },
    extra: { ...config.extra, API_URL: "https://andescalada-mono.vercel.app" },
  };
};
