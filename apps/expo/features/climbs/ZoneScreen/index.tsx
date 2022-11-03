import zone from "@andescalada/api/schemas/zone";
import { InfoAccessSchema } from "@andescalada/db/zod";
import {
  A,
  ActivityIndicator,
  Box,
  Button,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "@features/climbs/components/Header";
import useHeaderOptionButton from "@features/climbs/components/HeaderOptionsButton/useHeaderOptions";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import useDownloadedButton from "@features/climbs/ZoneScreen/useDownloadedButton";
import ZoneItem from "@features/climbs/ZoneScreen/ZoneItem";
import { useAppTheme } from "@hooks/useAppTheme";
import useOptionsSheet from "@hooks/useOptionsSheet";
import useRefresh from "@hooks/useRefresh";
import useZodForm from "@hooks/useZodForm";
import featureFlags from "@utils/featureFlags";
import { FC, useState } from "react";
import { FormProvider } from "react-hook-form";
import { Alert, FlatList } from "react-native";
import {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { schema } = zone;

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Zone>;

const ZoneScreen: FC<Props> = ({ route, navigation }) => {
  const { zoneId } = route.params;

  const { data, refetch, isFetching, isLoading, isError, isPaused } =
    trpc.zones.allSectors.useQuery({ zoneId });

  const refresh = useRefresh(refetch, isFetching && !isLoading);

  const editZone = trpc.zones.edit.useMutation();
  const methods = useZodForm({ schema });

  const onSubmit = methods.handleSubmit(
    (input) => {
      if (methods.formState.isDirty)
        editZone.mutate({
          name: input.name,
          zoneId,
        });
      headerMethods.setEditing(false);
    },
    (error) => {
      const errorMessage = error.name?.message || "Hubo un error";
      Alert.alert(errorMessage);
      methods.setValue("name", route.params.zoneName);
      headerMethods.setEditing(false);
    },
  );

  const headerMethods = useHeaderOptionButton({ onSave: onSubmit });

  const onOptions = useOptionsSheet({
    "Agregar Sector": {
      action: () =>
        navigation.navigate(ClimbsNavigationRoutes.AddSector, {
          zoneId,
        }),
    },
    "Cambiar Nombre": () => {
      headerMethods.setEditing(true);
    },
  });

  const theme = useAppTheme();

  const { isDownloaded, onDownloadPress } = useDownloadedButton(zoneId);

  const [openAll, setOpenAll] = useState(true);
  const open = useSharedValue(0);

  const degs = useDerivedValue(() => withTiming(open.value));

  const toggleButtonStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${degs.value}deg` }],
  }));

  if (isPaused)
    return (
      <Screen padding="m" justifyContent="center" alignItems="center">
        <Text>Sin conexión a internet</Text>
      </Screen>
    );

  return (
    <Screen padding="m">
      <FormProvider {...methods}>
        <Header
          title={route.params.zoneName}
          editingTitle={headerMethods.editing}
          headerOptionsProps={{ ...headerMethods, onOptions: onOptions }}
        />
      </FormProvider>
      {featureFlags.offline && (
        <Box flexDirection="row" justifyContent="flex-end">
          <Pressable
            flexDirection="row"
            alignItems="center"
            onPress={onDownloadPress}
          >
            <Ionicons
              name={
                isDownloaded ? "arrow-down-circle" : "arrow-down-circle-outline"
              }
              size={30}
              color={theme.colors["zoneOptionsIcons"]}
            />
          </Pressable>
          <A.Pressable
            onPress={() => {
              setOpenAll((prev) => !prev);
              open.value = open.value === 0 ? -180 : 0;
            }}
            style={toggleButtonStyle}
          >
            <Ionicons
              name={openAll ? "caret-down-circle" : "caret-down-circle-outline"}
              size={30}
              color={theme.colors["zoneOptionsIcons"]}
            />
          </A.Pressable>
        </Box>
      )}
      <Box flex={1}>
        <FlatList
          data={data?.sectors}
          refreshControl={refresh}
          contentContainerStyle={{ flex: 1 }}
          ListEmptyComponent={() => (
            <NoSectors
              isLoading={isLoading}
              isError={isError}
              hasAccess={!!data?.hasAccess}
              infoAccess={data?.infoAccess}
            />
          )}
          renderItem={({ item }) => (
            <ZoneItem item={item} defaultOpen={openAll} />
          )}
        />
      </Box>
    </Screen>
  );
};

interface NoZonesProps {
  isLoading: boolean;
  isError: boolean;
  hasAccess: boolean;
  infoAccess: keyof typeof InfoAccessSchema.Enum | undefined;
}

const NoSectors = ({
  isLoading,
  hasAccess,
  infoAccess,
  isError,
}: NoZonesProps) => {
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

  if (!hasAccess && !isError)
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
