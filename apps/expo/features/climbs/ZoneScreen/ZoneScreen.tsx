import zone from "@andescalada/api/schemas/zone";
import { Box, Pressable, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import Header from "@features/climbs/components/Header";
import useHeaderOptionButton from "@features/climbs/components/HeaderOptionsButton/useHeaderOptions";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import NoSectors from "@features/climbs/ZoneScreen/NoSectors";
import ToolBar from "@features/climbs/ZoneScreen/ToolBar";
import useDownloadedButton from "@features/climbs/ZoneScreen/useDownloadedButton";
import useFavoritedButton from "@features/climbs/ZoneScreen/useFavoritedButton";
import ZoneItem from "@features/climbs/ZoneScreen/ZoneItem";
import { ZoneLocationRoutes } from "@features/zoneLocation/Navigation/types";
import useOfflineMode from "@hooks/useOfflineMode";
import useOptionsSheet from "@hooks/useOptionsSheet";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import useRootNavigation from "@hooks/useRootNavigation";
import useZodForm from "@hooks/useZodForm";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useFocusEffect } from "@react-navigation/native";
import featureFlags from "@utils/featureFlags";
import { ComponentProps, FC, useCallback, useState } from "react";
import { FormProvider } from "react-hook-form";
import { Alert, FlatList } from "react-native";

const { schema } = zone;

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Zone>;

const ZoneScreen: FC<Props> = ({ route, navigation }) => {
  const { zoneId, zoneName } = route.params;

  const utils = trpc.useContext();

  const rootNavigation = useRootNavigation();

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
  const methods = useZodForm({ schema: schema.pick({ name: true }) });

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

  const { isDownloaded, onDownloadPress } = useDownloadedButton(zoneId);
  const { isFavorite, onFavoritePress } = useFavoritedButton(zoneId);

  const [openAll, setOpenAll] = useState(false);

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
          ListHeaderComponent={() => {
            return (
              <Box marginTop="s">
                {featureFlags.storyBar && (
                  <Box flexDirection="row" marginBottom="m">
                    <StoryButton title="Acuerdos" />
                    <StoryButton
                      title="Mapa"
                      onPress={() =>
                        rootNavigation.navigate(
                          RootNavigationRoutes.ZoneLocation,
                          { screen: ZoneLocationRoutes.ZoneMap },
                        )
                      }
                    />
                    <StoryButton title="Como llegar" />
                    <StoryButton title="Flora y fauna" />
                  </Box>
                )}
                {!!data && data.hasAccess ? (
                  <ToolBar
                    isDownloaded={isDownloaded}
                    isFavorite={isFavorite}
                    onDownloadPress={onDownloadPress}
                    onFavoritePress={onFavoritePress}
                    openAll={openAll}
                    setOpenAll={setOpenAll}
                  />
                ) : null}
              </Box>
            );
          }}
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

interface StoryButtonProps extends ComponentProps<typeof Pressable> {
  title: string;
}

const StoryButton = ({ title, ...props }: StoryButtonProps) => (
  <Pressable
    alignItems="center"
    marginHorizontal="xs"
    height={60}
    width={60}
    {...props}
  >
    <Box
      height={60}
      width={60}
      borderRadius={30}
      borderWidth={2}
      borderColor="brand.primaryA"
    />
    <Text variant="caption" marginTop="xs" textAlign="center" fontSize={10}>
      {title}
    </Text>
  </Pressable>
);
