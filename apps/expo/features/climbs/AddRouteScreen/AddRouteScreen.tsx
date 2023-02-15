import route from "@andescalada/api/schemas/route";
import { RouteKindSchema } from "@andescalada/db/zod";
import useZodForm from "@andescalada/hooks/useZodForm";
import {
  A,
  Box,
  Button,
  ButtonGroup,
  Ionicons,
  Screen,
  ScrollView,
  SemanticButton,
  Text,
  TextButton,
  TextInput,
} from "@andescalada/ui";
import { routeKindLabel } from "@andescalada/utils/routeKind";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import { useAppTheme } from "@hooks/useAppTheme";
import useGradeSystem from "@hooks/useGradeSystem";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { Picker } from "@react-native-picker/picker";
import { FC, useMemo, useState } from "react";
import { useController, useWatch } from "react-hook-form";
import { Alert, Keyboard, Platform } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { z } from "zod";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.AddRoute>;

const { schema: routeSchema } = route;
const schema = routeSchema
  .pick({ name: true, kind: true, unknownName: true })
  .merge(
    z.object({ grade: z.union([z.number().nullable(), z.literal("project")]) }),
  );

const AddRouteScreen: FC<Props> = ({ route, navigation }) => {
  const { wallId, extendedRouteId, zoneId, id, ...rest } = route.params;

  const utils = trpc.useContext();

  const rootNavigation = useRootNavigation();

  const isExtension = useMemo(() => !!extendedRouteId, [extendedRouteId]);

  const inputLabel = useMemo(
    () => (isExtension ? "Nombre de la extensión" : "Nombre de la ruta"),
    [isExtension],
  );

  const title = useMemo(() => {
    if (isExtension) {
      return "Añadir extensión";
    }
    if (id) {
      return "Editar ruta";
    }
    return "Añadir ruta";
  }, [isExtension, id]);

  const mainTopo = trpc.walls.mainTopo.useQuery({
    zoneId,
    wallId,
  });

  const { mutate, isLoading } = trpc.routes.add.useMutation({
    onSuccess: ({ id, position }) => {
      if (mainTopo.data) {
        if (isExtension) {
          rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
            screen: RoutesManagerNavigationRoutes.RouteExtensionDrawer,
            params: {
              route: { id, position, extendedRouteId },
              wallId,
              topoId: mainTopo.data,
              zoneId,
            },
          });
        } else {
          rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
            screen: RoutesManagerNavigationRoutes.RouteDrawer,
            params: {
              route: { id, position },
              wallId,
              topoId: mainTopo.data,
              zoneId,
            },
          });
        }
        utils.topos.byId.invalidate({ topoId: mainTopo.data, zoneId });
      } else {
        navigation.goBack();
      }
      utils.walls.byId.invalidate({ wallId, zoneId });
    },
  });

  const { mutate: mutateExtension, isLoading: isExtensionLoading } =
    trpc.routes.addExtension.useMutation({
      onSuccess: ({ id, position }) => {
        if (mainTopo.data) {
          rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
            screen: RoutesManagerNavigationRoutes.RouteExtensionDrawer,
            params: {
              route: { id, position, extendedRouteId },
              wallId,
              topoId: mainTopo.data,
              zoneId,
            },
          });
          utils.topos.byId.invalidate({ topoId: mainTopo.data, zoneId });
        } else {
          navigation.goBack();
        }
        utils.walls.byId.invalidate({ wallId, zoneId });
      },
    });

  const { mutate: mutateEdit, isLoading: isLoadingEdit } =
    trpc.routes.edit.useMutation({
      onSuccess: ({ Wall }) => {
        if (mainTopo.data) {
          utils.topos.byId.invalidate({ topoId: mainTopo.data, zoneId });
        }
        navigation.navigate(ClimbsNavigationRoutes.Wall, {
          zoneId,
          wallId,
          sectorId: Wall.Sector.id,
          sectorKind: Wall.Sector.sectorKind,
          wallName: Wall.name,
        });
        utils.walls.byId.invalidate({ wallId, zoneId });
      },
    });

  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useZodForm({
    schema,
    defaultValues: rest,
  });

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name: "name",
  });
  const {
    field: { onChange: onKindChange, value: kindValue },
    fieldState: { error: kindError },
  } = useController({
    control,
    name: "kind",
  });
  const {
    field: { onChange: unknownNameOnChange, value: unknownName },
  } = useController({
    control,
    name: "unknownName",
  });

  const nameRouteHandler = () => {
    onChange("");
    unknownNameOnChange(false);
  };

  const kindWatch = useWatch({ control, name: "kind" });

  const {
    field: { onChange: onGradeChange, value: gradeValue, onBlur: onGradeBlur },
  } = useController({
    control,
    name: "grade",
  });

  const onSubmit = handleSubmit((input) => {
    const grade = {
      grade: input.grade !== "project" ? input.grade : null,
      project: input.grade === "project",
    };

    const data = {
      name: input.name,
      kind: input.kind,
      grade,
      unknownName: input.unknownName,
      zoneId,
      originalGradeSystem: getSystem(input.kind),
    };

    if (id) {
      mutateEdit({
        routeId: id,
        ...data,
      });
      return;
    }
    if (!!extendedRouteId) {
      mutateExtension({
        extendedRouteId,
        ...data,
      });
      return;
    }
    mutate({
      wallId,
      ...data,
    });
  });

  const onCancel = () => {
    if (!isDirty) {
      navigation.goBack();
      return;
    }
    Alert.alert("¿Seguro que quieres cancelar?", "", [
      {
        text: "Si",
        onPress: () => navigation.goBack(),
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]);
  };

  const { allGrades, gradeSystem, getSystem } = useGradeSystem(kindValue);

  const theme = useAppTheme();

  const onUnknownNamePress = () => {
    onChange("Ruta sin nombre");
    unknownNameOnChange(true);
  };

  const [showNoName, setShowNoName] = useState(true);

  return (
    <Screen safeAreaDisabled={Platform.OS !== "android"}>
      <ScrollView
        padding="m"
        paddingTop="l"
        flex={1}
        marginBottom={"l"}
        onResponderGrant={Keyboard.dismiss}
      >
        <Text variant="h1">{title}</Text>
        <Box marginTop={"m"}>
          <Text variant={"p1R"} marginBottom={"s"}>
            {inputLabel}
          </Text>
          <Box flexDirection="row" flex={1}>
            <Box flex={1}>
              <TextInput
                value={value}
                onChangeText={onChange}
                editable={unknownName !== true}
                onPressIn={() => {
                  if (!unknownName) setShowNoName(false);
                }}
                onBlur={() => {
                  setShowNoName(value === undefined || value === "");
                }}
                containerProps={{ height: 50, flex: 1, paddingLeft: "s" }}
                textAlignVertical="center"
                color={!unknownName ? "textContrast" : "grayscale.600"}
              />
              {!!unknownName && value && (
                <A.Box entering={FadeIn} exiting={FadeOut}>
                  <TextButton
                    variant="info"
                    marginTop="s"
                    onPress={nameRouteHandler}
                  >
                    Nombrar ruta
                  </TextButton>
                </A.Box>
              )}
            </Box>
            {showNoName && !value && (
              <A.Pressable
                paddingHorizontal={"s"}
                onPress={onUnknownNamePress}
                height="100%"
                alignItems="center"
                justifyContent="center"
                entering={FadeIn}
                exiting={FadeOut}
              >
                <Ionicons
                  name="remove-circle"
                  size={24}
                  color={
                    unknownName
                      ? "semantic.info"
                      : "grayscale.transparent.50.500"
                  }
                />
                <Text
                  color={
                    unknownName
                      ? "semantic.info"
                      : "grayscale.transparent.50.500"
                  }
                >
                  Sin nombre
                </Text>
              </A.Pressable>
            )}
          </Box>
          <Text marginTop={"xs"} color="semantic.error">
            {error?.message}
          </Text>
        </Box>
        <Text variant={"p1R"} marginBottom={"s"}>
          Tipo de ruta
        </Text>
        <ButtonGroup value={kindValue} onChange={onKindChange}>
          <Box flexWrap="wrap" flexDirection="row">
            {RouteKindSchema.options.map((kind) => (
              <ButtonGroup.Item
                key={kind}
                value={kind}
                label={routeKindLabel(kind).long}
              />
            ))}
          </Box>
          <Text marginTop={"xs"} color="semantic.error">
            {kindError?.message}
          </Text>
        </ButtonGroup>
        {kindWatch && (
          <Box>
            <Text variant={"p1R"} marginBottom={"s"}>
              Grado
            </Text>
            <Picker
              onValueChange={onGradeChange}
              selectedValue={gradeValue}
              onBlur={onGradeBlur}
              mode="dialog"
              style={{
                backgroundColor:
                  Platform.OS === "android"
                    ? theme.colors.filledTextInputVariantBackground
                    : undefined,
              }}
            >
              {allGrades.map((n) => (
                <Picker.Item
                  color={Platform.OS === "android" ? "black" : "white"}
                  fontFamily="Rubik-400"
                  key={n}
                  label={gradeSystem(n, kindWatch)}
                  value={n}
                />
              ))}
              <Picker.Item
                color={Platform.OS === "android" ? "black" : "white"}
                fontFamily="Rubik-400"
                label={"Desconocido"}
                value={null}
              />
              <Picker.Item
                color={Platform.OS === "android" ? "black" : "white"}
                fontFamily="Rubik-400"
                label={"Proyecto"}
                value={"project"}
              />
              <Picker.Item />
            </Picker>
          </Box>
        )}
        <Button
          variant="primary"
          title={rest.name ? "Editar" : "Agregar"}
          onPress={onSubmit}
          isLoading={isLoading || isLoadingEdit || isExtensionLoading}
          marginVertical="s"
        />
        <SemanticButton
          variant="error"
          title="Cancelar"
          onPress={onCancel}
          marginBottom="l"
        />
      </ScrollView>
    </Screen>
  );
};

export default AddRouteScreen;
