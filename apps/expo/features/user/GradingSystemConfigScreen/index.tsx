import user from "@andescalada/api/schemas/user";
import { GradeSystemsSchema } from "@andescalada/db/zod";
import useZodForm from "@andescalada/hooks/useZodForm";
import {
  ActivityIndicator,
  Box,
  Button,
  ButtonGroup,
  Screen,
  Text,
} from "@andescalada/ui";
import {
  UserNavigationRoutes,
  UserNavigationScreenProps,
} from "@features/user/Navigation/types";
import useIsConnected from "@hooks/useIsConnected";
import useGetGradeSystemsQuery from "@local-database/hooks/useGetGradeSystemsQuery";
import useSetUserGradingSystemMutation from "@local-database/hooks/useSetUserGradingSystemMutation";
import sync from "@local-database/sync";
import { ComponentProps, FC, useMemo } from "react";
import { useController } from "react-hook-form";

const GradingBox = (props: ComponentProps<typeof Box>) => (
  <Box justifyContent="space-around" alignItems="center" flexDirection="row">
    {props.children}
  </Box>
);

type Props = UserNavigationScreenProps<UserNavigationRoutes.GradingSystem>;

const GradingSystemConfigScreen: FC<Props> = () => {
  const { data } = useGetGradeSystemsQuery();

  if (!data) {
    return (
      <Screen safeAreaDisabled justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Screen>
    );
  }

  return <GradingOptions data={data} />;
};

const GradingOptions = ({
  data,
}: {
  data: {
    preferredSportGrade: typeof GradeSystemsSchema._type;
    preferredTradGrade: typeof GradeSystemsSchema._type;
    preferredBoulderGrade: typeof GradeSystemsSchema._type;
  };
}) => {
  const { control, handleSubmit, formState } = useZodForm({
    schema: user.gradeSystem,
  });
  const isConnected = useIsConnected();

  const { mutate, isSuccess, isLoading } = useSetUserGradingSystemMutation({
    onSuccess() {
      if (isConnected) {
        sync();
      }
    },
  });

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
            margin="s"
            value={GradeSystemsSchema.Enum.French}
            label="Francesa"
          />
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
            value={GradeSystemsSchema.Enum.French}
            label="Francesa"
          />
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
          <ButtonGroup.Item
            margin="s"
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
