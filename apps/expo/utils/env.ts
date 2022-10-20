import { SENTRY_DNS } from "@env";
import Constants from "expo-constants";

const Env = {
  API_URL: Constants.expoConfig?.extra?.API_URL as string,
  SENTRY_DNS: SENTRY_DNS,
  SENTRY_DEPLOY_ENV: Constants.expoConfig?.extra?.SENTRY_DEPLOY_ENV as string,
  UPSTASH_REDIS_REST_TOKEN: Constants?.expoConfig?.extra
    ?.UPSTASH_REDIS_REST_TOKEN as string,
  UPSTASH_REDIS_REST_URL: Constants?.expoConfig?.extra
    ?.UPSTASH_REDIS_REST_URL as string,
  CLOUDINARY_UPLOAD_PRESET: Constants?.expoConfig?.extra
    ?.CLOUDINARY_UPLOAD_PRESET as string,
  CLOUDINARY_URL: Constants?.expoConfig?.extra?.CLOUDINARY_URL as string,
  AUTH0_CLIENT_ID: Constants?.expoConfig?.extra?.AUTH0_CLIENT_ID as string,
  AUTH0_DOMAIN: Constants?.expoConfig?.extra?.AUTH0_DOMAIN as string,
  AUTH0_AUDIENCE: Constants?.expoConfig?.extra?.AUTH0_AUDIENCE as string,
};

export default Env;
