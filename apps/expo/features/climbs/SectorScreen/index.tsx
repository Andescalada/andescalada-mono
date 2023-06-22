import { SoftDeleteSchema } from "@andescalada/db/zod";
import {
  ActivityIndicator,
  Box,
  Header,
  ListItem,
  Screen,
  Text,
  TextButton,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { ZoneManagerRoutes } from "@features/zoneManager/Navigation/types";
import useSectorsAllWalls from "@hooks/offlineQueries/useSectorsAllWalls";
import useIsConnected from "@hooks/useIsConnected";
import useOptionsSheet from "@hooks/useOptionsSheet";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { sectorKindAssets } from "@utils/sectorKindAssets";
import { FC, useEffect } from "react";
import { Alert, FlatList } from "react-native";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Sector>;

const SectorScreen: FC<Props> = ({ route, navigation }) => {
  const utils = trpc.useContext();

  const isConnected = useIsConnected();

  useEffect(() => {
    if (isConnected) {
      utils.zones.location.prefetch({ zoneId: route.params.zoneId });
    }
  }, [isConnected, route.params.zoneId, utils.zones.location]);

  const { sectorId, zoneId } = route.params;

  const { data, refetch, isFetching, isLoading } = useSectorsAllWalls({
    sectorId,
    zoneId,
  });

  const deleteSector = trpc.sectors.delete.useMutation({
    onMutate: () => {
      navigation.goBack();
    },
    onSuccess: () => {
      Alert.alert(`Sector ${route.params.sectorName} eliminado`);
      utils.zones.allSectors.invalidate({ zoneId });
    },
    onError: () => {
      Alert.alert("No pudimos eliminar el sector, intenta más tarde");
    },
  });

  const refresh = useRefresh(refetch, isFetching);

  const { permission } = usePermissions({ zoneId });

  const rootNavigation = useRootNavigation();

  const onOptions = useOptionsSheet(
    {
      [data ? sectorKindAssets[data.sectorKind].add : "Agregar"]: {
        hide: !permission.has("Create"),
        action: () =>
          data
            ? navigation.navigate(ClimbsNavigationRoutes.AddWall, {
                sectorId,
                zoneId,
                sectorKind: data?.sectorKind,
              })
            : null,
      },
      "Editar sector": {
        hide: !permission.has("Update"),
        action: () =>
          data
            ? navigation.navigate(ClimbsNavigationRoutes.AddSector, {
                sectorId,
                zoneId,
                sectorKind: data.sectorKind,
                name: data.name,
              })
            : null,
      },
      "Editar ubicación": {
        hide: !permission.has("Update"),
        action: () =>
          data
            ? rootNavigation.navigate(RootNavigationRoutes.ZoneManager, {
                screen: ZoneManagerRoutes.AddOrEditSectorLocation,
                params: {
                  sectorId,
                  zoneId,
                  sectorName: data.name,
                  ...(data.Location && {
                    latitude: data.Location.latitude,
                    longitude: data.Location.longitude,
                  }),
                },
              })
            : null,
      },
      "Eliminar sector": {
        hide: !permission.has("Delete"),
        action: () => {
          Alert.alert(
            data ? sectorKindAssets[data.sectorKind].delete : "Eliminar",
            "¿Seguro que quieres eliminar este sector?",
            [
              {
                text: "Eliminar",
                onPress: () => {
                  deleteSector.mutate({
                    isDeleted: SoftDeleteSchema.Enum.DeletedPublic,
                    sectorId,
                    zoneId,
                  });
                },
                style: "destructive",
              },
              { text: "Cancelar", style: "cancel" },
            ],
          );
        },
      },
    },
    { destructiveButtonIndex: 3 },
  );

  if (isLoading && !data)
    return (
      <Screen padding="m">
        <Header
          title={route.params.sectorName}
          onGoBack={navigation.goBack}
          marginBottom="m"
          showOptions={false}
        />
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </Box>
      </Screen>
    );

  if (!data)
    return (
      <Screen padding="m">
        <Header
          title={route.params.sectorName}
          onGoBack={navigation.goBack}
          marginBottom="m"
          showOptions={false}
        />
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text>Oh no! ¡Hubo un error!</Text>
        </Box>
      </Screen>
    );

  return (
    <Screen padding="m">
      <Header
        title={route.params.sectorName}
        onGoBack={() =>
          navigation.navigate(ClimbsNavigationRoutes.Zone, {
            zoneId,
            zoneName: data?.Zone.name,
          })
        }
        onOptions={onOptions}
        marginBottom="m"
      />
      <Box flex={1}>
        <FlatList
          data={data.walls}
          refreshControl={refresh}
          ListEmptyComponent={() => (
            <Box
              flex={1}
              justifyContent="center"
              alignItems="center"
              marginTop="xxxl"
            >
              <Text variant="h3">
                {sectorKindAssets[data.sectorKind].noneMessage}
              </Text>
              {permission.has("Create") && (
                <TextButton
                  variant="info"
                  onPress={() =>
                    navigation.navigate(ClimbsNavigationRoutes.AddWall, {
                      sectorId,
                      zoneId,
                      sectorKind: data?.sectorKind,
                    })
                  }
                >{`Agregar ${
                  sectorKindAssets[data.sectorKind].labelLowerCase
                }`}</TextButton>
              )}
            </Box>
          )}
          renderItem={({ item }) => (
            <ListItem
              marginVertical={"s"}
              onPress={() =>
                navigation.navigate(ClimbsNavigationRoutes.Wall, {
                  wallId: item.id,
                  wallName: item.name,
                  sectorId,
                  zoneId,
                  sectorKind: data?.sectorKind,
                })
              }
            >
              <Text variant="p1R">{item.name}</Text>
            </ListItem>
          )}
        />
      </Box>
    </Screen>
  );
};

export default SectorScreen;
