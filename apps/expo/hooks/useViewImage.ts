import {
  ImageManagerNavigationParamList,
  ImageManagerRoutes,
} from "@features/imageManager/Navigation/types";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useCallback } from "react";

const useViewImage = () => {
  const rootNavigation = useRootNavigation();

  const viewImage = useCallback(
    (
      params: ImageManagerNavigationParamList[ImageManagerRoutes.ImageViewer],
    ) => {
      rootNavigation.navigate(RootNavigationRoutes.ImageManager, {
        screen: ImageManagerRoutes.ImageViewer,
        params,
      });
    },
    [rootNavigation],
  );

  return viewImage;
};

export default useViewImage;
