import { Box, ListItem, Screen, ScrollView, Text } from "@andescalada/ui";
import theme from "@andescalada/ui/Theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRoutes,
} from "@features/climbs/Navigation/types";
import useOwnInfo from "@hooks/useOwnInfo";
import { useNavigation } from "@react-navigation/native";

const OfflineZonesScreen = () => {
  const { data } = useOwnInfo();
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
            <Ionicons
              name="arrow-down-circle-sharp"
              size={24}
              color={theme.colors.text}
            />
          </Box>
        </Box>
        {data?.RecentZones.length === 0 && (
          <Box marginTop={"s"}>
            <Text>No tienes zonas descargadas</Text>
          </Box>
        )}
        {data?.RecentZones.map((item) => (
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
