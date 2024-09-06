import Env from "@utils/env";
import { isAndroid } from "@utils/platform";
import client from "@utils/trpc/client";
import * as Application from "expo-application";
import * as Updates from "expo-updates";
import { useCallback, useEffect, useState } from "react";

const useUpdateChecker = () => {
  const { isUpdateAvailable } = Updates.useUpdates();

  const [newBuildUpdate, setNewBuildUpdate] = useState(false);

  const currentBuildVersion = Application.nativeBuildVersion;

  const checkBuildVersion = useCallback(async () => {
    const supportedVersions = await client.system.upToDateVersion.query(
      isAndroid ? "Android" : "iOS",
    );
    if (
      Number(currentBuildVersion) < supportedVersions &&
      Env.APP_VARIANT === "production"
    )
      setNewBuildUpdate(true);
  }, [currentBuildVersion]);

  useEffect(() => {
    checkBuildVersion();
  }, [checkBuildVersion]);

  return { newBuildUpdate, newSoftUpdate: isUpdateAvailable };
};

export default useUpdateChecker;
