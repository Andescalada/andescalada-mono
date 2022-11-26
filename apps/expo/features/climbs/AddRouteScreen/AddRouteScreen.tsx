import route from "@andescalada/api/schemas/route";
import { RouteKindSchema } from "@andescalada/db/zod";
import {
  A,
  Box,
  Button,
  ButtonGroup,
  Screen,
  ScrollView,
  SemanticButton,
  Text,
  TextInput,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { Ionicons } from "@expo/vector-icons";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import { useAppTheme } from "@hooks/useAppTheme";
import useGradeSystem from "@hooks/useGradeSystem";
import useRootNavigation from "@hooks/useRootNavigation";
import useZodForm from "@hooks/useZodForm";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { Picker } from "@react-native-picker/picker";
import { FC, useState } from "react";
import { useController, useWatch } from "react-hook-form";
import { Alert, Keyboard, Platform } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { z } from "zod";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.AddRoute>;

// const schema = z.object({
//   name: z
//     .string({ required_error: "Requerido" })
//     .min(3, "Nombre muy corto")
//     .max(50, "Nombre muy largo"),
//   kind: z.nativeEnum(RouteKindSchema.Enum, {
//     required_error: "Requerido",
//   }),
//   grade: z.union([z.number().nullable(), z.literal("project")]),
// });

const { schema: routeSchema } = route;
const schema = routeSchema
  .pick({ name: true, kind: true, unknownName: true })
  .merge(
    z.object({ grade: z.union([z.number().nullable(), z.literal("project")]) }),
  );

const AddRouteScreen: FC<Props> = ({ route, navigation }) => {
  const { wallId, ...rest } = route.params;
  const utils = trpc.useContext();

  const rootNavigation = useRootNavigation();

  const mainTopo = trpc.walls.mainTopo.useQuery({
    zoneId: rest.zoneId,
    wallId,
  });

  const { mutate, isLoading } = trpc.routes.add.useMutation({
    onSuccess: ({ id, position }) => {
      if (mainTopo.data) {
        rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
          screen: RoutesManagerNavigationRoutes.DrawRoute,
          params: {
            route: { id, position },
            wallId,
            topoId: mainTopo.data,
          },
        });
      } else {
        navigation.goBack();
      }
      utils.walls.byId.invalidate({ wallId });
    },
  });
  const { mutate: mutateEdit, isLoading: isLoadingEdit } =
    trpc.routes.edit.useMutation({
      onSuccess: () => {
        navigation.goBack();
        utils.walls.byId.invalidate({ wallId });
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

    if (rest.id) {
      mutateEdit({
        grade,
        kind: input.kind,
        name: input.name,
        routeId: rest.id,
        zoneId: rest.zoneId,
        unknownName: input.unknownName,
      });
      return;
    }
    mutate({
      wallId,
      name: input.name,
      kind: input.kind,
      grade,
      unknownName: input.unknownName,
      zoneId: rest.zoneId,
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

  const { allGrades, gradeSystem } = useGradeSystem(kindValue);

  const theme = useAppTheme();

  // const [unknownName, setUnknownName] = useState(false);

  const onUnknownNamePress = () => {
    if (unknownName) {
      onChange("");
      unknownNameOnChange(false);
      return;
    }
    onChange("Ruta sin nombre");
    unknownNameOnChange(true);
  };

  const [showNoName, setShowNoName] = useState(true);

  return (
    <Screen safeAreaDisabled={Platform.OS !== "android"}>
      <ScrollView
        padding="m"
        flex={1}
        marginBottom={"l"}
        onResponderGrant={Keyboard.dismiss}
      >
        <Text variant="h2">{rest.id ? "Editar ruta" : "Agregar ruta"}</Text>
        <Box marginTop={"m"}>
          <Text variant={"p1R"} marginBottom={"s"}>
            Nombre de la ruta
          </Text>
          <Box flexDirection="row" flex={1}>
            <TextInput
              value={value}
              onChangeText={onChange}
              editable={!unknownName}
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
            {showNoName && (
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
                      ? theme.colors["semantic.info"]
                      : theme.colors["grayscale.transparent.50.500"]
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
            <ButtonGroup.Item
              value={RouteKindSchema.Enum.Sport}
              label="Deportiva"
            />
            <ButtonGroup.Item
              value={RouteKindSchema.Enum.Boulder}
              label="Boulder"
            />
            <ButtonGroup.Item
              value={RouteKindSchema.Enum.Trad}
              label="Tradicional"
            />
            <ButtonGroup.Item
              value={RouteKindSchema.Enum.Mixed}
              label="Mixta"
            />
            <ButtonGroup.Item value={RouteKindSchema.Enum.Ice} label="Hielo" />
          </Box>
          <Text marginTop={"xs"} color="semantic.error">
            {kindError?.message}
          </Text>
        </ButtonGroup>
        <Box>
          <Text variant={"p1R"} marginBottom={"s"}>
            Grado
          </Text>
          {kindWatch && (
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
          )}
        </Box>
        <Button
          variant="primary"
          title={rest.name ? "Editar" : "Agregar"}
          onPress={onSubmit}
          isLoading={isLoading || isLoadingEdit}
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
