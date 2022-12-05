import { Screen } from "@andescalada/ui";
import {
  ImageManagerRoutes,
  ImageManagerScreenProps,
} from "@features/imageManager/Navigation/types";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { FC } from "react";
import { Image } from "react-native";

type Props = ImageManagerScreenProps<ImageManagerRoutes.ImageViewer>;

const ImageViewerScreen: FC<Props> = ({ route: { params } }) => {
  return (
    <Screen>
      <ReactNativeZoomableView>
        <Image {...params} />
      </ReactNativeZoomableView>
    </Screen>
  );
};

export default ImageViewerScreen;
