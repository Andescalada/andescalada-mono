import user from "@andescalada/api/schemas/user";
import { GradeSystemsSchema } from "@andescalada/db/zod";
import useZodForm from "@andescalada/hooks/useZodForm";
import {
  Box,
  Button,
  ButtonGroup,
  Screen,
  ScrollView,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  OnboardingRoutes,
  OnboardingScreenProps,
} from "@features/onboarding/Navigation/types";
import { ComponentProps, FC, useMemo } from "react";
import { useController } from "react-hook-form";
import { useWindowDimensions } from "react-native";

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

  const { height } = useWindowDimensions();

  return (
    <Screen>
      <ScrollView
        padding="m"
        contentContainerStyle={{
          minHeight: height - 100,
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box height={100}>
            <Text variant="h1" marginHorizontal="none">
              Elige tus escalas de graduación favoritas
            </Text>
          </Box>
          <Box justifyContent="space-evenly">
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
        </Box>
        <Button
          title={saveButton.title}
          variant={saveButton.variant}
          onPress={onSave}
          isLoading={isLoading}
          disabled={!formState.isDirty || isLoading || isSuccess}
        />
      </ScrollView>
    </Screen>
  );
};

export default GradingSystemConfigScreen;
