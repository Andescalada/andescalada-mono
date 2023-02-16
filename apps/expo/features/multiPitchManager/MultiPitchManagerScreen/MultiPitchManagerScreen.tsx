import {
  ActivityIndicator,
  AddButton,
  Box,
  ListItem,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import { routeKindLabel } from "@andescalada/utils/routeKind";
import { trpc } from "@andescalada/utils/trpc";
import {
  MultiPitchManagerRoutes,
  MultiPitchManagerScreenProps,
} from "@features/multiPitchManager/Navigation/types";
import useGradeSystem from "@hooks/useGradeSystem";
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
  const { gradeLabel } = useGradeSystem();
  const { data, isLoading } = trpc.multiPitch.byId.useQuery({
    multiPitchId,
    zoneId,
  });

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
            <ListItem
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Text
                  variant="p2R"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >{`Largo ${item.number}`}</Text>
                <Text variant="caption" color="grayscale.400">
                  {routeKindLabel(item.Route.kind).long}
                </Text>
              </Box>
              <Box alignItems="center" justifyContent="center">
                <Text variant="p2R">
                  {gradeLabel(item.Route.RouteGrade, item.Route.kind)}
                </Text>
              </Box>
            </ListItem>
          );
        }}
      />
    </Screen>
  );
};

export default MultiPitchManagerScreen;
