import {
  ActivityIndicator,
  AddButton,
  Box,
  Header,
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
import { FC, useCallback, useState } from "react";
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

  const addPitch = useCallback(
    () =>
      navigation.navigate(MultiPitchManagerRoutes.AddPitch, {
        multiPitchId,
        zoneId,
        previousPitchKind: data?.Pitches.slice(-1)[0]?.Route.kind,
        previousPitchId: data?.Pitches.slice(-1)[0]?.id,
        topoId,
      }),
    [data?.Pitches, multiPitchId, navigation, topoId, zoneId],
  );

  if (isLoading)
    return (
      <Screen padding="m">
        <Header title={multiPitchName} onGoBack={navigation.goBack} />
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </Box>
      </Screen>
    );
  return (
    <Screen padding="m">
      <Header title={multiPitchName} onGoBack={navigation.goBack} />
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
            <TextButton variant="info" onPress={addPitch}>
              Agregar largo
            </TextButton>
          </Box>
        }
        ListHeaderComponent={() => (
          <Box>
            <Pressable
              flexDirection="row"
              paddingBottom="m"
              justifyContent="space-between"
              alignItems="center"
              onPress={addPitch}
            >
              <Text variant="h4">Agregar largo</Text>
              <AddButton onPress={addPitch} />
            </Pressable>
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
