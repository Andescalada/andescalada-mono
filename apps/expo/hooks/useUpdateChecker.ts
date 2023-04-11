import { isAndroid } from "@utils/platform";
import client from "@utils/trpc/client";
import * as Application from "expo-application";
import * as Updates from "expo-updates";
import { useCallback, useEffect, useState } from "react";
import * as Sentry from "sentry-expo";

const useUpdateChecker = () => {
  const [newSoftUpdate, setNewSoftUpdate] = useState(false);

  const eventListener = (event: Updates.UpdateEvent) => {
    if (event.type === Updates.UpdateEventType.ERROR) {
      Sentry.Native.captureEvent(new Error(event.message));
    } else if (event.type === Updates.UpdateEventType.NO_UPDATE_AVAILABLE) {
      setNewSoftUpdate(false);
    } else if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
      setNewSoftUpdate(true);
    }
  };

  Updates.useUpdateEvents(eventListener);

  const [newBuildUpdate, setNewBuildUpdate] = useState(false);

  const currentBuildVersion = Application.nativeBuildVersion;

  const checkBuildVersion = useCallback(async () => {
    const supportedVersions = await client.system.upToDateVersion.query(
      isAndroid ? "Android" : "iOS",
    );
    if (Number(currentBuildVersion) < supportedVersions)
      setNewBuildUpdate(true);
  }, [currentBuildVersion]);

  useEffect(() => {
    checkBuildVersion();
  }, [checkBuildVersion]);

  return { newBuildUpdate, newSoftUpdate };
};

export default useUpdateChecker;
