import {
  ActivityIndicator,
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
import { FC, useState } from "react";
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
        ListHeaderComponent={() => (
          <Box>
            <Text variant="h1">{multiPitchName}</Text>
            <Box
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
                      lastPitchKind: data?.Pitches.slice(-1)[0].Route.kind,
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
                      lastPitchKind: data?.Pitches.slice(-1)[0].Route.kind,
                    })
                  }
                >
                  <Text color="textContrast">Transición</Text>
                </Pressable>
              </Box>
            </Box>
          </Box>
        )}
        renderItem={({ item }) => {
          return (
            <MultiPitchRouteItem
              keepOpen={keepOpen}
              setKeepOpen={setKeepOpen}
              routeGrade={item.Route.RouteGrade}
              routeKind={item.Route.kind}
              pitchNumber={Number(item.number)}
              routeId={item.Route.id}
            />
          );
        }}
      />
    </Screen>
  );
};

export default MultiPitchManagerScreen;
