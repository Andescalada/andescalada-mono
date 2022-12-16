import { MapView } from "@andescalada/maps";
import { BackButton, Screen } from "@andescalada/ui";
import {
  ZoneLocationRoutes,
  ZoneLocationScreenProps,
} from "@features/zoneLocation/Navigation/types";
import { FC } from "react";
import { Dimensions } from "react-native";

type Props = ZoneLocationScreenProps<ZoneLocationRoutes.ZoneMap>;
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ZoneMapScreen: FC<Props> = ({ navigation }) => {
  return (
    <Screen safeAreaDisabled>
      <MapView
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        // customMapStyle={MapStyle}
      />
      <BackButton.Transparent onPress={() => navigation.goBack()} />
    </Screen>
  );
};

export default ZoneMapScreen;
