import type { ConfigContext, ExpoConfig } from "@expo/config";

import featureFlags from "./featureFlags";

const developmentConfig = (config: ConfigContext["config"]): ExpoConfig => ({
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
  extra: {
    ...config.extra,
    featureFlags: featureFlags.development,
    UPSTASH_REDIS_REST_URL: "https://us1-generous-lark-38614.upstash.io",
    UPSTASH_REDIS_REST_TOKEN: process.env.DEV_UPSTASH_REDIS_REST_TOKEN,
    SENTRY_DEPLOY_ENV: "development",
    AUTH0_DOMAIN: "andescalada-dev.us.auth0.com",
    AUTH0_CLIENT_ID: "8rRn5mILmCShT1wjCZ38wLR4Plopabk4",
    AUTH0_AUDIENCE: "https://api-dev.andescalada.org/",
    CLOUDINARY_UPLOAD_PRESET: "andescalada-app-dev",
    CLOUDINARY_URL:
      "https://api.cloudinary.com/v1_1/fundacion-andescalada/image/upload",
  },
});

export default developmentConfig;
