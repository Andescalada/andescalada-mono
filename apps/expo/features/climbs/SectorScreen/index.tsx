import sector from "@andescalada/api/schemas/sector";
import { SoftDeleteSchema } from "@andescalada/db/zod";
import {
  ActivityIndicator,
  Box,
  ListItem,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import Header from "@features/climbs/components/Header";
import useHeaderOptionButton from "@features/climbs/components/HeaderOptionsButton/useHeaderOptions";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import useOptionsSheet from "@hooks/useOptionsSheet";
import useRefresh from "@hooks/useRefresh";
import useZodForm from "@hooks/useZodForm";
import { FC } from "react";
import { FormProvider } from "react-hook-form";
import { Alert, FlatList } from "react-native";

const { schema } = sector;

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Sector>;

const SectorScreen: FC<Props> = ({ route, navigation }) => {
  const utils = trpc.useContext();

  const { sectorId, zoneId } = route.params;

  const { data, refetch, isFetching, isLoading } =
    trpc.sectors.allWalls.useQuery({ sectorId });

  const editSector = trpc.sectors.edit.useMutation({
    onSuccess: () => {
      utils.zones.allSectors.invalidate({ zoneId });
    },
  });

  const deleteSector = trpc.sectors.delete.useMutation({
    onMutate: () => {
      navigation.goBack();
    },
    onSuccess: () => {
      Alert.alert(`Sector ${route.params.sectorName} eliminado`);
      utils.zones.allSectors.invalidate({ zoneId });
    },
    onError: () => {
      Alert.alert("No pudimos eliminar el sector, intenta más tarde");
    },
  });

  const methods = useZodForm({
    schema,
  });

  const refresh = useRefresh(refetch, isFetching);

  const onSubmit = methods.handleSubmit(
    (input) => {
      if (input.name !== route.params.sectorName)
        editSector.mutate(
          {
            name: input.name,
            sectorId,
            zoneId,
          },
          {
            onSuccess: () => {
              utils.zones.allSectors.invalidate({ zoneId });
            },
          },
        );
      headerMethods.setEditing(false);
    },
    (error) => {
      const errorMessage = error.name?.message || "Hubo un error";
      Alert.alert(errorMessage);
      methods.setValue("name", route.params.sectorName);
      headerMethods.setEditing(false);
    },
  );

  const headerMethods = useHeaderOptionButton({ onSave: onSubmit });

  const onOptions = useOptionsSheet(
    {
      "Agregar Pared": () =>
        data
          ? navigation.navigate(ClimbsNavigationRoutes.AddWall, {
              sectorId,
              zoneId,
              sectorKind: data?.sectorKind,
            })
          : null,
      "Cambiar Nombre": () => {
        headerMethods.setEditing(true);
      },
      "Eliminar Sector": () => {
        Alert.alert(
          "Eliminar sector",
          "¿Seguro que quieres eliminar este sector?",
          [
            {
              text: "Eliminar",
              onPress: () => {
                deleteSector.mutate({
                  isDeleted: SoftDeleteSchema.Enum.DeletedPublic,
                  sectorId,
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
    { destructiveButtonIndex: 2 },
  );

  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Screen>
    );
  return (
    <Screen padding="m">
      <FormProvider {...methods}>
        <Header
          title={route.params.sectorName}
          editingTitle={headerMethods.editing}
          headerOptionsProps={{ ...headerMethods, onOptions: onOptions }}
        />
      </FormProvider>
      <Box flex={1}>
        <FlatList
          data={data?.walls}
          refreshControl={refresh}
          ListEmptyComponent={() => (
            <Box
              flex={1}
              justifyContent="center"
              alignItems="center"
              marginTop="xxxl"
            >
              <Text variant="h3">Sin paredes</Text>
            </Box>
          )}
          renderItem={({ item }) => (
            <ListItem
              marginVertical={"s"}
              onPress={() =>
                navigation.navigate(ClimbsNavigationRoutes.Wall, {
                  wallId: item.id,
                  wallName: item.name,
                  sectorId,
                  zoneId,
                })
              }
            >
              <Text variant="p1R">{item.name}</Text>
            </ListItem>
          )}
        />
      </Box>
    </Screen>
  );
};

export default SectorScreen;
