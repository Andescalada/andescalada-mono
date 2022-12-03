import { A, Box, Button, ButtonGroup, useButtonGroup } from "@andescalada/ui";
import { ComponentProps, FC, ReactNode } from "react";
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
  return (
    <Box flex={1} marginTop="m" {...props}>
      <ButtonGroup
        value={value}
        allowUndefined={allowUndefined}
        onChange={onChange}
      >
        {children}
        <UndefinedAgreementButton />
        <SubmitButton onSubmit={onSubmit} submitLabel={submitLabel} />
      </ButtonGroup>
    </Box>
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
}

const SubmitButton = ({
  onSubmit,
  submitLabel = "Continuar",
}: SubmitButtonProps) => {
  const { value } = useButtonGroup();

  if (value !== undefined)
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
