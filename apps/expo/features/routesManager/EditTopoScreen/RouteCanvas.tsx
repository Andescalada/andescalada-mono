import { Dimensions, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  HandlerStateChangeEvent,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { ReactNativeZoomableView as ZoomView } from '@openspacelabs/react-native-zoomable-view';
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
}

const { width: initialScreenWidth } = Dimensions.get('window');

const RouteCanvas: React.FC<Props> = ({
  children,
  value,
  setValue,
  height = 400,
  width = initialScreenWidth,
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
      <View style={styles.frame}>
        <ZoomView
          maxZoom={30}
          zoomEnabled={false}
          contentWidth={width}
          contentHeight={height}
          minZoom={1}
          style={styles.routeContainer}
        >
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
  routeContainer: { backgroundColor: '#FFF' },
});
