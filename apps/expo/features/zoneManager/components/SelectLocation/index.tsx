import Mapbox from "@andescalada/maps/mapbox";
import { Box, MapTypeToolbar, Screen, useMapType } from "@andescalada/ui";
import { images } from "@assets/images";
import { ComponentProps, FC, ReactNode } from "react";
import { Image } from "react-native";

type Props = {
  children: ReactNode;
  onChange: (coordinates: { latitude: number; longitude: number }) => void;
  defaultValues?: { latitude: number; longitude: number };
} & ComponentProps<typeof Mapbox.MapView>;

const LATITUDE = 37.78825;
const LONGITUDE = -122.4555;

const MapLocationSelector: FC<Props> = ({
  children,
  onChange,
  defaultValues: { latitude, longitude } = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
  },
  ...props
}) => {
  const mapTypeProps = useMapType();

  return (
    <Screen safeAreaDisabled>
      <Mapbox.MapView
        styleURL={
          mapTypeProps.mapType === "satellite"
            ? Mapbox.StyleURL.SatelliteStreet
            : Mapbox.StyleURL.Street
        }
        style={{ flex: 1 }}
        logoEnabled={false}
        scaleBarPosition={{ bottom: 8, left: 10 }}
        compassEnabled
        attributionEnabled={false}
        compassPosition={{ top: 210, right: 16 }}
        onCameraChanged={({
          properties: { center },
          gestures: { isGestureActive },
        }) => {
          if (!isGestureActive) return;
          onChange({ latitude: center[1], longitude: center[0] });
        }}
        {...props}
      >
        <Mapbox.Camera
          zoomLevel={14}
          animationMode="none"
          defaultSettings={{
            zoomLevel: 10,
            centerCoordinate: [longitude, latitude],
          }}
        />
      </Mapbox.MapView>
      <Box
        position="absolute"
        bottom="50%"
        left="50%"
        height={images.marker.height}
        width={images.marker.width}
      >
        <Image
          source={images.marker.file}
          style={{
            height: images.marker.height,
            width: images.marker.width,
            marginLeft: -images.marker.width / 2,
          }}
        />
      </Box>
      {children}
      <MapTypeToolbar {...mapTypeProps} top={150} />
    </Screen>
  );
};

export default MapLocationSelector;
