import { SENTRY_DNS } from "@env";
import Constants from "expo-constants";

const Env = {
  SENTRY_DNS: SENTRY_DNS,
  SENTRY_DEPLOY_ENV: Constants.expoConfig?.extra?.SENTRY_DEPLOY_ENV as string,
};

export default Env;
