import route from "@andescalada/api/schemas/route";
import { routeKindLabel } from "@andescalada/common-assets/routeKind";
import { RouteKindSchema } from "@andescalada/db/zod";
import useZodForm from "@andescalada/hooks/useZodForm";
import {
  Box,
  Button,
  ButtonGroup,
  Screen,
  ScrollView,
  SemanticButton,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  MultiPitchManagerRoutes,
  MultiPitchManagerScreenProps,
} from "@features/multiPitchManager/Navigation/types";
import { useAppTheme } from "@hooks/useAppTheme";
import useGradeSystem from "@hooks/useGradeSystem";
import { Picker } from "@react-native-picker/picker";
import { FC } from "react";
import { useController, useWatch } from "react-hook-form";
import { Alert, Keyboard, Platform } from "react-native";
import { z } from "zod";

type Props = MultiPitchManagerScreenProps<MultiPitchManagerRoutes.EditPitch>;

const schema = route.schema
  .pick({ kind: true })
  .merge(
    z.object({ grade: z.union([z.number().nullable(), z.literal("project")]) }),
  );

const EditPitchScreen: FC<Props> = ({
  navigation,
  route: {
    params: { pitchId, zoneId, ...defaultValues },
  },
}) => {
  const theme = useAppTheme();

  const utils = trpc.useContext();

  const editPitch = trpc.multiPitch.editPitch.useMutation({
    onSuccess: () => {
      utils.zones.invalidate();
      utils.multiPitch.invalidate();
      navigation.goBack();
    },
  });

  const {
    control,
    formState: { isDirty },
    handleSubmit,
  } = useZodForm({ schema, defaultValues });
  const kind = useController({
    control,
    name: "kind",
  });
  const grade = useController({ control, name: "grade" });

  const { allGrades, gradeSystem, getSystem } = useGradeSystem(
    kind.field.value,
  );

  const kindWatch = useWatch({
    control,
    name: "kind",
  });

  const onSubmit = handleSubmit((input) => {
    const grade = {
      grade: input.grade !== "project" ? input.grade : null,
      project: input.grade === "project",
    };

    const data = {
      kind: input.kind,
      grade,
      zoneId,
      pitchId,
      originalGradeSystem: getSystem(input.kind),
    };

    editPitch.mutate(data);
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

  return (
    <Screen safeAreaDisabled={Platform.OS !== "android"}>
      <ScrollView
        padding="m"
        paddingTop="l"
        flex={1}
        marginBottom={"l"}
        onResponderGrant={Keyboard.dismiss}
      >
        <Text variant="h1">Editar largo</Text>

        <Text variant={"p1R"} marginBottom={"s"}>
          Tipo de ruta
        </Text>
        <ButtonGroup value={kind.field.value} onChange={kind.field.onChange}>
          <Box flexWrap="wrap" flexDirection="row">
            {RouteKindSchema.options
              .filter((o) => o !== RouteKindSchema.enum.Boulder)
              .map((kind) => (
                <ButtonGroup.Item
                  key={kind}
                  value={kind}
                  label={routeKindLabel(kind).long}
                />
              ))}
          </Box>
          <Text marginTop={"xs"} color="semantic.error">
            {kind.fieldState.error?.message}
          </Text>
        </ButtonGroup>
        {kindWatch && (
          <Box>
            <Text variant={"p1R"} marginBottom={"s"}>
              Grado
            </Text>
            <Picker
              onValueChange={grade.field.onChange}
              selectedValue={grade.field.value}
              onBlur={grade.field.onBlur}
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
          title={"Editar"}
          onPress={onSubmit}
          isLoading={editPitch.isLoading}
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

export default EditPitchScreen;
