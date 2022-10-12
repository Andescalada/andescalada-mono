import { close } from "@sentry/react-native";
import getTrackingPermission from "@utils/trackingPermissions";
import { useEffect } from "react";
import { Platform } from "react-native";

const useSentryWithPermission = () => {
  const requestPermission = async () => {
    if (Platform.OS === "ios") {
      const hasPermission = await getTrackingPermission();
      if (!hasPermission) {
        close();
      }
    }
  };
  useEffect(() => {
    requestPermission();
  }, []);
};

export default useSentryWithPermission;
