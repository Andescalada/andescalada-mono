import { InfoAccessSchema } from "@andescalada/db/zod";
import {
  ActivityIndicator,
  Box,
  Button,
  ListItem,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import theme from "@andescalada/ui/Theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import useOwnInfo from "@hooks/useOwnInfo";
import useRefresh from "@hooks/useRefresh";
import useSentryWithPermission from "@hooks/useSentryWithPermission";
import { FlatList, Keyboard } from "react-native";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.UserZones>;

type InfoAccess = keyof typeof InfoAccessSchema.Enum;

const INFO_ACCESS_FLAG = false;

const InfoAccessColor = (infoAccess: InfoAccess) => {
  switch (infoAccess) {
    case InfoAccessSchema.Enum.Community:
      return "semantic.warning" as const;
    case InfoAccessSchema.Enum.Private:
      return "private" as const;
    case InfoAccessSchema.Enum.Public:
      return "semantic.success" as const;
  }
};

const UserZonesScreen = ({ navigation }: Props) => {
  const { data, isLoading, refetch, isFetching } = useOwnInfo();
  const refresh = useRefresh(refetch, isFetching);

  useSentryWithPermission();

  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size={"large"} />
      </Screen>
    );
  return (
    <Screen padding="m" safeAreaDisabled>
      <Box flexDirection="row" width="100%">
        <Pressable
          borderRadius={4}
          flex={2}
          backgroundColor="filledTextInputVariantBackground"
          height={40}
          onPress={() => {
            Keyboard.dismiss();
            // findZoneRef.current?.expand();
          }}
          alignItems="center"
          marginBottom="m"
          paddingLeft="s"
          flexDirection="row"
        >
          <Ionicons
            name="search"
            size={24}
            color={theme.colors["grayscale.600"]}
          />
          <Text variant="p1R" color="grayscale.600" paddingLeft="xs">
            {"Buscar zonas"}
          </Text>
        </Pressable>
        <Button
          title="Ver todas"
          flex={0.5}
          marginLeft="s"
          variant="transparentSimplified"
          height={40}
          titleVariant="p3R"
          paddingHorizontal="s"
          onPress={() => {
            navigation.navigate(ClimbsNavigationRoutes.ZonesList);
          }}
        />
      </Box>
      <Box flex={1}>
        <Text variant="h2">Zonas favoritas</Text>
        <FlatList
          data={data?.FavoriteZones}
          refreshControl={refresh}
          renderItem={({ item }) => (
            <ListItem
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
              {INFO_ACCESS_FLAG && (
                <Box
                  width={15}
                  height={15}
                  backgroundColor={InfoAccessColor(item.infoAccess)}
                  borderRadius={10}
                />
              )}
            </ListItem>
          )}
        />
      </Box>
      <Box flex={1 / 2}>
        <Text variant="h2">Zonas recientes</Text>
        <FlatList
          data={data?.RecentZones}
          refreshControl={refresh}
          renderItem={({ item }) => (
            <ListItem
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
              {INFO_ACCESS_FLAG && (
                <Box
                  width={15}
                  height={15}
                  backgroundColor={InfoAccessColor(item.infoAccess)}
                  borderRadius={10}
                />
              )}
            </ListItem>
          )}
        />
      </Box>
    </Screen>
  );
};

export default UserZonesScreen;
