import type { ConfigContext, ExpoConfig } from "@expo/config";

import featureFlags from "./featureFlags";

const productionConfig = (config: ConfigContext["config"]): ExpoConfig => {
  const configPlugin = config?.plugins || [];

  return {
    ...config,
    name: "Andescalada",
    slug: config.slug as string,
    owner: config.owner,
    currentFullName: `@${config.owner}/${config.slug}`,
    originalFullName: `@${config.owner}/${config.slug}`,
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
    plugins: [
      ...configPlugin,
      [
        "@rnmapbox/maps",
        {
          RNMapboxMapsImpl: "mapbox",
          RNMapboxMapsVersion: "10.17.0",
          RNMapboxMapsDownloadToken: process.env.MAPBOX_ACCESS_TOKEN,
        },
      ],
    ],
    extra: {
      ...config.extra,
      featureFlags: featureFlags.production,
      appVariant: "production",
      API_URL: "https://andescalada-mono.vercel.app",
      SENTRY_DEPLOY_ENV: "production",
      AUTH0_DOMAIN: "andescalada.us.auth0.com",
      AUTH0_CLIENT_ID: "HpNoZWmoc6zbp1mmDlhNPsgWRsbBwJ39",
      AUTH0_AUDIENCE: "https://api.andescalada.org/",
      CLOUDINARY_UPLOAD_PRESET: "andescalada-app",
      CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/fundacion-andescalada",
      CLOUDINARY_NAME: "fundacion-andescalada",
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    },
  };
};

export default productionConfig;
