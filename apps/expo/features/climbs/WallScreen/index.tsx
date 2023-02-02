import wall from "@andescalada/api/schemas/wall";
import { SoftDeleteSchema } from "@andescalada/db/zod";
import useZodForm from "@andescalada/hooks/useZodForm";
import { Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import Header from "@features/climbs/components/Header";
import useHeaderOptionButton from "@features/climbs/components/HeaderOptionsButton/useHeaderOptions";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import RoutesList from "@features/climbs/WallScreen/RoutesList";
import TopoImage from "@features/climbs/WallScreen/TopoImage";
import useOptionsSheet from "@hooks/useOptionsSheet";
import usePermissions from "@hooks/usePermissions";
import { sectorKindAssets } from "@utils/sectorKindAssets";
import { FC } from "react";
import { FormProvider } from "react-hook-form";
import { Alert } from "react-native";

const { schema } = wall;

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Wall>;

const WallScreen: FC<Props> = ({ route, navigation }) => {
  const { wallId, zoneId, sectorId, wallName, sectorKind } = route.params;

  const editWall = trpc.walls.edit.useMutation();
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

  const utils = trpc.useContext();
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
    },
    { destructiveButtonIndex: 2 },
  );

  return (
    <Screen>
      <FormProvider {...methods}>
        <Header
          title={wallName}
          editingTitle={headerMethods.editing}
          headerOptionsProps={{ ...headerMethods, onOptions: onOptions }}
          padding="m"
          paddingHorizontal="s"
        />
      </FormProvider>
      <TopoImage />
      <RoutesList />
    </Screen>
  );
};

export default WallScreen;
