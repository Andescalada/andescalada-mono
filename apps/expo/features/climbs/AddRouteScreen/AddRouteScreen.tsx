import route from "@andescalada/api/schemas/route";
import { UpsertAction } from "@andescalada/api/src/types/upsertRoute";
import { routeKindLabel } from "@andescalada/common-assets/routeKind";
import { RouteKindSchema } from "@andescalada/db/zod";
import useZodForm from "@andescalada/hooks/useZodForm";
import {
  A,
  AddOrCancelButtons,
  Box,
  ButtonGroup,
  Ionicons,
  Screen,
  ScrollView,
  Text,
  TextButton,
  TextInput,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import GradePicker from "@features/climbs/components/GradePicker";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useGradeSystem from "@hooks/useGradeSystem";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { FC, useMemo, useState } from "react";
import { useController, useWatch } from "react-hook-form";
import { Alert, Keyboard } from "react-native";
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
  const { wallId, id, zoneId, extendedRouteId, variantRouteId, ...rest } =
    route.params;

  const utils = trpc.useContext();

  const rootNavigation = useRootNavigation();

  const isExtension = useMemo(() => !!extendedRouteId, [extendedRouteId]);

  const isVariant = useMemo(() => !!variantRouteId, [variantRouteId]);

  const inputLabel = useMemo(() => {
    if (isExtension) return "Nombre de la extensión";
    if (isVariant) return "Nombre de la variante";
    return "Nombre de la ruta";
  }, [isExtension, isVariant]);

  const title = useMemo(() => {
    if (isExtension) return "Añadir extensión";
    if (isVariant) return "Añadir variante";
    if (id) return "Editar ruta";
    return "Añadir ruta";
  }, [isExtension, isVariant, id]);

  const { mutate, isLoading } = trpc.routes.upsert.useMutation({
    onSuccess: ({ id, position, mainTopoId, action, Wall }) => {
      if (!mainTopoId) {
        navigation.goBack();
        return;
      }
      switch (action) {
        case UpsertAction.RouteAdded: {
          rootNavigation.pop();
          rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
            screen: RoutesManagerNavigationRoutes.RouteDrawer,
            params: {
              route: { id, position },
              wallId,
              topoId: mainTopoId,
              zoneId,
            },
          });
          break;
        }
        case UpsertAction.RouteEdited: {
          navigation.navigate(ClimbsNavigationRoutes.Wall, {
            zoneId,
            wallId,
            sectorId: Wall.Sector.id,
            sectorKind: Wall.Sector.sectorKind,
            wallName: Wall.name,
          });
          break;
        }
        case UpsertAction.VariantAdded: {
          rootNavigation.pop();
          rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
            screen: RoutesManagerNavigationRoutes.RouteVariantDrawer,
            params: {
              route: { id, position, variantRouteId: variantRouteId! },
              wallId,
              topoId: mainTopoId,
              zoneId,
            },
          });
          break;
        }
        case UpsertAction.ExtensionAdded: {
          rootNavigation.pop();
          rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
            screen: RoutesManagerNavigationRoutes.RouteExtensionDrawer,
            params: {
              route: { id, position, extendedRouteId: extendedRouteId! },
              wallId,
              topoId: mainTopoId,
              zoneId,
            },
          });
          break;
        }
        default:
          navigation.goBack();
          break;
      }
      utils.walls.byId.invalidate({ wallId, zoneId });
      utils.topos.byId.invalidate({ topoId: mainTopoId, zoneId });
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
    field: { onChange: onGradeChange, value: gradeValue },
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
      originalGrade:
        typeof grade.grade === "number"
          ? gradeSystem(grade.grade, kindWatch)
          : "",
    };

    if (!!extendedRouteId) {
      mutate({
        extendedRouteId,
        wallId,
        ...data,
      });
      return;
    }
    if (!!variantRouteId) {
      mutate({
        variantRouteId,
        wallId,
        ...data,
      });
      return;
    }
    if (!!id) {
      mutate({
        routeId: id,
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

  const { gradeSystem, getSystem } = useGradeSystem(kindValue);

  const onUnknownNamePress = () => {
    onChange("Ruta sin nombre");
    unknownNameOnChange(true);
  };

  const [showNoName, setShowNoName] = useState(true);

  return (
    <Screen>
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
                margin="s"
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
            <GradePicker
              onChange={onGradeChange}
              value={gradeValue}
              routeKind={kindWatch}
            />
          </Box>
        )}
        <AddOrCancelButtons
          onAdd={onSubmit}
          onCancel={onCancel}
          isLoading={isLoading}
          addLabel={rest.name ? "Editar" : "Agregar"}
        />
      </ScrollView>
    </Screen>
  );
};

export default AddRouteScreen;
