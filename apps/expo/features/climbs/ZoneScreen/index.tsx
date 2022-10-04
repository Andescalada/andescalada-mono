import zone from "@andescalada/api/schemas/zone";
import { InfoAccessSchema } from "@andescalada/db/zod";
import {
  ActivityIndicator,
  Box,
  Button,
  EditableTitle,
  ListItem,
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
import useOptionsSheet from "@hooks/useOptionsSheet";
import useRefresh from "@hooks/useRefresh";
import useZodForm from "@hooks/useZodForm";
import { FC } from "react";
import { Alert, FlatList } from "react-native";

const { schema } = zone;

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Zone>;

const ZoneScreen: FC<Props> = ({ route, navigation }) => {
  const { data, refetch, isFetching, isLoading, error } =
    trpc.zones.allSectors.useQuery({ zoneId: route.params.zoneId });

  const refresh = useRefresh(refetch, isFetching && !isLoading);

  const editZone = trpc.zones.edit.useMutation();
  const methods = useZodForm({ schema });

  const onSubmit = methods.handleSubmit(
    (input) => {
      if (methods.formState.isDirty)
        editZone.mutate({
          name: input.name,
          zoneId: route.params.zoneId,
        });
      hProps.setEditing(false);
    },
    (error) => {
      const errorMessage = error.name?.message || "Hubo un error";
      Alert.alert(errorMessage);
      methods.setValue("name", route.params.zoneName);
      hProps.setEditing(false);
    },
  );

  const hProps = useHeaderOptionButton({ onSave: onSubmit });

  const onOptions = useOptionsSheet({
    "Agregar Sector": {
      action: () =>
        navigation.navigate(ClimbsNavigationRoutes.AddSector, {
          zoneId: route.params.zoneId,
        }),
    },
    "Cambiar Nombre": () => {
      hProps.setEditing(true);
    },
  });

  return (
    <Screen padding="m">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        height={40}
      >
        <EditableTitle
          title={route.params.zoneName}
          name="name"
          editable={hProps.editing}
          control={methods.control}
          textAlignVertical="center"
        />
        <HeaderOptionsButton {...hProps} onOptions={onOptions} />
      </Box>
      <Box flex={1}>
        <FlatList
          data={data?.sectors}
          refreshControl={refresh}
          contentContainerStyle={{ flex: 1 }}
          ListEmptyComponent={() => (
            <NoSectors
              isLoading={isLoading}
              hasAccess={!!data?.hasAccess}
              infoAccess={data?.infoAccess}
            />
          )}
          renderItem={({ item }) => (
            <ListItem
              marginVertical={"s"}
              onPress={() =>
                navigation.navigate(ClimbsNavigationRoutes.Sector, {
                  sectorId: item.id,
                  sectorName: item.name,
                  zoneId: route.params.zoneId,
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

interface NoZonesProps {
  isLoading: boolean;
  hasAccess: boolean;
  infoAccess: keyof typeof InfoAccessSchema.Enum | undefined;
}

const NoSectors = ({ isLoading, hasAccess, infoAccess }: NoZonesProps) => {
  const title =
    infoAccess === InfoAccessSchema.Enum.Private
      ? "Acceso Privado"
      : "Acceso Comunitario";
  const description =
    infoAccess === InfoAccessSchema.Enum.Private
      ? "Solo los y las administradoras de la zona pueden darte acceso."
      : "Cualquier persona que ya tenga acceso a estos topos puede entregarte acceso.";
  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size={"large"} />
      </Screen>
    );

  if (!hasAccess)
    return (
      <Box flex={1} justifyContent={"flex-start"}>
        <Box flex={1 / 3} justifyContent="center">
          <Text variant="h2" marginBottom="l">
            {title}
          </Text>
          <Text variant="p1R" marginBottom="m">
            No tienes permiso para ver esta zona
          </Text>
          <Text marginBottom="s">{description}</Text>
        </Box>
        <Button variant="info" title="Solicitar acceso" alignSelf="center" />
      </Box>
    );

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text variant={"h3"}>Sin sectores</Text>
    </Box>
  );
};

export default ZoneScreen;
