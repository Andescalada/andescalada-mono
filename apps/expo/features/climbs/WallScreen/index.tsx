import wall from "@andescalada/api/schemas/wall";
import { SoftDeleteSchema } from "@andescalada/db/zod";
import useZodForm from "@andescalada/hooks/useZodForm";
import { Box, LoadingModal, Pressable, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import Header from "@features/climbs/components/Header";
import useHeaderOptionButton from "@features/climbs/components/HeaderOptionsButton/useHeaderOptions";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import RoutesList from "@features/climbs/WallScreen/RoutesList";
import TopoImage from "@features/climbs/WallScreen/TopoImage";
import { MultiPitchManagerRoutes } from "@features/multiPitchManager/Navigation/types";
import useOptionsSheet from "@hooks/useOptionsSheet";
import usePermissions from "@hooks/usePermissions";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { sectorKindAssets } from "@utils/sectorKindAssets";
import { FC } from "react";
import { FormProvider } from "react-hook-form";
import { Alert } from "react-native";

const { schema } = wall;

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Wall>;

const WallScreen: FC<Props> = ({ route, navigation }) => {
  const { wallId, zoneId, sectorId, wallName, sectorKind } = route.params;

  const otherToposQuery = trpc.topos.otherToposCount.useQuery({
    wallId,
    zoneId,
  });

  const otherToposCount = otherToposQuery.data ?? 0;

  const utils = trpc.useContext();

  const editWall = trpc.walls.edit.useMutation();

  const deleteTopo = trpc.topos.delete.useMutation({
    onSuccess: () => {
      utils.walls.invalidate();
      utils.topos.invalidate();
    },
  });

  const mainTopoId = trpc.walls.mainTopo.useQuery({ wallId, zoneId });

  const methods = useZodForm({ schema });

  const { permission } = usePermissions({ zoneId });

  const onSubmit = methods.handleSubmit(
    (input) => {
      if (input.name !== wallName)
        editWall.mutate(
          {
            name: input.name,
            wallId: route.params.wallId,
            zoneId,
          },
          {
            onSuccess: () => {
              utils.zones.allSectors.invalidate({ zoneId });
              utils.sectors.allWalls.invalidate({ sectorId });
            },
          },
        );
      headerMethods.setEditing(false);
    },
    (error) => {
      const errorMessage = error.name?.message || "Hubo un error";
      Alert.alert(errorMessage);
      methods.setValue("name", route.params.wallName);
      headerMethods.setEditing(false);
    },
  );

  const headerMethods = useHeaderOptionButton({ onSave: onSubmit });

  const deleteWall = trpc.walls.delete.useMutation({
    onMutate: () => {
      navigation.goBack();
    },
    onSuccess: () => {
      Alert.alert(sectorKindAssets[sectorKind].deletedMessage(wallName));
      utils.sectors.allWalls.invalidate({ sectorId });
    },
    onError: () => {
      Alert.alert(sectorKindAssets[sectorKind].onDeleteError);
    },
  });

  const rootNavigation = useRootNavigation();

  const onOptions = useOptionsSheet(
    {
      ["Agregar ruta"]: {
        hide: !permission?.has("Create"),
        action: () =>
          navigation.navigate(ClimbsNavigationRoutes.AddRoute, {
            wallId,
            zoneId,
          }),
      },
      ["Agregar multi largo"]: {
        hide: !permission?.has("Create"),
        action: () =>
          rootNavigation.navigate(RootNavigationRoutes.MultiPitchManager, {
            screen: MultiPitchManagerRoutes.AddMultiPitch,
            initial: true,
            params: {
              wallId,
              zoneId,
            },
          }),
      },
      "Editar posiciones": {
        hide: !permission?.has("Update"),
        action: () => {
          navigation.navigate(ClimbsNavigationRoutes.EditRoutePosition, {
            wallId,
            zoneId,
            sectorId,
            sectorKind,
            wallName,
          });
        },
      },
      "Cambiar nombre": {
        hide: !permission?.has("Update"),
        action: () => {
          headerMethods.setEditing(true);
        },
      },
      [sectorKindAssets[sectorKind].delete]: {
        hide: !permission?.has("Delete"),
        action: () => {
          Alert.alert(
            sectorKindAssets[sectorKind].delete,
            sectorKindAssets[sectorKind].confirmDelete,
            [
              {
                text: "Eliminar",
                onPress: () => {
                  deleteWall.mutate({
                    isDeleted: SoftDeleteSchema.Enum.DeletedPublic,
                    wallId,
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
      "Eliminar topo": {
        hide: !permission?.has("Delete") || !mainTopoId?.data,
        action: () => {
          Alert.alert("Eliminar topo", "¿Estás seguro de eliminar el topo?", [
            {
              text: "Eliminar",
              onPress: () => {
                if (!mainTopoId?.data) return;
                deleteTopo.mutate({ topoId: mainTopoId.data, zoneId });
              },
              style: "destructive",
            },
            { text: "Cancelar", style: "cancel" },
          ]);
        },
      },
    },
    { destructiveButtonIndex: !!mainTopoId?.data ? [4, 5] : 4 },
  );

  return (
    <Screen>
      <LoadingModal isLoading={deleteTopo.isLoading} text="Borrando topo" />
      <FormProvider {...methods}>
        <Header
          title={wallName}
          editingTitle={headerMethods.editing}
          headerOptionsProps={{ ...headerMethods, onOptions: onOptions }}
          padding="s"
        />
      </FormProvider>
      <TopoImage />
      {otherToposCount > 0 && (
        <Box paddingHorizontal="m" marginTop="m">
          <Pressable
            bg="grayscale.900"
            borderRadius={8}
            padding="s"
            alignItems="center"
            justifyContent="center"
            gap="s"
            flexDirection="row"
          >
            <Box bg="semantic.info" borderRadius={8} paddingHorizontal="s">
              <Text variant="p3R">{otherToposCount}</Text>
            </Box>
            <Text variant="p2R">{`Ver otros topos`}</Text>
          </Pressable>
        </Box>
      )}
      <RoutesList />
    </Screen>
  );
};

export default WallScreen;
