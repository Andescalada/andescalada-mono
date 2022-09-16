import { Dimensions, Image, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  HandlerStateChangeEvent,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {
  ReactNativeZoomableView as ZoomView,
  ReactNativeZoomableViewProps,
} from '@openspacelabs/react-native-zoomable-view';
import Svg from 'react-native-svg';

interface Coords {
  x: number;
  y: number;
}

interface Props {
  value: Coords | undefined;
  setValue: (_coords: Coords | undefined) => void;
  height?: number;
  width?: number;
  imageUri: string | undefined | null;
  zoomProps?: ReactNativeZoomableViewProps;
}

const { width: initialScreenWidth, height: screenHeight } =
  Dimensions.get('window');

const RouteCanvas: React.FC<Props> = ({
  children,
  value,
  setValue,
  height = screenHeight,
  width = initialScreenWidth,
  imageUri,
  zoomProps,
}) => {
  const [tappedCoords, setTapCoords] = useState<Coords | undefined>(value);
  const onGestureHandler = useCallback(
    (e: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
      setTapCoords({ x: e.nativeEvent.x, y: e.nativeEvent.y });
    },
    [],
  );

  useEffect(() => {
    setValue(tappedCoords);
  }, [tappedCoords, setValue]);

  return (
    <TapGestureHandler onHandlerStateChange={onGestureHandler}>
      <View style={{ height: screenHeight }}>
        <ZoomView
          maxZoom={30}
          bindToBorders={false}
          contentWidth={width}
          contentHeight={height}
          minZoom={1}
          style={styles.routeContainer}
          {...zoomProps}
        >
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{ height, width, position: 'absolute' }}
            />
          )}
          <Svg height={height} width={width}>
            {children}
          </Svg>
        </ZoomView>
      </View>
    </TapGestureHandler>
  );
};

export default RouteCanvas;

const styles = StyleSheet.create({
  frame: {
    height: 400,
    overflow: 'hidden',
  },
  routeContainer: { zIndex: 1000 },
});
