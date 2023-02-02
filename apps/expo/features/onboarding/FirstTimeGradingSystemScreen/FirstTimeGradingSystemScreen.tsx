import user from "@andescalada/api/schemas/user";
import { GradeSystemsSchema } from "@andescalada/db/zod";
import useZodForm from "@andescalada/hooks/useZodForm";
import { Box, Button, ButtonGroup, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  OnboardingRoutes,
  OnboardingScreenProps,
} from "@features/onboarding/Navigation/types";
import useOwnInfo from "@hooks/useOwnInfo";
import { ComponentProps, FC, useMemo } from "react";
import { useController } from "react-hook-form";

const GradingBox = (props: ComponentProps<typeof Box>) => (
  <Box justifyContent="space-around" alignItems="center" flexDirection="row">
    {props.children}
  </Box>
);

type Props = OnboardingScreenProps<OnboardingRoutes.FirstTimeGradingSystem>;

const GradingSystemConfigScreen: FC<Props> = () => {
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

  const firstTimeLogin = trpc.user.firstTimeLogin.useMutation();

  const { data } = useOwnInfo();

  const sport = useController({
    control,
    name: "preferredSportGrade",
    defaultValue: data ? data.preferredSportGrade : undefined,
  });
  const trad = useController({
    control,
    name: "preferredTradGrade",
    defaultValue: data ? data.preferredTradGrade : undefined,
  });
  const boulder = useController({
    control,
    name: "preferredBoulderGrade",
    defaultValue: data ? data.preferredBoulderGrade : undefined,
  });

  const onSave = handleSubmit(async (data) => {
    await mutateAsync(data);
    await firstTimeLogin.mutateAsync(false);
    utils.user.ownInfo.invalidate();
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

  return (
    <Screen alignItems="center" padding="s">
      <Text variant="h1" marginHorizontal="none">
        Elige tus escalas de graduación favoritas
      </Text>
      <Box flex={1} justifyContent="space-evenly">
        <Text variant="h2">Grado Deportiva</Text>
        <GradingBox>
          <ButtonGroup
            value={sport.field.value}
            onChange={sport.field.onChange}
            allowUndefined={false}
          >
            <ButtonGroup.Item
              value={GradeSystemsSchema.Enum.French}
              label="Francesa"
            />
            <ButtonGroup.Item
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
              value={GradeSystemsSchema.Enum.French}
              label="Francesa"
            />
            <ButtonGroup.Item
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
              value={GradeSystemsSchema.Enum.French}
              label="Francesa"
            />
            <ButtonGroup.Item
              value={GradeSystemsSchema.Enum.Yosemite}
              label="Yosemite"
            />
          </ButtonGroup>
        </GradingBox>
      </Box>
      <Button
        marginBottom="m"
        title={saveButton.title}
        variant={saveButton.variant}
        onPress={onSave}
        isLoading={isLoading}
        disabled={!formState.isDirty || isLoading || isSuccess}
      />
    </Screen>
  );
};

export default GradingSystemConfigScreen;
