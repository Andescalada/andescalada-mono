import Constants from "expo-constants";

const Env = {
  API_URL: Constants.expoConfig?.extra?.API_URL as string,
  SENTRY_DNS:
    "https://d7792e58e4f94138aa7c6303aa7f2c79@o1423499.ingest.sentry.io/6771037",
  SENTRY_DEPLOY_ENV: Constants.expoConfig?.extra?.SENTRY_DEPLOY_ENV as string,
  CLOUDINARY_UPLOAD_PRESET: Constants?.expoConfig?.extra
    ?.CLOUDINARY_UPLOAD_PRESET as string,
  CLOUDINARY_URL: Constants?.expoConfig?.extra?.CLOUDINARY_URL as string,
  AUTH0_CLIENT_ID: Constants?.expoConfig?.extra?.AUTH0_CLIENT_ID as string,
  AUTH0_DOMAIN: Constants?.expoConfig?.extra?.AUTH0_DOMAIN as string,
  AUTH0_AUDIENCE: Constants?.expoConfig?.extra?.AUTH0_AUDIENCE as string,
};

export default Env;
