import { SemanticButton } from "@andescalada/ui";
import { ComponentProps, FC } from "react";

interface Props
  extends Omit<ComponentProps<typeof SemanticButton>, "title" | "variant"> {
  editing: boolean;
  cancel: boolean;
  setCancel: (b: boolean) => void;
  onSave: (args?: unknown) => void;
  onOptions: (args?: unknown) => void | (() => void);
}

const HeaderOptionsButton: FC<Props> = ({
  cancel,
  editing,
  setCancel,
  onSave,
  onOptions,
}) => {
  return (
    <SemanticButton
      variant={cancel ? "error" : "info"}
      title={editing ? (cancel ? "Cancelar" : "Guardar") : "Opciones"}
      onPress={editing ? onSave : onOptions}
      onLongPress={() => {
        if (editing) setCancel(true);
      }}
    />
  );
};

export default HeaderOptionsButton;
