import wall from "@andescalada/api/schemas/wall";
import { SoftDeleteSchema } from "@andescalada/db/zod";
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
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useOptionsSheet from "@hooks/useOptionsSheet";
import useRootNavigation from "@hooks/useRootNavigation";
import useZodForm from "@hooks/useZodForm";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { FC } from "react";
import { FormProvider } from "react-hook-form";
import { Alert } from "react-native";

const { schema } = wall;

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Wall>;

const WallScreen: FC<Props> = ({ route, navigation }) => {
  const { wallId, zoneId, sectorId } = route.params;

  const { data } = trpc.walls.byId.useQuery(route.params.wallId);

  const editWall = trpc.walls.edit.useMutation();
  const methods = useZodForm({ schema });
  const onSubmit = methods.handleSubmit(
    (input) => {
      if (methods.formState.isDirty)
        editWall.mutate({
          name: input.name,
          wallId: route.params.wallId,
        });
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
  const rootNavigation = useRootNavigation();

  const utils = trpc.useContext();
  const deleteWall = trpc.walls.delete.useMutation({
    onMutate: () => {
      navigation.goBack();
    },
    onSuccess: () => {
      Alert.alert(`Pared "${route.params.wallName}" eliminada`);
      utils.sectors.allWalls.invalidate({ sectorId });
    },
    onError: () => {
      Alert.alert("No pudimos eliminar la pared, intenta más tarde");
    },
  });

  const onOptions = useOptionsSheet(
    {
      "Agregar Ruta": () =>
        navigation.navigate(ClimbsNavigationRoutes.AddRoute, {
          wallId,
          zoneId,
        }),
      "Editar Topo": {
        action: () =>
          rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
            screen: RoutesManagerNavigationRoutes.SelectRouteToDraw,
            params: {
              wallId,
            },
          }),
        hide: !data || data.topos.length === 0,
      },
      "Cambiar Nombre": () => {
        headerMethods.setEditing(true);
      },
      "Eliminar Pared": () => {
        Alert.alert(
          "Eliminar pared",
          "¿Seguro que quieres eliminar esta pared?",
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
    { destructiveButtonIndex: !data || data.topos.length === 0 ? 2 : 3 },
  );

  return (
    <Screen padding={"m"}>
      <FormProvider {...methods}>
        <Header
          title={route.params.wallName}
          editingTitle={headerMethods.editing}
          headerOptionsProps={{ ...headerMethods, onOptions: onOptions }}
        />
      </FormProvider>
      <TopoImage />
      <RoutesList />
    </Screen>
  );
};

export default WallScreen;
