import Constants from "expo-constants";
import { FeatureFlag } from "expoConfig/featureFlags";

const featureFlags = Constants.expoConfig?.extra?.featureFlags as FeatureFlag;

export default featureFlags;
