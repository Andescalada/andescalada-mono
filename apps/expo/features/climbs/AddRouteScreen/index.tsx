import { RouteKindSchema } from "@andescalada/db/zod";
import {
  Box,
  Button,
  ButtonGroup,
  Screen,
  ScrollView,
  SemanticButton,
  Text,
  TextInput,
  Theme,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import useGradeSystem from "@hooks/useGradeSystem";
import useZodForm from "@hooks/useZodForm";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@shopify/restyle";
import { FC } from "react";
import { useController, useWatch } from "react-hook-form";
import { Alert, Keyboard, Platform } from "react-native";
import { z } from "zod";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.AddRoute>;

const schema = z.object({
  name: z
    .string({ required_error: "Requerido" })
    .min(3, "Nombre muy corto")
    .max(50, "Nombre muy largo"),
  kind: z.nativeEnum(RouteKindSchema.Enum, {
    required_error: "Requerido",
  }),
  grade: z.union([z.number().nullable(), z.literal("project")]),
});

const AddRouteScreen: FC<Props> = ({ route, navigation }) => {
  const { wallId } = route.params;
  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.routes.add.useMutation({
    onSuccess: () => {
      navigation.goBack();
      utils.walls.byId.invalidate(route.params.wallId);
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useZodForm({
    schema,
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
    mutate({ wallId, name: input.name, kind: input.kind, grade });
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

  const theme = useTheme<Theme>();

  return (
    <Screen>
      <ScrollView
        padding="m"
        flex={1}
        marginBottom={"l"}
        onResponderGrant={Keyboard.dismiss}
      >
        <Text variant="h1">Agregar ruta</Text>
        <Box marginTop={"m"}>
          <Text variant={"p1R"} marginBottom={"s"}>
            Nombre de la ruta
          </Text>
          <TextInput
            value={value}
            onChangeText={onChange}
            containerProps={{ height: 50 }}
            textAlignVertical="center"
          />
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
          title="Agregar"
          onPress={onSubmit}
          isLoading={isLoading}
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
