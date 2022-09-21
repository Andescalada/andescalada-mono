import { useCallback, useState } from "react";

interface Args {
  onSave: () => void;
}

const useHeaderOptionButton = ({ onSave: onSaveArg }: Args) => {
  const [editing, setEditing] = useState(false);
  const [cancel, setCancel] = useState(false);

  const onSave = useCallback(() => {
    if (cancel) {
      setEditing(false);
      setCancel(false);
      return;
    }
    onSaveArg();
  }, [cancel, onSaveArg]);

  return { onSave, editing, cancel, setEditing, setCancel };
};

export default useHeaderOptionButton;
