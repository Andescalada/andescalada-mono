import { BackButton, Screen } from "@andescalada/ui";
import {
  ImageManagerRoutes,
  ImageManagerScreenProps,
} from "@features/imageManager/Navigation/types";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { fitContent, SCREEN_HEIGHT, SCREEN_WIDTH } from "@utils/Dimensions";
import { FC, useMemo } from "react";
import { Image, ImageURISource } from "react-native";

type Props = ImageManagerScreenProps<ImageManagerRoutes.ImageViewer>;

const ImageViewerScreen: FC<Props> = ({
  route: {
    params: { source: s, ...params },
  },
  navigation,
}) => {
  const source = s as ImageURISource;

  const { height, width } = useMemo(() => {
    const fitted = fitContent({
      height: source.height || SCREEN_HEIGHT,
      width: source.width || SCREEN_WIDTH,
    });
    return fitted;
  }, [source.height, source.width]);

  return (
    <Screen>
      <ReactNativeZoomableView
        maxZoom={200}
        minZoom={1}
        visualTouchFeedbackEnabled={false}
      >
        <Image source={{ uri: source.uri, height, width }} {...params} />
      </ReactNativeZoomableView>
      <BackButton.Transparent onPress={navigation.goBack} />
    </Screen>
  );
};

export default ImageViewerScreen;
