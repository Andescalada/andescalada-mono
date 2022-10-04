import {
  ActionSheetOptions,
  useActionSheet,
} from "@expo/react-native-action-sheet";
import { useCallback, useMemo } from "react";

type Options = Record<
  string,
  (() => void) | { action: () => void; hide?: boolean }
>;

interface Args extends Omit<ActionSheetOptions, "options"> {
  withCancel?: boolean;
}

const useOptionsSheet = (
  optionsObject: Options,
  { cancelButtonIndex, withCancel = true, ...args }: Args = {},
) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const { options, actions } = useMemo(() => {
    const o = Object.entries(optionsObject).filter((ops) => {
      if (typeof ops[1] === "object" && ops[1].hide === true) return false;
      return true;
    });
    const cancelPosition =
      cancelButtonIndex !== undefined ? cancelButtonIndex : o.length + 1;
    if (withCancel) {
      o.splice(cancelPosition, 0, [
        "Cancelar",
        () => {
          return;
        },
      ]);
    }
    const options = o.map((v) => v[0]);
    const actions = o.map((v) => {
      if (typeof v[1] === "object") {
        return v[1].action;
      }
      return v[1];
    });
    return { options, actions };
  }, [cancelButtonIndex, optionsObject, withCancel]);

  const onOptions = useCallback(() => {
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        ...args,
      },
      (buttonIndex) => {
        if (buttonIndex === undefined) return;
        actions[buttonIndex]();
      },
    );
  }, [actions, args, cancelButtonIndex, options, showActionSheetWithOptions]);

  return onOptions;
};

export default useOptionsSheet;
