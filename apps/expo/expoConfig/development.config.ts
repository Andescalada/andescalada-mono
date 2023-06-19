import type { ConfigContext, ExpoConfig } from "@expo/config";

import featureFlags from "./featureFlags";

const developmentConfig = (config: ConfigContext["config"]): ExpoConfig => {
  const configPlugin = config?.plugins || [];
  return {
    ...config,
    name: "Andescalada Dev",
    icon: "./assets/expoConfig/icon_ae_dev.png",
    slug: config.slug as string,
    owner: config.owner,
    currentFullName: `@${config.owner}/${config.slug}`,
    originalFullName: `@${config.owner}/${config.slug}`,
    ios: {
      ...config.ios,
      bundleIdentifier: "com.andescalada-dev.app",
      config: {
        ...config.ios?.config,
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY_IOS,
      },
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
      config: {
        ...config.android?.config,
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY_ANDROID,
        },
      },
    },
    runtimeVersion: {
      policy: "sdkVersion",
    },
    updates: {
      url: "https://u.expo.dev/a034137d-75c2-4941-a3b0-003e7b6ff487",
    },
    plugins: [
      ...configPlugin,
      [
        "@rnmapbox/maps",
        {
          RNMapboxMapsImpl: "mapbox",
          RNMapboxMapsDownloadToken: process.env.MAPBOX_ACCESS_TOKEN_DEV,
        },
      ],
    ],
    extra: {
      ...config.extra,
      featureFlags: featureFlags.development,
      appVariant: "development",
      SENTRY_DEPLOY_ENV: "development",
      AUTH0_DOMAIN: "andescalada-dev.us.auth0.com",
      AUTH0_CLIENT_ID: "8rRn5mILmCShT1wjCZ38wLR4Plopabk4",
      AUTH0_AUDIENCE: "https://api-dev.andescalada.org/",
      CLOUDINARY_UPLOAD_PRESET: "andescalada-app-dev",
      CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/fundacion-andescalada",
      CLOUDINARY_NAME: "fundacion-andescalada",
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN_DEV,
    },
  };
};

export default developmentConfig;
