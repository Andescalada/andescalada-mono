import {
  A,
  Box,
  Button,
  ButtonGroup,
  ScrollView,
  Text,
  useButtonGroup,
} from "@andescalada/ui";
import { ComponentProps, FC, ReactNode, useState } from "react";
import { FadeIn, FadeOut } from "react-native-reanimated";

interface Props
  extends ComponentProps<typeof ButtonGroup>,
    ComponentProps<typeof Box> {
  children: ReactNode;
  onSubmit: (id: string) => void;
  submitLabel?: string;
}

const UNDEFINED_AGREEMENT = "UNDEFINED_AGREEMENT";

const ClassicAgreementContainer: FC<Props> = ({
  children,
  value,
  onChange,
  onSubmit,
  submitLabel,
  allowUndefined,
  ...props
}) => {
  const [level, setLevel] = useState<number | undefined>();
  return (
    <ScrollView
      flex={1}
      marginTop="m"
      {...props}
      showsVerticalScrollIndicator={false}
    >
      <ButtonGroup
        value={value}
        allowUndefined={allowUndefined}
        onChange={onChange}
      >
        {children}
        <UndefinedAgreementButton />
        <AgreementGrade level={level} setLevel={setLevel} />
        <SubmitButton
          onSubmit={onSubmit}
          level={level}
          submitLabel={submitLabel}
        />
      </ButtonGroup>
    </ScrollView>
  );
};

export default ClassicAgreementContainer;

const UndefinedAgreementButton = () => {
  const { value, onChange, allowUndefined } = useButtonGroup();

  const isSelected = value === UNDEFINED_AGREEMENT;
  return (
    <Button
      variant={isSelected ? "info" : "contrast"}
      title="Saltar"
      marginBottom="l"
      onPress={() => {
        if (isSelected && allowUndefined) {
          onChange(undefined);
          return;
        }
        onChange(UNDEFINED_AGREEMENT);
      }}
    />
  );
};

interface SubmitButtonProps {
  onSubmit: (id: string) => void;
  submitLabel?: string;
  level: number | undefined;
}

const SubmitButton = ({
  onSubmit,
  submitLabel = "Continuar",
  level,
}: SubmitButtonProps) => {
  const { value } = useButtonGroup();

  if (
    value !== undefined &&
    (level !== undefined || value === UNDEFINED_AGREEMENT)
  )
    return (
      <A.Box entering={FadeIn} exiting={FadeOut}>
        <Button
          variant="success"
          title={submitLabel}
          onPress={() => onSubmit(value as string)}
        />
      </A.Box>
    );
  return <Box />;
};

interface AgreementGradeProps {
  level: number | undefined;
  setLevel: (level: number | undefined) => void;
}

const AgreementGrade = ({ level, setLevel }: AgreementGradeProps) => {
  const { value } = useButtonGroup();

  if (value && value !== UNDEFINED_AGREEMENT)
    return (
      <A.Box entering={FadeIn} exiting={FadeOut} marginBottom="m">
        <Text variant="p2R">Grado de relevancia:</Text>
        <ButtonGroup
          value={level}
          onChange={(v) => setLevel(v as number)}
          allowUndefined
        >
          <Box flexWrap="wrap" flexDirection="row">
            <ButtonGroup.Item
              value={2}
              label="Crítico"
              selectedBackgroundColor={"semantic.error"}
              backgroundColor={
                level === undefined ? "semantic.error" : "grayscale.500"
              }
            />
            <ButtonGroup.Item
              value={1}
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
              value={0}
              label="Recomendado"
              selectedBackgroundColor={"semantic.info"}
              backgroundColor={
                level === undefined ? "semantic.info" : "grayscale.500"
              }
            />
            <ButtonGroup.Item
              value={-1}
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

  return <Box />;
};
