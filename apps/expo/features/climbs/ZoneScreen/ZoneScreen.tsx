import zone from "@andescalada/api/schemas/zone";
import { InfoAccessSchema } from "@andescalada/db/zod";
import {
  A,
  ActivityIndicator,
  Box,
  Button,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "@features/climbs/components/Header";
import useHeaderOptionButton from "@features/climbs/components/HeaderOptionsButton/useHeaderOptions";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
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

  const { data, refetch, isFetching, isLoading, isError, isPaused, status } =
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
      {!!data && data.hasAccess && (
        <Box flexDirection="row" justifyContent="flex-end">
          <Pressable onPress={onDownloadPress}>
            <Ionicons
              name={
                isDownloaded ? "arrow-down-circle" : "arrow-down-circle-outline"
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
              name={openAll ? "caret-down-circle" : "caret-down-circle-outline"}
              size={30}
              color={theme.colors["zoneOptionsIcons"]}
            />
          </A.Pressable>
        </Box>
      )}
      <Box flex={1}>
        <FlatList
          data={data?.sectors}
          refreshControl={refresh}
          contentContainerStyle={{ flex: 1 }}
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

interface NoZonesProps {
  isLoading: boolean;
  isError: boolean;
  hasAccess: boolean;
  infoAccess: keyof typeof InfoAccessSchema.Enum | undefined;
}

const NoSectors = ({
  isLoading,
  hasAccess,
  infoAccess,
  isError,
}: NoZonesProps) => {
  const title =
    infoAccess === InfoAccessSchema.Enum.Private
      ? "Acceso Privado"
      : "Acceso Comunitario";
  const description =
    infoAccess === InfoAccessSchema.Enum.Private
      ? "Solo los y las administradoras de la zona pueden darte acceso."
      : "Cualquier persona que ya tenga acceso a estos topos puede entregarte acceso.";
  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size={"large"} />
      </Screen>
    );

  if (!hasAccess && !isError)
    return (
      <Box flex={1} justifyContent={"flex-start"}>
        <Box flex={1 / 3} justifyContent="center">
          <Text variant="h2" marginBottom="l">
            {title}
          </Text>
          <Text variant="p1R" marginBottom="m">
            No tienes permiso para ver esta zona
          </Text>
          <Text marginBottom="s">{description}</Text>
        </Box>
        <Button variant="info" title="Solicitar acceso" alignSelf="center" />
      </Box>
    );

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text variant={"h3"}>Sin sectores</Text>
    </Box>
  );
};

export default ZoneScreen;
