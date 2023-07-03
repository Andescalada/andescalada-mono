import user from "@andescalada/api/schemas/user";
import { GradeSystemsSchema, RouteKindSchema } from "@andescalada/db/zod";
import useZodForm from "@andescalada/hooks/useZodForm";
import { Box, Button, ButtonGroup, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  OnboardingRoutes,
  OnboardingScreenProps,
} from "@features/onboarding/Navigation/types";
import { gradeSystemSelector } from "@hooks/useGradeSystem";
import { ComponentProps, FC, useMemo } from "react";
import { useController } from "react-hook-form";

const GradingBox = (props: ComponentProps<typeof Box>) => (
  <Box justifyContent="space-around" alignItems="center" flexDirection="row">
    {props.children}
  </Box>
);

type Props = OnboardingScreenProps<OnboardingRoutes.FirstTimeGradingSystem>;

const GradingSystemConfigScreen: FC<Props> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState,
    reset: resetForm,
  } = useZodForm({
    schema: user.gradeSystem,
  });

  const utils = trpc.useContext();

  const {
    mutateAsync,
    isSuccess,
    isLoading,
    reset: resetMutation,
  } = trpc.user.editGradingSystem.useMutation({
    onSettled: (data) => {
      if (data) {
        const {
          preferredBoulderGrade,
          preferredSportGrade,
          preferredTradGrade,
        } = data;
        setTimeout(() => {
          resetForm({
            preferredBoulderGrade,
            preferredSportGrade,
            preferredTradGrade,
          }),
            resetMutation();
        }, 1500);
        utils.user.ownInfo.invalidate();
      }
    },
  });

  const sport = useController({
    control,
    name: "preferredSportGrade",
  });
  const trad = useController({
    control,
    name: "preferredTradGrade",
  });
  const boulder = useController({
    control,
    name: "preferredBoulderGrade",
  });

  const onSave = handleSubmit(async (data) => {
    mutateAsync(data);
    navigation.navigate(OnboardingRoutes.TermsAndConditions);
  });

  const saveButton = useMemo(() => {
    if (!formState.isDirty) {
      return { variant: "transparent" as const, title: "Continuar" };
    }
    if (isSuccess) {
      return { variant: "success" as const, title: "Éxito" };
    }
    return { variant: "info" as const, title: "Continuar" };
  }, [formState.isDirty, isSuccess]);

  const sportGradeExample = useMemo(
    () =>
      gradeSystemSelector(
        RouteKindSchema.Enum.Sport,
        sport.field.value,
        0,
      )?.[11],

    [sport.field.value],
  );
  const boulderGradeExample = useMemo(
    () =>
      gradeSystemSelector(
        RouteKindSchema.Enum.Boulder,
        boulder.field.value,
        0,
      )?.[10],
    [boulder.field.value],
  );
  const tradGradeExample = useMemo(
    () =>
      gradeSystemSelector(
        RouteKindSchema.Enum.Sport,
        trad.field.value,
        0,
      )?.[11],
    [trad.field.value],
  );

  return (
    <Screen padding="m" justifyContent="space-between">
      <Box>
        <Box height={100}>
          <Text variant="h1" marginHorizontal="none">
            Elige tus escalas de graduación favoritas
          </Text>
        </Box>
        <Box justifyContent="space-evenly" gap="m">
          <Text variant="h2">Grado Deportiva</Text>
          <GradingBox>
            <ButtonGroup
              value={sport.field.value}
              onChange={sport.field.onChange}
              allowUndefined={false}
            >
              <ButtonGroup.Item
                margin="s"
                value={GradeSystemsSchema.Enum.French}
                label="Francesa"
              />
              <Box flex={1} alignItems="center">
                <Text variant="p1R">{sportGradeExample || " "}</Text>
              </Box>
              <ButtonGroup.Item
                margin="s"
                value={GradeSystemsSchema.Enum.Yosemite}
                label="Yosemite"
              />
            </ButtonGroup>
          </GradingBox>
          <Text variant="h2">Grado Boulder</Text>
          <GradingBox>
            <ButtonGroup
              value={boulder.field.value}
              onChange={boulder.field.onChange}
              allowUndefined={false}
            >
              <ButtonGroup.Item
                margin="s"
                value={GradeSystemsSchema.Enum.Font}
                label="Fontainebleau"
              />
              <Box flex={1} alignItems="center">
                <Text variant="p1R">{boulderGradeExample || " "}</Text>
              </Box>
              <ButtonGroup.Item
                margin="s"
                value={GradeSystemsSchema.Enum.Hueco}
                label="Hueco"
              />
            </ButtonGroup>
          </GradingBox>
          <Text variant="h2">Grado Tradicional</Text>
          <GradingBox>
            <ButtonGroup
              value={trad.field.value}
              onChange={trad.field.onChange}
              allowUndefined={false}
            >
              <ButtonGroup.Item
                margin="s"
                value={GradeSystemsSchema.Enum.French}
                label="Francesa"
              />
              <Box flex={1} alignItems="center">
                <Text variant="p1R">{tradGradeExample || " "}</Text>
              </Box>
              <ButtonGroup.Item
                margin="s"
                value={GradeSystemsSchema.Enum.Yosemite}
                label="Yosemite"
              />
            </ButtonGroup>
          </GradingBox>
        </Box>
      </Box>
      <Button
        title={saveButton.title}
        variant={saveButton.variant}
        onPress={onSave}
        isLoading={isLoading}
        disabled={!formState.isDirty || isLoading || isSuccess}
        marginBottom="m"
      />
    </Screen>
  );
};

export default GradingSystemConfigScreen;
