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
  extra: {
    ...config.extra,
    featureFlags: featureFlags.production,
    API_URL: "https://andescalada-mono.vercel.app",
    UPSTASH_REDIS_REST_URL: "https://us1-rational-wahoo-38618.upstash.io",
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    SENTRY_DEPLOY_ENV: "production",
    AUTH0_DOMAIN: "andescalada.us.auth0.com",
    AUTH0_CLIENT_ID: "HpNoZWmoc6zbp1mmDlhNPsgWRsbBwJ39",
    AUTH0_AUDIENCE: "https://api.andescalada.org/",
    CLOUDINARY_UPLOAD_PRESET: "andescalada-app",
    CLOUDINARY_URL:
      "https://api.cloudinary.com/v1_1/fundacion-andescalada/image/upload",
  },
});

export default productionConfig;
