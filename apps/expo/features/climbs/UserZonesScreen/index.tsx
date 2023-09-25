import {
  ActivityIndicator,
  Box,
  Button,
  ButtonGroup,
  Ionicons,
  Pressable,
  Screen,
  ScrollView,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRoutes,
} from "@features/climbs/Navigation/types";
import FeaturedZoneItem from "@features/climbs/UserZonesScreen/FeaturedZoneItem";
import { ZoneCarouselModes } from "@features/climbs/UserZonesScreen/types";
import UserZoneCarouselSwitch from "@features/climbs/UserZonesScreen/UserZoneCarouselSwitch";
import ZoneCarouselSelector from "@features/climbs/UserZonesScreen/ZoneCarouselSelector";
import { ZoneManagerRoutes } from "@features/zoneManager/Navigation/types";
import useFeaturedZones from "@hooks/useFeaturedZones";
import useIsConnected from "@hooks/useIsConnected";
import useOfflineMode from "@hooks/useOfflineMode";
import useOwnInfo from "@hooks/useOwnInfo";
import useRecentZones from "@hooks/useRecentZones";
import useRefresh from "@hooks/useRefresh";
import useRootNavigation from "@hooks/useRootNavigation";
import useSentryWithPermission from "@hooks/useSentryWithPermission";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useNavigation } from "@react-navigation/native";
import emptyArray from "@utils/emptyArray";
import { atomWithMMKV, Storage } from "@utils/mmkv/storage";
import { useAtom } from "jotai";
import { FlatList } from "react-native";

const selectedZoneCarouselAtom = atomWithMMKV<ZoneCarouselModes>(
  Storage.HOME_CAROUSEL,
  ZoneCarouselModes.favorites,
);

const UserZonesScreen = () => {
  const navigation =
    useNavigation<
      ClimbsNavigationNavigationProps<ClimbsNavigationRoutes.Home>
    >();

  const isConnected = useIsConnected();
  const { data, isLoading, refetch, isFetching } = useOwnInfo();
  const refresh = useRefresh(refetch, isFetching);

  const rootNavigation = useRootNavigation();

  const utils = trpc.useContext();

  const { activateOfflineMode } = useOfflineMode();

  const recentZones = useRecentZones();
  const featuredZones = useFeaturedZones();

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

  const [zoneMode, setZoneMode] = useAtom(selectedZoneCarouselAtom);

  useSentryWithPermission();

  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size={"large"} />
      </Screen>
    );

  if (!isConnected && process.env.OFFLINE_DEV !== "true")
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
          padding="m"
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
    <Screen paddingBottom="none" safeAreaDisabled>
      <Box flexDirection="row" width="100%" padding="m" paddingBottom="none">
        <Pressable
          borderRadius={4}
          flex={1}
          backgroundColor="filledTextInputVariantBackground"
          height={40}
          onPress={() => {
            navigation.navigate(ClimbsNavigationRoutes.SearchClimbs);
          }}
          alignItems="center"
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
      <ScrollView
        paddingTop="s"
        paddingHorizontal="m"
        refreshControl={refresh}
        showsVerticalScrollIndicator={false}
      >
        <Box marginBottom="s">
          <Text variant="p1R" marginBottom="s">
            Zonas destacadas
          </Text>
          <FlatList
            horizontal
            data={featuredZones.data}
            renderItem={({ item }) => <FeaturedZoneItem item={item} />}
          />
        </Box>
        <Box>
          <Text variant="p1R">Zonas de escalada</Text>
          <Box
            marginTop="s"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <ButtonGroup
              value={zoneMode}
              allowUndefined={false}
              onChange={(v) => setZoneMode(v as ZoneCarouselModes)}
            >
              <Box flexDirection="row" gap="s">
                <ZoneCarouselSelector mode={ZoneCarouselModes.favorites} />
                <ZoneCarouselSelector mode={ZoneCarouselModes.owner} />
                <ZoneCarouselSelector mode={ZoneCarouselModes.recent} />
              </Box>
            </ButtonGroup>
            {zoneMode === ZoneCarouselModes.recent &&
              !emptyArray(recentZones.data) && (
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
            {zoneMode === ZoneCarouselModes.owner && (
              <Button
                variant="transparentSimplified"
                title={
                  emptyArray(data?.RoleByZone) ? "Agregar zona" : "Ver más"
                }
                titleVariant="p3R"
                paddingHorizontal="s"
                height={30}
                onPress={() => {
                  rootNavigation.navigate(RootNavigationRoutes.ZoneManager, {
                    screen: ZoneManagerRoutes.ZonesByRole,
                  });
                }}
              />
            )}
          </Box>
          <UserZoneCarouselSwitch mode={zoneMode} />
        </Box>
      </ScrollView>
    </Screen>
  );
};

export default UserZonesScreen;
