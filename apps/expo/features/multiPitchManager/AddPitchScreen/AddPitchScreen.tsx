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
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useGradeSystem from "@hooks/useGradeSystem";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { FC } from "react";
import { useController, useWatch } from "react-hook-form";
import { Alert, Keyboard } from "react-native";
import { z } from "zod";

type Props = MultiPitchManagerScreenProps<MultiPitchManagerRoutes.AddPitch>;

const schema = route.schema
  .pick({ kind: true })
  .merge(
    z.object({ grade: z.union([z.number().nullable(), z.literal("project")]) }),
  );

const AddPitchScreen: FC<Props> = ({
  navigation,
  route: {
    params: {
      previousPitchKind: lastPitchKind,
      zoneId,
      multiPitchId,
      previousPitchId,
      topoId,
    },
  },
}) => {
  const utils = trpc.useContext();

  const rootNavigation = useRootNavigation();

  const addPitch = trpc.multiPitch.addPitch.useMutation({
    onSuccess: ({ routeId, MultiPitch, number }) => {
      utils.zones.invalidate();
      utils.multiPitch.invalidate();
      if (!topoId || !MultiPitch) {
        navigation.goBack();
        return;
      }

      rootNavigation.replace(RootNavigationRoutes.RouteManager, {
        screen: RoutesManagerNavigationRoutes.MultiPitchDrawer,
        params: {
          route: {
            id: routeId,
            position: MultiPitch.position,
          },
          newPitch: Number(number) === 1,
          pitchNumber: Number(number),
          previousPitchId,
          wallId: MultiPitch.wallId,
          topoId,
          zoneId,
          multiPitchId: MultiPitch.id,
          multiPitchName: MultiPitch.name,
        },
      });
    },
  });

  const {
    control,
    formState: { isDirty },
    handleSubmit,
  } = useZodForm({ schema });
  const kind = useController({
    control,
    name: "kind",
    defaultValue: lastPitchKind,
  });
  const grade = useController({ control, name: "grade", defaultValue: null });

  const { gradeSystem, getSystem } = useGradeSystem(kind.field.value);

  const kindWatch = useWatch({
    control,
    name: "kind",
    defaultValue: lastPitchKind,
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
      multiPitchId,
      originalGradeSystem: getSystem(input.kind),
      originalGrade:
        typeof grade.grade === "number"
          ? gradeSystem(grade.grade, kindWatch)
          : "",
    };

    addPitch.mutate(data);
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
    <Screen>
      <ScrollView
        padding="m"
        paddingTop="l"
        flex={1}
        marginBottom={"l"}
        onResponderGrant={Keyboard.dismiss}
      >
        <Text variant="h1">Agregar largo</Text>

        <Text variant={"p1R"} marginBottom={"s"}>
          Tipo de ruta
        </Text>
        <ButtonGroup value={kind.field.value} onChange={kind.field.onChange}>
          <Box flexWrap="wrap" flexDirection="row">
            {RouteKindSchema.options
              .filter((o) => o !== RouteKindSchema.enum.Boulder)
              .map((kind) => (
                <ButtonGroup.Item
                  margin="s"
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
          title={"Agregar"}
          onPress={onSubmit}
          isLoading={addPitch.isLoading}
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

export default AddPitchScreen;
