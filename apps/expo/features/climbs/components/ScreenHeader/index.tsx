import { Box, EditableTitle, SemanticButton, Text } from "@andescalada/ui";
import { FC, useState } from "react";

interface Props {
  title: string;
}

const ScreenHeader: FC<Props> = ({ title }) => {
  const [editing, setEditing] = useState(false);
  const [cancel, setCancel] = useState(false);

  return (
    <Box flexDirection="row" alignItems="center" justifyContent="space-between">
      <EditableTitle
        title={title}
        name="sectorName"
        editable={editing}
        control={methods.control}
      />

      <SemanticButton
        variant={cancel ? "error" : "info"}
        title={editing ? (cancel ? "Cancelar" : "Guardar") : "Opciones"}
        onPress={editing ? onSave : onOptions}
        onLongPress={() => {
          if (editing) setCancel(true);
        }}
      />
    </Box>
  );
};

export default ScreenHeader;
