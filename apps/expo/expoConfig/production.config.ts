import type { ConfigContext, ExpoConfig } from "@expo/config";

import featureFlags from "./featureFlags";

const productionConfig = (config: ConfigContext["config"]): ExpoConfig => ({
  ...config,
  name: "Andescalada",
  slug: config.slug as string,
  owner: config.owner,
  currentFullName: `@${config.owner}/${config.slug}`,
  originalFullName: `@${config.owner}/${config.slug}`,
  runtimeVersion: {
    policy: "sdkVersion",
  },
  updates: {
    url: "https://u.expo.dev/a034137d-75c2-4941-a3b0-003e7b6ff487",
  },
  android: {
    ...config.android,
    config: {
      ...config.android?.config,
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY_ANDROID,
      },
    },
  },
  ios: {
    ...config.ios,
    config: {
      ...config.ios?.config,
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY_IOS,
    },
  },
  extra: {
    ...config.extra,
    featureFlags: featureFlags.production,
    API_URL: "https://andescalada-mono.vercel.app",
    SENTRY_DEPLOY_ENV: "production",
    AUTH0_DOMAIN: "andescalada.us.auth0.com",
    AUTH0_CLIENT_ID: "HpNoZWmoc6zbp1mmDlhNPsgWRsbBwJ39",
    AUTH0_AUDIENCE: "https://api.andescalada.org/",
    CLOUDINARY_UPLOAD_PRESET: "andescalada-app",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/fundacion-andescalada",
    CLOUDINARY_NAME: "fundacion-andescalada",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  },
});

export default productionConfig;
