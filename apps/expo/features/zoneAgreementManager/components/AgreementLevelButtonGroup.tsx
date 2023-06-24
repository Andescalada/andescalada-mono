import { AgreementLevelSchema } from "@andescalada/db/zod";
import { A, Box, ButtonGroup, Text } from "@andescalada/ui";
import { ComponentProps } from "react";
import { FadeIn, FadeOut } from "react-native-reanimated";

type AgreementLevel = typeof AgreementLevelSchema._type;

interface Props extends Omit<ComponentProps<typeof A.Box>, "key"> {
  level: AgreementLevel | undefined;
  setLevel: (level: AgreementLevel | undefined) => void;
}

const AgreementLevelButtonGroup = ({ level, setLevel, ...props }: Props) => {
  return (
    <A.Box entering={FadeIn} exiting={FadeOut} {...props}>
      <Text variant="p1B" marginBottom="xs">
        Grado de relevancia:
      </Text>
      <ButtonGroup
        value={level}
        onChange={(v) => setLevel(v as AgreementLevel)}
        allowUndefined
      >
        <Box flexWrap="wrap" flexDirection="row">
          <ButtonGroup.Item
            margin="s"
            value={AgreementLevelSchema.enum.Critical}
            label="Crítico"
            selectedBackgroundColor={"semantic.error"}
            backgroundColor={
              level === undefined ? "semantic.error" : "grayscale.500"
            }
          />
          <ButtonGroup.Item
            margin="s"
            value={AgreementLevelSchema.enum.Important}
            label="Importante"
            selectedBackgroundColor={"semantic.warning"}
            backgroundColor={
              level === undefined ? "semantic.warning" : "grayscale.500"
            }
            textColor={
              level === undefined ? "grayscale.black" : "grayscale.white"
            }
            selectedTextColor="grayscale.black"
          />
          <ButtonGroup.Item
            margin="s"
            value={AgreementLevelSchema.enum.Recommended}
            label="Recomendado"
            selectedBackgroundColor={"semantic.info"}
            backgroundColor={
              level === undefined ? "semantic.info" : "grayscale.500"
            }
          />
          <ButtonGroup.Item
            margin="s"
            value={AgreementLevelSchema.enum.NotAplicable}
            label="No aplica"
            selectedBackgroundColor={"grayscale.800"}
            backgroundColor={
              level === undefined ? "grayscale.800" : "grayscale.500"
            }
          />
        </Box>
      </ButtonGroup>
    </A.Box>
  );
};

export default AgreementLevelButtonGroup;
