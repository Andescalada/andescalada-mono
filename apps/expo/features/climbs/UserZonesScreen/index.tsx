import {
  ActivityIndicator,
  Box,
  Button,
  Ionicons,
  ListItem,
  Pressable,
  Screen,
  ScrollView,
  Text,
} from "@andescalada/ui";
import { SQUARED_LIST_ITEM_SIZE } from "@andescalada/ui/Theme/listItemVariants";
import { trpc } from "@andescalada/utils/trpc";
import { Octicons } from "@expo/vector-icons";
import {
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRoutes,
} from "@features/climbs/Navigation/types";
import { ZoneManagerRoutes } from "@features/zoneManager/Navigation/types";
import { useAppTheme } from "@hooks/useAppTheme";
import useIsConnected from "@hooks/useIsConnected";
import useOfflineMode from "@hooks/useOfflineMode";
import useOwnInfo from "@hooks/useOwnInfo";
import useRefresh from "@hooks/useRefresh";
import useRootNavigation from "@hooks/useRootNavigation";
import useSentryWithPermission from "@hooks/useSentryWithPermission";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useNavigation } from "@react-navigation/native";
import emptyArray from "@utils/emptyArray";
import { FlatList } from "react-native";

const UserZonesScreen = () => {
  const navigation =
    useNavigation<
      ClimbsNavigationNavigationProps<ClimbsNavigationRoutes.Home>
    >();

  const isConnected = useIsConnected();
  const { data, isLoading, refetch, isFetching } = useOwnInfo();
  const refresh = useRefresh(refetch, isFetching);

  const rootNavigation = useRootNavigation();

  const theme = useAppTheme();

  const utils = trpc.useContext();

  const { activateOfflineMode } = useOfflineMode();

  const recentZones = trpc.user.zoneHistory.useQuery();

  const removeAllRecentZones = trpc.user.removeAllRecentZones.useMutation({
    onMutate: async () => {
      await utils.user.zoneHistory.cancel();
      const previousData = utils.user.zoneHistory.getData();
      utils.user.zoneHistory.setData(undefined, (old) =>
        old ? [] : undefined,
      );
      return { previousData };
    },
    onError: (_, __, context) => {
      utils.user.zoneHistory.setData(undefined, context?.previousData);
    },
  });

  const removeRecentZone = trpc.user.removeRecentZone.useMutation({
    onMutate: async ({ zoneId }) => {
      await utils.user.zoneHistory.cancel();
      const previousData = utils.user.zoneHistory.getData();
      utils.user.zoneHistory.setData(undefined, (old) =>
        old ? old.filter((z) => z.id !== zoneId) : undefined,
      );
      return { previousData };
    },
    onError: (_, __, context) => {
      utils.user.zoneHistory.setData(undefined, context?.previousData);
    },
  });

  useSentryWithPermission();

  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size={"large"} />
      </Screen>
    );
  if (!isConnected)
    return (
      <Screen alignItems="center" justifyContent="center" safeAreaDisabled>
        <Box height={60} width={60} justifyContent="center" alignItems="center">
          {isFetching ? (
            <ActivityIndicator size={"large"} color="text" />
          ) : (
            <Ionicons name="cloud-offline-outline" size={60} />
          )}
        </Box>
        <Text variant="h2" marginBottom="xs">
          Sin conexión
        </Text>
        <Text variant="p2R" paddingHorizontal={"xl"}>
          Si tienes zonas descargadas puedes activar el modo offline para
          verlas.
        </Text>
        <Button
          variant="info"
          titleVariant={"p2R"}
          marginTop="xxl"
          title="Activar modo offline"
          onPress={activateOfflineMode}
        />
        <Pressable marginTop="s" onPress={() => refetch()}>
          <Text variant={"p2R"} textDecorationLine="underline">
            Recargar
          </Text>
        </Pressable>
      </Screen>
    );
  return (
    <Screen padding="m" paddingBottom="none" safeAreaDisabled>
      <Box flexDirection="row" width="100%">
        <Pressable
          borderRadius={4}
          flex={2}
          backgroundColor="filledTextInputVariantBackground"
          height={40}
          onPress={() => {
            navigation.navigate(ClimbsNavigationRoutes.SearchClimbs);
          }}
          alignItems="center"
          marginBottom="m"
          paddingLeft="s"
          flexDirection="row"
          overflow="hidden"
        >
          <Ionicons name="search" size={24} color="grayscale.600" />
          <Text variant="p1R" color="grayscale.600" paddingLeft="xs">
            Buscar zona, ruta ...
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
      <ScrollView refreshControl={refresh} showsVerticalScrollIndicator={false}>
        <Box>
          <Box flexDirection="row" alignItems="center">
            <Text variant="h2" marginRight="s">
              Zonas favoritas
            </Text>
            <Octicons name="heart" size={24} color={theme.colors.text} />
          </Box>
          {emptyArray(data?.FavoriteZones) && (
            <Box marginTop={"s"}>
              <Text>No tienes favoritas aún</Text>
            </Box>
          )}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data?.FavoriteZones}
            renderItem={({ item, index }) => (
              <ListItem
                key={item.id}
                marginVertical="s"
                onPress={() =>
                  navigation.navigate(ClimbsNavigationRoutes.Zone, {
                    zoneId: item.id,
                    zoneName: item.name,
                  })
                }
                variant="squaredPrimaryA"
                justifyContent="flex-end"
                marginRight="xs"
                marginLeft={index === 0 ? "none" : "xs"}
              >
                <Text variant="p3B" numberOfLines={3} ellipsizeMode="tail">
                  {item.name}
                </Text>
              </ListItem>
            )}
          />
        </Box>
        <Box>
          <Box
            flexDirection="row"
            alignItems="center"
            marginTop="m"
            justifyContent="space-between"
          >
            <Box flexDirection="row" alignItems="center">
              <Text variant="h2" marginRight="s">
                Tus zonas
              </Text>
              <Octicons name="person" size={24} color={theme.colors.text} />
            </Box>
            <Button
              variant="transparentSimplified"
              title="Ver más"
              titleVariant="p3R"
              paddingHorizontal="s"
              height={30}
              onPress={() => {
                rootNavigation.navigate(RootNavigationRoutes.ZoneManager, {
                  screen: ZoneManagerRoutes.ZonesByRole,
                });
              }}
            />
          </Box>

          {emptyArray(data?.RoleByZone) && (
            <Box
              marginTop={"s"}
              height={SQUARED_LIST_ITEM_SIZE}
              justifyContent="center"
            >
              <Text>No tienes ninguna zona</Text>
            </Box>
          )}
          {!emptyArray(data?.RoleByZone) && (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data?.RoleByZone}
              renderItem={({ item: { Zone: item }, index }) => (
                <ListItem
                  key={item.id}
                  marginVertical="s"
                  onPress={() =>
                    navigation.navigate(ClimbsNavigationRoutes.Zone, {
                      zoneId: item.id,
                      zoneName: item.name,
                    })
                  }
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  variant="squaredPrimaryB"
                  marginRight="xs"
                  marginLeft={index === 0 ? "none" : "xs"}
                >
                  <Text variant="p3B" numberOfLines={3} ellipsizeMode="tail">
                    {item.name}
                  </Text>
                </ListItem>
              )}
            />
          )}
        </Box>
        <Box>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginTop="m"
          >
            <Box flexDirection="row" alignItems="center">
              <Text variant="h2" marginRight="s">
                Zonas recientes
              </Text>
              <Octicons name="history" size={24} color={theme.colors.text} />
            </Box>
            {!emptyArray(recentZones.data) && (
              <Button
                variant="transparentSimplified"
                title="Borrar todo"
                titleVariant="p3R"
                paddingHorizontal="s"
                height={30}
                onPress={() => {
                  removeAllRecentZones.mutate();
                }}
              />
            )}
          </Box>

          {emptyArray(recentZones?.data) && (
            <Box
              marginTop={"s"}
              height={SQUARED_LIST_ITEM_SIZE}
              justifyContent="center"
            >
              <Text>No hay zonas recientes</Text>
            </Box>
          )}
          {recentZones.isLoading && (
            <Box
              marginTop={"xl"}
              justifyContent="center"
              alignItems="center"
              height={SQUARED_LIST_ITEM_SIZE}
            >
              <ActivityIndicator size="large" />
            </Box>
          )}

          {!emptyArray(recentZones?.data) && (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={recentZones.data}
              renderItem={({ item, index }) => (
                <ListItem
                  key={item.id}
                  marginVertical={"s"}
                  onPress={() =>
                    navigation.navigate(ClimbsNavigationRoutes.Zone, {
                      zoneId: item.id,
                      zoneName: item.name,
                    })
                  }
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  variant="squared"
                  marginRight="xs"
                  marginLeft={index === 0 ? "none" : "xs"}
                >
                  <Box position="absolute" top={0} right={0} margin="xs">
                    <Ionicons
                      color="grayscale.white"
                      name="close"
                      size={20}
                      onPress={() => {
                        removeRecentZone.mutate({ zoneId: item.id });
                      }}
                    />
                  </Box>
                  <Text variant="p3B" numberOfLines={3} ellipsizeMode="tail">
                    {item.name}
                  </Text>
                </ListItem>
              )}
            />
          )}
        </Box>
      </ScrollView>
    </Screen>
  );
};

export default UserZonesScreen;
