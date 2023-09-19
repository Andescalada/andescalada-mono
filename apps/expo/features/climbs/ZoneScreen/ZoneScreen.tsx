import zone from "@andescalada/api/schemas/zone";
import useZodForm from "@andescalada/hooks/useZodForm";
import { Box, Screen, Text, TextButton } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import Header from "@features/climbs/components/Header";
import useHeaderOptionButton from "@features/climbs/components/HeaderOptionsButton/useHeaderOptions";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import SectorsGateway from "@features/climbs/ZoneScreen/SectorsGateway";
import ZoneHeader from "@features/climbs/ZoneScreen/ZoneHeader";
import ZoneItem from "@features/climbs/ZoneScreen/ZoneItem";
import useZonesAllSectors from "@hooks/offlineQueries/useZonesAllSectors";
import useOfflineMode from "@hooks/useOfflineMode";
import useOptionsSheet from "@hooks/useOptionsSheet";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import { useFocusEffect } from "@react-navigation/native";
import constants from "@utils/constants";
import { FC, useCallback } from "react";
import { FormProvider } from "react-hook-form";
import { Alert, FlatList } from "react-native";

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
    onError() {
      return constants.silentError;
    },
  });

  useFocusEffect(
    useCallback(() => {
      if (!isOfflineMode) recentZones.mutate({ zoneId });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zoneId, isOfflineMode]),
  );

  const numberOfToposToVerify = trpc.topos.numberOfToposToVerify.useQuery({
    zoneId,
  });

  const { data, refetch, isFetching, isLoading, isPaused } = useZonesAllSectors(
    { zoneId },
    {
      onSuccess() {
        utils.user.zoneHistory.invalidate();
      },
    },
  );

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

  const {
    permission,
    getPermissions,
    isLoading: isLoadingPermissions,
  } = usePermissions({ zoneId });

  const refresh = useRefresh(() => {
    refetch();
    getPermissions();
    numberOfToposToVerify.refetch();
  }, (isFetching || isLoadingPermissions) && !isLoading);

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
          onGoBack={() => {
            navigation.reset({
              routes: [{ name: ClimbsNavigationRoutes.Home }],
            });
          }}
        />
      </FormProvider>
      <Box flex={1}>
        <SectorsGateway>
          <FlatList
            data={data?.sectors}
            refreshControl={refresh}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={ZoneHeader}
            ListEmptyComponent={() => (
              <Box
                flex={1}
                justifyContent="center"
                alignItems="center"
                marginTop="xxxl"
              >
                <Text variant={"h3"}>Sin sectores</Text>
                {permission.has("Create") && (
                  <TextButton
                    variant="info"
                    onPress={() =>
                      navigation.replace(ClimbsNavigationRoutes.AddSector, {
                        zoneId,
                      })
                    }
                  >
                    Agregar sector
                  </TextButton>
                )}
              </Box>
            )}
            renderItem={({ item }) => <ZoneItem item={item} />}
          />
        </SectorsGateway>
      </Box>
    </Screen>
  );
};

export default ZoneScreen;
