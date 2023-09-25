import { Box, Header, Screen, Text, TextButton } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import SectorsGateway from "@features/climbs/ZoneScreen/SectorsGateway";
import ZoneHeader from "@features/climbs/ZoneScreen/ZoneHeader";
import ZoneItem from "@features/climbs/ZoneScreen/ZoneItem";
import useZonesAllSectors from "@hooks/offlineQueries/useZonesAllSectors";
import useOfflineMode from "@hooks/useOfflineMode";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import { useFocusEffect } from "@react-navigation/native";
import constants from "@utils/constants";
import { FC, useCallback } from "react";
import { FlatList } from "react-native";

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

  if (isPaused && !isOfflineMode)
    return (
      <Screen padding="m" justifyContent="center" alignItems="center">
        <Text>Sin conexión a internet</Text>
      </Screen>
    );

  return (
    <Screen>
      <Header
        padding="m"
        title={data?.name ?? route.params.zoneName}
        onOptions={() => {
          navigation.navigate(ClimbsNavigationRoutes.AdminZoneOptions, {
            zoneId,
            zoneName,
          });
        }}
        showOptions={permission?.has("Create")}
        onGoBack={() => {
          navigation.reset({
            routes: [{ name: ClimbsNavigationRoutes.Home }],
          });
        }}
      />
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
            renderItem={({ item }) => (
              <Box paddingHorizontal="m">
                <ZoneItem item={item} />
              </Box>
            )}
          />
        </SectorsGateway>
      </Box>
    </Screen>
  );
};

export default ZoneScreen;
