import {
  ActivityIndicator,
  AddButton,
  Box,
  Header,
  LoadingModal,
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
import useOptionsSheet from "@hooks/useOptionsSheet";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import { useNotifications } from "@utils/notificated";
import { FC, useCallback, useState } from "react";
import { Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";

type Props =
  MultiPitchManagerScreenProps<MultiPitchManagerRoutes.MultiPitchManager>;

const MultiPitchManagerScreen: FC<Props> = ({
  navigation,
  route: {
    params: { multiPitchName, multiPitchId, zoneId, topoId, wallId },
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

  const { permission } = usePermissions({ zoneId });

  const utils = trpc.useContext();
  const notification = useNotifications();
  const deleteMultiPitch = trpc.multiPitch.deleteById.useMutation({
    onSuccess: () => {
      utils.walls.invalidate();
      utils.topos.invalidate();
      notification.notify("success", {
        params: { title: "Multi largo eliminado", hideCloseButton: true },
        config: { duration: 500 },
      });
      navigation.goBack();
    },
  });

  const onOptions = useOptionsSheet(
    {
      "Cambiar nombre": {
        action: () =>
          navigation.navigate(MultiPitchManagerRoutes.AddMultiPitch, {
            wallId,
            zoneId,
            multiPitchId,
            multiPitchName: data?.name,
            unknownName: data?.unknownName,
          }),
        hide: !permission?.has("Update"),
      },
      "Eliminar multi largo": {
        action: () => {
          Alert.alert("Eliminar multi largo", "¿Estás seguro?", [
            {
              text: "Cancelar",
              style: "cancel",
            },
            {
              text: "Eliminar",
              style: "destructive",
              onPress: () => deleteMultiPitch.mutate({ multiPitchId, zoneId }),
            },
          ]);
        },
        hide: !permission?.has("Delete"),
      },
    },
    { destructiveButtonIndex: 1 },
  );

  if (isLoading)
    return (
      <Screen padding="m">
        <Header
          title={multiPitchName}
          onGoBack={navigation.goBack}
          showOptions={false}
        />
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </Box>
      </Screen>
    );
  return (
    <Screen padding="m">
      <LoadingModal
        isLoading={deleteMultiPitch.isLoading}
        text="Borrando multi largo"
      />
      <Header
        title={multiPitchName}
        onGoBack={navigation.goBack}
        showOptions={permission.has("Update")}
        onOptions={onOptions}
        marginBottom="m"
      />
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
