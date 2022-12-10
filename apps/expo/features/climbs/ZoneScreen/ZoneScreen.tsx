import zone from "@andescalada/api/schemas/zone";
import { A, Box, Pressable, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "@features/climbs/components/Header";
import useHeaderOptionButton from "@features/climbs/components/HeaderOptionsButton/useHeaderOptions";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import NoSectors from "@features/climbs/ZoneScreen/NoSectors";
import useDownloadedButton from "@features/climbs/ZoneScreen/useDownloadedButton";
import useFavoritedButton from "@features/climbs/ZoneScreen/useFavoritedButton";
import ZoneItem from "@features/climbs/ZoneScreen/ZoneItem";
import { useAppTheme } from "@hooks/useAppTheme";
import useOfflineMode from "@hooks/useOfflineMode";
import useOptionsSheet from "@hooks/useOptionsSheet";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import useZodForm from "@hooks/useZodForm";
import { useFocusEffect } from "@react-navigation/native";
import { FC, useCallback, useState } from "react";
import { FormProvider } from "react-hook-form";
import { Alert, FlatList } from "react-native";
import {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

const { schema } = zone;

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Zone>;

const ZoneScreen: FC<Props> = ({ route, navigation }) => {
  const { zoneId, zoneName } = route.params;

  const utils = trpc.useContext();

  const { isOfflineMode } = useOfflineMode();

  const recentZones = trpc.user.addToRecentZones.useMutation({
    onSuccess: () => {
      utils.user.zoneHistory.invalidate();
    },
  });

  useFocusEffect(
    useCallback(() => {
      recentZones.mutate({ zoneId });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zoneId]),
  );

  const { data, refetch, isFetching, isLoading, isError, isPaused } =
    trpc.zones.allSectors.useQuery(
      { zoneId },
      {
        onSuccess() {
          utils.user.zoneHistory.invalidate();
        },
      },
    );

  const refresh = useRefresh(refetch, isFetching && !isLoading);

  const editZone = trpc.zones.edit.useMutation();
  const methods = useZodForm({ schema });

  const onSubmit = methods.handleSubmit(
    (input) => {
      if (input.name !== zoneName)
        editZone.mutate(
          {
            name: input.name,
            zoneId,
          },
          {
            onSuccess: () => {
              utils.user.ownInfo.invalidate();
            },
          },
        );
      headerMethods.setEditing(false);
    },
    (error) => {
      const errorMessage = error.name?.message || "Hubo un error";
      Alert.alert(errorMessage);
      methods.setValue("name", route.params.zoneName);
      headerMethods.setEditing(false);
    },
  );

  const headerMethods = useHeaderOptionButton({ onSave: onSubmit });

  const { permission } = usePermissions({ zoneId });

  const onOptions = useOptionsSheet({
    "Editar zona": {
      action: () =>
        navigation.navigate(ClimbsNavigationRoutes.AdminZoneOptions, {
          zoneId,
          zoneName,
        }),
    },
    "Cambiar Nombre": {
      action: () => headerMethods.setEditing(true),
      hide: !permission?.has("Update"),
    },
  });

  const theme = useAppTheme();

  const { isDownloaded, onDownloadPress } = useDownloadedButton(zoneId);
  const { isFavorite, onFavoritePress } = useFavoritedButton(zoneId);

  const [openAll, setOpenAll] = useState(false);

  const open = useDerivedValue(() => (openAll ? 0 : -180));
  const degs = useDerivedValue(() => withTiming(open.value));

  const toggleButtonStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${degs.value}deg` }],
  }));

  if (isPaused && !isOfflineMode)
    return (
      <Screen padding="m" justifyContent="center" alignItems="center">
        <Text>Sin conexión a internet</Text>
      </Screen>
    );

  return (
    <Screen padding="m">
      <FormProvider {...methods}>
        <Header
          title={route.params.zoneName}
          editingTitle={headerMethods.editing}
          headerOptionsProps={{ ...headerMethods, onOptions: onOptions }}
        />
      </FormProvider>
      <Box flex={1}>
        <FlatList
          data={data?.sectors}
          refreshControl={refresh}
          contentContainerStyle={{ flex: 1 }}
          ListHeaderComponent={() =>
            !!data && data.hasAccess ? (
              <Box flexDirection="row" justifyContent="flex-end">
                <Pressable onPress={onDownloadPress}>
                  <Ionicons
                    name={
                      isDownloaded
                        ? "arrow-down-circle"
                        : "arrow-down-circle-outline"
                    }
                    size={30}
                    color={theme.colors["zoneOptionsIcons"]}
                  />
                </Pressable>
                <Pressable marginHorizontal="s" onPress={onFavoritePress}>
                  <Ionicons
                    name={isFavorite ? "heart-circle" : "heart-circle-outline"}
                    size={30}
                    color={theme.colors["zoneOptionsIcons"]}
                  />
                </Pressable>
                <A.Pressable
                  onPress={() => {
                    setOpenAll((prev) => !prev);
                  }}
                  style={toggleButtonStyle}
                >
                  <Ionicons
                    name={
                      openAll
                        ? "caret-down-circle"
                        : "caret-down-circle-outline"
                    }
                    size={30}
                    color={theme.colors["zoneOptionsIcons"]}
                  />
                </A.Pressable>
              </Box>
            ) : null
          }
          ListEmptyComponent={() => (
            <NoSectors
              isLoading={isLoading}
              isError={isError}
              hasAccess={!!data?.hasAccess}
              infoAccess={data?.infoAccess}
            />
          )}
          renderItem={({ item }) => (
            <ZoneItem item={item} defaultOpen={openAll} />
          )}
        />
      </Box>
    </Screen>
  );
};

export default ZoneScreen;
