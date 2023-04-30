import { BackButton, Screen } from "@andescalada/ui";
import {
  ImageManagerRoutes,
  ImageManagerScreenProps,
} from "@features/imageManager/Navigation/types";
import { useFitContent } from "@hooks/useFitContent";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { FC } from "react";
import { Image, ImageURISource, useWindowDimensions } from "react-native";

type Props = ImageManagerScreenProps<ImageManagerRoutes.ImageViewer>;

const ImageViewerScreen: FC<Props> = ({
  route: {
    params: { source: s, ...params },
  },
  navigation,
}) => {
  const source = s as ImageURISource;

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const { height, width } = useFitContent({
    height: source.height || screenHeight,
    width: source.width || screenWidth,
  });

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
