import sector from "@andescalada/api/schemas/sector";
import {
  ActivityIndicator,
  Box,
  EditableTitle,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import HeaderOptionsButton from "@features/climbs/components/HeaderOptionsButton";
import useHeaderOptionButton from "@features/climbs/components/HeaderOptionsButton/useHeaderOptions";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { zodResolver } from "@hookform/resolvers/zod";
import useOptionsSheet from "@hooks/useOptionsSheet";
import useRefresh from "@hooks/useRefresh";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Alert, FlatList } from "react-native";
import { z } from "zod";

const { schema } = sector;

type Form = z.infer<typeof schema>;

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Sector>;

const SectorScreen: FC<Props> = ({ route, navigation }) => {
  const utils = trpc.useContext();

  const { data, refetch, isFetching, isLoading } =
    trpc.sectors.allWalls.useQuery({ sectorId: route.params.sectorId });

  const editSector = trpc.sectors.edit.useMutation({
    onSuccess: () => {
      utils.zones.allSectors.invalidate({ zoneId: route.params.zoneId });
    },
  });

  const methods = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const refresh = useRefresh(refetch, isFetching);

  const onSubmit = methods.handleSubmit(
    (input) => {
      editSector.mutate({
        name: input.name,
        sectorId: route.params.sectorId,
      });
      setEditing(false);
    },
    (error) => {
      const errorMessage = error.name?.message || "Hubo un error";
      Alert.alert(errorMessage);
      methods.setValue("name", route.params.sectorName);
      setEditing(false);
    },
  );

  const { onSave, cancel, editing, setCancel, setEditing } =
    useHeaderOptionButton({ onSave: onSubmit });

  const onOptions = useOptionsSheet({
    "Agregar Pared": () =>
      navigation.navigate(ClimbsNavigationRoutes.AddWall, {
        sectorId: route.params.sectorId,
      }),
    "Cambiar Nombre": () => {
      setEditing(true);
    },
  });

  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Screen>
    );
  return (
    <Screen padding="m">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <EditableTitle
          title={route.params.sectorName}
          name="name"
          editable={editing}
          control={methods.control}
        />

        <HeaderOptionsButton
          cancel={cancel}
          setCancel={setCancel}
          editing={editing}
          onOptions={onOptions}
          onSave={onSave}
        />
      </Box>
      <Box flex={1}>
        <FlatList
          data={data}
          refreshControl={refresh}
          contentContainerStyle={{ flex: 1 }}
          ListEmptyComponent={() => (
            <Box flex={1} justifyContent="center" alignItems="center">
              <Text variant="h3">Sin paredes</Text>
            </Box>
          )}
          renderItem={({ item }) => (
            <Pressable
              backgroundColor="listItemBackground"
              alignItems="stretch"
              padding="m"
              marginVertical="s"
              onPress={() =>
                navigation.navigate(ClimbsNavigationRoutes.Wall, {
                  wallId: item.id,
                  wallName: item.name,
                  sectorId: route.params.sectorId,
                })
              }
            >
              <Text variant="p1R">{item.name}</Text>
            </Pressable>
          )}
        />
      </Box>
    </Screen>
  );
};

export default SectorScreen;
