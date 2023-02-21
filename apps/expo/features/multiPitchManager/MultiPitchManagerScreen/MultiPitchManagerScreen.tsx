import {
  ActivityIndicator,
  Box,
  Pressable,
  Screen,
  Text,
  TextButton,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import MultiPitchRouteItem from "@features/multiPitchManager/MultiPitchManagerScreen/MultiPitchItem";
import {
  MultiPitchManagerRoutes,
  MultiPitchManagerScreenProps,
} from "@features/multiPitchManager/Navigation/types";
import useRefresh from "@hooks/useRefresh";
import { FC, useState } from "react";
import { FlatList } from "react-native-gesture-handler";

type Props =
  MultiPitchManagerScreenProps<MultiPitchManagerRoutes.MultiPitchManager>;

const MultiPitchManagerScreen: FC<Props> = ({
  navigation,
  route: {
    params: { multiPitchName, multiPitchId, zoneId, topoId },
  },
}) => {
  const { data, isLoading, refetch, isRefetching } =
    trpc.multiPitch.byId.useQuery({
      multiPitchId,
      zoneId,
    });

  const refresh = useRefresh(refetch, isRefetching);

  const [keepOpen, setKeepOpen] = useState<string | undefined>();

  if (isLoading)
    return (
      <Screen safeAreaDisabled padding="m">
        <Text variant="h1">{multiPitchName}</Text>
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </Box>
      </Screen>
    );
  return (
    <Screen safeAreaDisabled padding="m">
      <FlatList
        data={data?.Pitches}
        keyExtractor={(item) => item.id}
        refreshControl={refresh}
        ListEmptyComponent={
          <Box
            flex={1}
            justifyContent="center"
            alignItems="center"
            paddingTop="xxl"
          >
            <Text variant="p2R">No hay largos</Text>
            <TextButton
              variant="info"
              onPress={() =>
                navigation.navigate(MultiPitchManagerRoutes.AddPitch, {
                  multiPitchId,
                  zoneId,
                  previousPitchKind: data?.Pitches.slice(-1)[0]?.Route.kind,
                  previousPitchId: data?.Pitches.slice(-1)[0]?.id,
                  topoId,
                })
              }
            >
              Agregar largo
            </TextButton>
          </Box>
        }
        ListHeaderComponent={() => (
          <Box>
            <Text variant="h1">{multiPitchName}</Text>
            <Box
              visible={!!topoId}
              flexDirection="row"
              paddingBottom="m"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text variant="h4">Agregar:</Text>
              <Box flexDirection="row">
                <Pressable
                  backgroundColor="semantic.info"
                  borderRadius={20}
                  padding="s"
                  onPress={() =>
                    navigation.navigate(MultiPitchManagerRoutes.AddPitch, {
                      multiPitchId,
                      zoneId,
                      previousPitchKind: data?.Pitches.slice(-1)[0]?.Route.kind,
                      previousPitchId: data?.Pitches.slice(-1)[0]?.id,
                      topoId,
                    })
                  }
                >
                  <Text>Largo</Text>
                </Pressable>
                <Pressable
                  backgroundColor="semantic.warning"
                  borderRadius={25}
                  padding="s"
                  marginLeft="s"
                  onPress={() =>
                    navigation.navigate(MultiPitchManagerRoutes.AddPitch, {
                      multiPitchId,
                      zoneId,
                      previousPitchKind: data?.Pitches.slice(-1)[0].Route.kind,
                      previousPitchId: data?.Pitches.slice(-1)[0].id,
                    })
                  }
                >
                  <Text color="textContrast">Transición</Text>
                </Pressable>
              </Box>
            </Box>
          </Box>
        )}
        renderItem={({ item, index }) => {
          const previousPitchId =
            index > 0 ? data?.Pitches[index - 1].id : undefined;
          return (
            <MultiPitchRouteItem
              keepOpen={keepOpen}
              setKeepOpen={setKeepOpen}
              routeGrade={item.Route.RouteGrade}
              routeKind={item.Route.kind}
              pitchNumber={Number(item.number)}
              routeId={item.Route.id}
              pitchId={item.id}
              previousPitchId={previousPitchId}
              wallId={data?.wallId || ""}
              topoId={topoId}
              position={data?.position || 0}
            />
          );
        }}
      />
    </Screen>
  );
};

export default MultiPitchManagerScreen;
