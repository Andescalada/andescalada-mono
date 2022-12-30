import { MapView } from "@andescalada/maps";
import {
  ActivityIndicator,
  BackButton,
  Box,
  MapTypeToolbar,
  Screen,
  Text,
  useMapType,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { images } from "@assets/images";
import {
  ZoneLocationRoutes,
  ZoneLocationScreenProps,
} from "@features/zoneLocation/Navigation/types";
import { FC, useRef } from "react";
import { Dimensions } from "react-native";
import { Callout, MapMarker, Marker } from "react-native-maps";

type Props = ZoneLocationScreenProps<ZoneLocationRoutes.ZoneMap>;
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.5;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ZoneMapScreen: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId },
  },
}) => {
  const markerRef = useRef<MapMarker>(null);
  const { data, isLoading } = trpc.zones.location.useQuery({ zoneId });

  const mapTypeProps = useMapType();

  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Screen>
    );

  if (!data?.Location?.latitude || !data?.Location?.longitude)
    return (
      <Screen justifyContent="center" alignItems="center">
        <BackButton.Transparent onPress={navigation.goBack} />
        <Text variant="p3R">No tenemos la ubicación de esta zona aún ☹️</Text>
      </Screen>
    );

  return (
    <Screen safeAreaDisabled>
      <MapView
        initialRegion={{
          latitude: Number(data.Location.latitude),
          longitude: Number(data.Location.longitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        mapType={mapTypeProps.mapType}
      >
        <Marker
          ref={markerRef}
          coordinate={{
            latitude: Number(data?.Location?.latitude) || LATITUDE,
            longitude: Number(data?.Location?.longitude) || LONGITUDE,
          }}
          identifier={zoneId}
          image={images.marker.file}
          onLayout={() => markerRef.current?.showCallout()}
        >
          <CalloutContent title={data?.name} />
        </Marker>
      </MapView>
      <BackButton.Transparent
        onPress={navigation.goBack}
        iconProps={{ color: mapTypeProps.mapTypeIconsColor }}
      />
      <MapTypeToolbar {...mapTypeProps} />
    </Screen>
  );
};

export default ZoneMapScreen;

interface CalloutProps {
  title?: string;
}

const CalloutContent = ({ title }: CalloutProps) => (
  <Callout style={{ backgroundColor: "transparent" }} tooltip>
    <Box
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      backgroundColor="brand.primaryA"
      padding="s"
      borderRadius={16}
      marginBottom="s"
    >
      <Text ellipsizeMode="tail" numberOfLines={1}>
        {title}
      </Text>
    </Box>
  </Callout>
);
