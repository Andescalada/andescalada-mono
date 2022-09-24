import {
  DdSdkReactNative,
  DdSdkReactNativeConfiguration,
} from "@datadog/mobile-react-native";
import {
  DATADOG_APPLICATION_ID,
  DATADOG_CLIENT_TOKEN,
  DATADOG_ENV,
} from "@env";
import isExpoGo from "@utils/isExpoGo";
import getTrackingPermission from "@utils/trackingPermissions";
import Constants, { AppOwnership } from "expo-constants";
import { Platform } from "react-native";

const trackInteractions = true;
const trackXHRResources = true;
const trackError = true;

const initDatadog = async () => {
  const isGranted = await getTrackingPermission();
  if (isExpoGo || (!isGranted && Platform.OS === "ios")) {
    return;
  }

  const config = new DdSdkReactNativeConfiguration(
    DATADOG_CLIENT_TOKEN,
    DATADOG_ENV,
    DATADOG_APPLICATION_ID,
    trackInteractions,
    trackXHRResources,
    trackError,
  );
  config.site = "US";
  config.nativeCrashReportEnabled = true;
  config.resourceTracingSamplingRate = 100;
  DdSdkReactNative.initialize(config);
};

export default initDatadog;
