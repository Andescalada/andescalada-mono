import { ComponentProps } from "react";

import Box from "../Box/Box";
import Button from "../Button/Button";
import SemanticButton from "../SemanticButton/SemanticButton";

interface Props extends ComponentProps<typeof Box> {
  onCancel: () => void;
  onAdd: () => void;
  addLabel?: string;
  cancelLabel?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const AddOrCancelButtons = ({
  onCancel,
  onAdd,
  isLoading,
  addLabel = "Agregar",
  cancelLabel = "Cancelar",
  disabled,
  ...props
}: Props) => {
  return (
    <Box {...props}>
      <Button
        variant="primary"
        padding="m"
        title={addLabel}
        onPress={onAdd}
        isLoading={isLoading}
        marginVertical="s"
        minHeight={50}
        disabled={disabled}
      />
      <SemanticButton
        minHeight={50}
        titleVariant="p1R"
        variant="error"
        title={cancelLabel}
        onPress={onCancel}
      />
    </Box>
  );
};

export default AddOrCancelButtons;
