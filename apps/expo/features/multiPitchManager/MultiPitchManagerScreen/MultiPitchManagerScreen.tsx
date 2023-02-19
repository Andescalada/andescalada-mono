import {
  ActivityIndicator,
  AddButton,
  Box,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import MultiPitchRouteItem from "@features/multiPitchManager/MultiPitchManagerScreen/MultiPitchItem";
import {
  MultiPitchManagerRoutes,
  MultiPitchManagerScreenProps,
} from "@features/multiPitchManager/Navigation/types";
import useRefresh from "@hooks/useRefresh";
import { FC } from "react";
import { FlatList } from "react-native-gesture-handler";

type Props =
  MultiPitchManagerScreenProps<MultiPitchManagerRoutes.MultiPitchManager>;

const MultiPitchManagerScreen: FC<Props> = ({
  navigation,
  route: {
    params: { multiPitchName, multiPitchId, zoneId },
  },
}) => {
  const { data, isLoading, refetch, isRefetching } =
    trpc.multiPitch.byId.useQuery({
      multiPitchId,
      zoneId,
    });

  const refresh = useRefresh(refetch, isRefetching);

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
        ListHeaderComponent={() => (
          <Box>
            <Text variant="h1">{multiPitchName}</Text>
            <Pressable
              flexDirection="row"
              paddingBottom="m"
              justifyContent="space-between"
              alignItems="center"
              onPress={() =>
                navigation.navigate(MultiPitchManagerRoutes.AddPitch, {
                  multiPitchId,
                  zoneId,
                  lastPitchKind: data?.Pitches.slice(-1)[0].Route.kind,
                })
              }
            >
              <Text variant="h4">Agregar largo</Text>
              <AddButton
                onPress={() =>
                  navigation.navigate(MultiPitchManagerRoutes.AddPitch, {
                    multiPitchId,
                    zoneId,
                    lastPitchKind: data?.Pitches.slice(-1)[0].Route.kind,
                  })
                }
              />
            </Pressable>
          </Box>
        )}
        renderItem={({ item }) => {
          return (
            <MultiPitchRouteItem
              routeGrade={item.Route.RouteGrade}
              routeKind={item.Route.kind}
              pitchNumber={Number(item.number)}
            />
          );
        }}
      />
    </Screen>
  );
};

export default MultiPitchManagerScreen;
