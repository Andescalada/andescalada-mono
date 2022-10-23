import type { ConfigContext, ExpoConfig } from "@expo/config";

import featureFlags from "./featureFlags";

const previewConfig = (config: ConfigContext["config"]): ExpoConfig => ({
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
    featureFlags: featureFlags.preview,
    API_URL: "https://preview-andescalada-mono.vercel.app",
    UPSTASH_REDIS_REST_URL: "https://us1-generous-lark-38614.upstash.io",
    UPSTASH_REDIS_REST_TOKEN: process.env.DEV_UPSTASH_REDIS_REST_TOKEN,
    SENTRY_DEPLOY_ENV: "preview",
    AUTH0_DOMAIN: "andescalada-dev.us.auth0.com",
    AUTH0_CLIENT_ID: "8rRn5mILmCShT1wjCZ38wLR4Plopabk4",
    AUTH0_AUDIENCE: "https://api-dev.andescalada.org/",
    CLOUDINARY_UPLOAD_PRESET: "andescalada-app-dev",
    CLOUDINARY_URL:
      "https://api.cloudinary.com/v1_1/fundacion-andescalada/image/upload",
  },
});

export default previewConfig;
