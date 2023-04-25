import type { ConfigContext, ExpoConfig } from "@expo/config";

import featureFlags from "./featureFlags";

const previewConfig = (config: ConfigContext["config"]): ExpoConfig => ({
  ...config,
  name: "Andescalada β",
  icon: "./assets/expoConfig/icon_ae_preview.png",
  slug: config.slug as string,
  owner: config.owner,
  currentFullName: `@${config.owner}/${config.slug}`,
  originalFullName: `@${config.owner}/${config.slug}`,
  ios: {
    ...config.ios,
    bundleIdentifier: "com.andescalada-preview.app",
    config: {
      ...config.ios?.config,
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY_IOS,
    },
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
  extra: {
    ...config.extra,
    featureFlags: featureFlags.preview,
    appVariant: "preview",
    API_URL: "https://preview-andescalada-mono.vercel.app",
    SENTRY_DEPLOY_ENV: "preview",
    AUTH0_DOMAIN: "andescalada-dev.us.auth0.com",
    AUTH0_CLIENT_ID: "8rRn5mILmCShT1wjCZ38wLR4Plopabk4",
    AUTH0_AUDIENCE: "https://api-dev.andescalada.org/",
    CLOUDINARY_UPLOAD_PRESET: "andescalada-app-dev",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/fundacion-andescalada",
    CLOUDINARY_NAME: "fundacion-andescalada",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  },
});

export default previewConfig;
