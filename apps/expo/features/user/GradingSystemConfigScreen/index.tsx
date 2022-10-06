import user from "@andescalada/api/schemas/user";
import { GradeSystemsSchema } from "@andescalada/db/zod";
import { Box, Button, ButtonGroup, Screen, Text } from "@andescalada/ui";
import useOwnInfo from "@hooks/useOwnInfo";
import useZodForm from "@hooks/useZodForm";
import { ComponentProps, FC } from "react";
import { useController } from "react-hook-form";

const GradingBox = (props: ComponentProps<typeof Box>) => (
  <Box justifyContent="space-around" alignItems="center" flexDirection="row">
    {props.children}
  </Box>
);

const GradingSystemConfigScreen: FC = () => {
  const { control, ...methods } = useZodForm({ schema: user.gradeSystem });

  const { data } = useOwnInfo();

  const sport = useController({
    control,
    name: "preferredSportSystem",
    defaultValue: data ? data.preferredSportGrade : undefined,
  });
  const trad = useController({
    control,
    name: "preferredTradSystem",
    defaultValue: data ? data.preferredTradGrade : undefined,
  });
  const boulder = useController({
    control,
    name: "preferredBoulderSystem",
    defaultValue: data ? data.preferredBoulderGrade : undefined,
  });

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
      <Button title="Guardar" variant="info" />
    </Screen>
  );
};

export default GradingSystemConfigScreen;
