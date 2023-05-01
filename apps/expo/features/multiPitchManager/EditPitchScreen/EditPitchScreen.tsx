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
import GradePicker from "@features/climbs/components/GradePicker";
import {
  MultiPitchManagerRoutes,
  MultiPitchManagerScreenProps,
} from "@features/multiPitchManager/Navigation/types";
import { useAppTheme } from "@hooks/useAppTheme";
import useGradeSystem from "@hooks/useGradeSystem";
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

  const { gradeSystem, getSystem } = useGradeSystem(kind.field.value);

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
      originalGrade:
        typeof grade.grade === "number"
          ? gradeSystem(grade.grade, kindWatch)
          : "",
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
            <GradePicker
              onChange={grade.field.onChange}
              value={grade.field.value}
              routeKind={kindWatch}
            />
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
