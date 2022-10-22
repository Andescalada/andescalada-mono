import "dotenv/config";

import type { ConfigContext, ExpoConfig } from "@expo/config";

export default (): ExpoConfig => variantConfig(config);

const variantConfig = (config: ConfigContext["config"]): ExpoConfig => {
  if (process.env.APP_VARIANT === "development") {
    return devConfig(config);
  }
  if (process.env.APP_VARIANT === "preview") {
    return previewConfig(config);
  }
  return productionConfig(config);
};

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

export const devConfig = (config: ConfigContext["config"]): ExpoConfig => ({
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

const productionConfig = (config: ConfigContext["config"]): ExpoConfig => ({
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
  extra: {
    ...config.extra,
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

const config: ConfigContext["config"] = {
  scheme: "andescalada",
  owner: "andescalada",
  version: "1.1.1",
  jsEngine: "hermes",
  icon: "./assets/expoConfig/icon_ae.png",
  orientation: "portrait",
  userInterfaceStyle: "dark",
  splash: {
    image: "./assets/expoConfig/ae_splash_white.png",
    resizeMode: "contain",
    backgroundColor: "#121212",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.andescalada.app",
    infoPlist: {
      LSApplicationQueriesSchemes: ["uber", "comgooglemaps", "waze"],
      UIBackgroundModes: ["location"],
      NSUserTrackingUsageDescription:
        "Mantenemos registro tu actividad dentro de la app para mejorarla y corregir problemas",
    },
    buildNumber: "11",
  },
  android: {
    googleServicesFile: "./google-services.json",
    adaptiveIcon: {
      foregroundImage:
        "./assets/expoConfig/android-foregroundImage-adaptiveIcon.png",
      backgroundImage:
        "./assets/expoConfig/android-backgroundImage-adaptiveIcon.png",
    },
    package: "com.andescalada.app",
    versionCode: 12,
  },
  web: {
    favicon: "./assets/expoConfig/favicon.png",
  },
  extra: {
    eas: {
      projectId: "a034137d-75c2-4941-a3b0-003e7b6ff487",
    },
  },
  plugins: [
    [
      "expo-image-picker",
      {
        photosPermission:
          "La app accede a tus fotos para que subas topos y fotos de las rutas",
        cameraPermission:
          "La app usa la cámara para que subas fotos zonas de escalada e información personal",
      },
    ],
    "expo-tracking-transparency",
    "expo-community-flipper",
    "sentry-expo",
    [
      "expo-notifications",
      {
        icon: "./assets/expoConfig/notification-icon.png",
        color: "#ffffff",
      },
    ],
  ],
  hooks: {
    postPublish: [
      {
        file: "sentry-expo/upload-sourcemaps",
      },
    ],
  },
};
