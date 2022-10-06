import user from "@andescalada/api/schemas/user";
import { GradeSystemsSchema } from "@andescalada/db/zod";
import { Box, Button, ButtonGroup, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  UserNavigationRoutes,
  UserNavigationScreenProps,
} from "@features/user/Navigation/types";
import useOwnInfo from "@hooks/useOwnInfo";
import useZodForm from "@hooks/useZodForm";
import { ComponentProps, FC, useMemo } from "react";
import { useController } from "react-hook-form";

const GradingBox = (props: ComponentProps<typeof Box>) => (
  <Box justifyContent="space-around" alignItems="center" flexDirection="row">
    {props.children}
  </Box>
);

type Props = UserNavigationScreenProps<UserNavigationRoutes.GradingSystem>;

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
    mutate,
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

  const onSave = handleSubmit((data) => {
    mutate(data);
  });

  const saveButton = useMemo(() => {
    if (!formState.isDirty) {
      return { variant: "transparent" as const, title: "Guardar" };
    }
    if (isSuccess) {
      return { variant: "success" as const, title: "Guardado" };
    }
    return { variant: "info" as const, title: "Guardar" };
  }, [formState.isDirty, isSuccess]);

  return (
    <Screen safeAreaDisabled alignItems="center" justifyContent="space-evenly">
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
      <Button
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
