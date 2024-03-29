import roleNameAssets from "@andescalada/common-assets/roleNameAssets";
import {
  ActivityIndicator,
  AddButton,
  Box,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import {
  ZoneManagerRoutes,
  ZoneManagerScreenProps,
} from "@features/zoneManager/Navigation/types";
import useRefresh from "@hooks/useRefresh";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { FC } from "react";
import { FlatList } from "react-native";

type Props = ZoneManagerScreenProps<ZoneManagerRoutes.ZonesByRole>;

const ZonesByRoleScreen: FC<Props> = ({ navigation }) => {
  const { data, isLoading, isFetching, refetch } =
    trpc.user.zonesByRole.useQuery();

  const refresh = useRefresh(refetch, isFetching && !isLoading);

  const rootNavigation = useRootNavigation();

  if (isLoading)
    return (
      <Screen safeAreaDisabled justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Screen>
    );

  return (
    <Screen safeAreaDisabled>
      <FlatList
        refreshControl={refresh}
        contentContainerStyle={{ margin: 16 }}
        data={data}
        ListHeaderComponent={() => (
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginBottom="m"
          >
            <Text variant="h3">Agregar nueva zona</Text>
            <AddButton
              onPress={() =>
                navigation.navigate(ZoneManagerRoutes.AddNewZoneScreen)
              }
            />
          </Box>
        )}
        ListEmptyComponent={() => (
          <Box marginTop="xxl" paddingHorizontal="m">
            <Text variant="p3R" numberOfLines={2}>
              No tienes zonas asignadas en ningún rol 😕
            </Text>
          </Box>
        )}
        renderItem={({ item }) => (
          <Box marginBottom="m">
            <Text variant="h4" marginBottom="s">
              {roleNameAssets[item.role].label}
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={item.zones}
              renderItem={({ item: zone, index }) => (
                <Pressable
                  height={100}
                  minWidth={100}
                  maxWidth={150}
                  justifyContent="center"
                  borderColor={roleNameAssets[item.role].color}
                  borderWidth={3}
                  borderRadius={16}
                  padding="s"
                  marginRight="xs"
                  marginLeft={index === 0 ? "none" : "xs"}
                  onPress={() =>
                    rootNavigation.navigate(RootNavigationRoutes.Climbs, {
                      screen: ClimbsNavigationRoutes.Zone,
                      params: { zoneId: zone.id, zoneName: zone.name },
                    })
                  }
                >
                  <Text variant="p2R" numberOfLines={2} ellipsizeMode="middle">
                    {zone.name}
                  </Text>
                </Pressable>
              )}
            />
          </Box>
        )}
      />
    </Screen>
  );
};

export default ZonesByRoleScreen;
