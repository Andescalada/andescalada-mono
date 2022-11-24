import { InfoAccessSchema } from "@andescalada/db/zod";
import {
  ActivityIndicator,
  Box,
  Button,
  ListItem,
  Pressable,
  Screen,
  ScrollView,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { Ionicons, Octicons } from "@expo/vector-icons";
import {
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRoutes,
} from "@features/climbs/Navigation/types";
import { useAppTheme } from "@hooks/useAppTheme";
import useOfflineMode from "@hooks/useOfflineMode";
import useOwnInfo from "@hooks/useOwnInfo";
import useRefresh from "@hooks/useRefresh";
import useSentryWithPermission from "@hooks/useSentryWithPermission";
import { useNavigation } from "@react-navigation/native";
import { onlineManager } from "@tanstack/react-query";

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

const UserZonesScreen = () => {
  const navigation =
    useNavigation<
      ClimbsNavigationNavigationProps<ClimbsNavigationRoutes.Home>
    >();
  const { data, isLoading, refetch, isFetching } = useOwnInfo();
  const refresh = useRefresh(refetch, isFetching);

  const theme = useAppTheme();

  const utils = trpc.useContext();

  const { activateOfflineMode } = useOfflineMode();

  const removeAllRecentZones = trpc.user.removeAllRecentZones.useMutation({
    onMutate: async () => {
      await utils.user.ownInfo.cancel();
      const previousData = utils.user.ownInfo.getData();
      utils.user.ownInfo.setData(undefined, (old) =>
        old ? { ...old, RecentZones: [] } : undefined,
      );
      return { previousData };
    },
    onError: (_, __, context) => {
      utils.user.ownInfo.setData(undefined, context?.previousData);
    },
  });

  const removeRecentZone = trpc.user.removeRecentZone.useMutation({
    onMutate: async ({ zoneId }) => {
      await utils.user.ownInfo.cancel();
      const previousData = utils.user.ownInfo.getData();
      utils.user.ownInfo.setData(undefined, (old) =>
        old
          ? {
              ...old,
              RecentZones: old.RecentZones.filter((z) => z.id !== zoneId),
            }
          : undefined,
      );
      return { previousData };
    },
    onError: (_, __, context) => {
      utils.user.ownInfo.setData(undefined, context?.previousData);
    },
  });

  useSentryWithPermission();

  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size={"large"} />
      </Screen>
    );
  if (!onlineManager.isOnline)
    return (
      <Screen alignItems="center" justifyContent="center" safeAreaDisabled>
        <Box height={60} width={60} justifyContent="center" alignItems="center">
          {isFetching ? (
            <ActivityIndicator size={"large"} color="text" />
          ) : (
            <Ionicons
              name="cloud-offline-outline"
              size={60}
              color={theme.colors.text}
            />
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
    <Screen padding="m" safeAreaDisabled>
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
          <Ionicons
            name="search"
            size={24}
            color={theme.colors["grayscale.600"]}
          />
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
      <ScrollView refreshControl={refresh}>
        <Box>
          <Box flexDirection="row" alignItems="center">
            <Text variant="h2" marginRight="s">
              Zonas favoritas
            </Text>
            <Octicons name="heart" size={24} color={theme.colors.text} />
          </Box>
          {data?.FavoriteZones.length === 0 && (
            <Box marginTop={"s"}>
              <Text>No tienes favoritas aún</Text>
            </Box>
          )}
          {data?.FavoriteZones.map((item) => (
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
              {INFO_ACCESS_FLAG && (
                <Box
                  width={15}
                  height={15}
                  backgroundColor={InfoAccessColor(item.infoAccess)}
                  borderRadius={10}
                />
              )}
            </ListItem>
          ))}
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
            {data?.RecentZones.length !== 0 && (
              <Button
                variant="transparentSimplified"
                title="Borrar todo"
                titleVariant="p3R"
                paddingHorizontal="xs"
                height={30}
                onPress={() => {
                  removeAllRecentZones.mutate();
                }}
              />
            )}
          </Box>
          {data?.RecentZones.length === 0 && (
            <Box marginTop={"s"}>
              <Text>No hay zonas recientes</Text>
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
              <Ionicons
                color="white"
                name="close"
                size={20}
                onPress={() => {
                  removeRecentZone.mutate({ zoneId: item.id });
                }}
              />
              {INFO_ACCESS_FLAG && (
                <Box
                  width={15}
                  height={15}
                  backgroundColor={InfoAccessColor(item.infoAccess)}
                  borderRadius={10}
                />
              )}
            </ListItem>
          ))}
        </Box>
      </ScrollView>
    </Screen>
  );
};

export default UserZonesScreen;
