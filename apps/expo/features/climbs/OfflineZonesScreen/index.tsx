import {
  Box,
  Ionicons,
  ListItem,
  Screen,
  ScrollView,
  Text,
} from "@andescalada/ui";
import { downloadedZonesAtom } from "@atoms/index";
import {
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRoutes,
} from "@features/climbs/Navigation/types";
import { useNavigation } from "@react-navigation/native";
import emptyArray from "@utils/emptyArray";
import { useAtom } from "jotai";
import { useMemo } from "react";

const OfflineZonesScreen = () => {
  const downloadedZones = useAtom(downloadedZonesAtom)[0];

  const data = useMemo(
    () =>
      Object.entries(downloadedZones).map(([key, value]) => ({
        id: key,
        name: value.zoneName,
      })),
    [downloadedZones],
  );

  const navigation =
    useNavigation<
      ClimbsNavigationNavigationProps<ClimbsNavigationRoutes.Home>
    >();
  return (
    <Screen safeAreaDisabled>
      <ScrollView padding="m">
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box flexDirection="row" alignItems="center">
            <Text variant="h2" marginRight="s">
              Zonas descargadas
            </Text>
            <Ionicons name="arrow-down-circle-sharp" size={24} color="text" />
          </Box>
        </Box>
        {emptyArray(data) && (
          <Box marginTop={"s"}>
            <Text>No tienes zonas descargadas</Text>
          </Box>
        )}
        {data.map((item) => (
          <ListItem
            key={item.id}
            marginVertical={"s"}
            onPress={() =>
              navigation.navigate(ClimbsNavigationRoutes.Zone, {
                zoneId: item.id,
                zoneName: item.name,
              })
            }
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Text variant="p1R">{item.name}</Text>
          </ListItem>
        ))}
      </ScrollView>
    </Screen>
  );
};

export default OfflineZonesScreen;
