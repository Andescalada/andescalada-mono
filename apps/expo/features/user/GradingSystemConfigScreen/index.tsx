import user from "@andescalada/api/schemas/user";
import { GradeSystemsSchema, RouteKindSchema } from "@andescalada/db/zod";
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
import { gradeSystemSelector } from "@hooks/useGradeSystem";
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
    <Screen
      safeAreaDisabled
      alignItems="center"
      justifyContent="space-evenly"
      padding="m"
    >
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
      <Button
        title={saveButton.title}
        variant={saveButton.variant}
        onPress={onSave}
        isLoading={isLoading}
        disabled={!formState.isDirty || isLoading || isSuccess}
        padding="m"
      />
    </Screen>
  );
};

export default GradingSystemConfigScreen;
