import Mapbox from "@andescalada/maps/mapbox";
import { MapTypeToolbar, Screen, useMapType } from "@andescalada/ui";
import Pin from "@features/zoneManager/components/Pin";
import { ComponentProps, FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  onChange: (coordinates: { latitude: number; longitude: number }) => void;
  defaultValues?: { latitude: number; longitude: number };
  zonePin?: { name: string; latitude: number; longitude: number };
  sectorsPin?: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
  }[];
} & ComponentProps<typeof Mapbox.MapView>;

const LATITUDE = 37.78825;
const LONGITUDE = -122.4555;

const MapLocationSelector: FC<Props> = ({
  children,
  onChange,
  zonePin,
  sectorsPin,
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
        {zonePin && (
          <Pin
            id="zonePin"
            calloutText={zonePin.name}
            latitude={Number(zonePin.latitude)}
            longitude={Number(zonePin.longitude)}
            isSelected
          />
        )}
        {sectorsPin?.map((sector) => (
          <Pin
            key={sector.id}
            id={sector.id}
            calloutText={sector.name}
            latitude={sector.latitude}
            longitude={sector.longitude}
            variant="orange"
            isSelected
          />
        ))}
      </Mapbox.MapView>
      {children}
      <MapTypeToolbar {...mapTypeProps} top={150} />
    </Screen>
  );
};

export default MapLocationSelector;
