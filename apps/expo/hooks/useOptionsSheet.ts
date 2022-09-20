import {
  useActionSheet,
  ActionSheetOptions,
} from '@expo/react-native-action-sheet';
import { useCallback, useMemo } from 'react';

type Options = Record<string, Function>;

interface Args extends Omit<ActionSheetOptions, 'options'> {
  withCancel?: boolean;
}

const useOptionsSheet = (
  optionsObject: Options,
  { cancelButtonIndex, withCancel = true, ...args }: Args = {},
) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const { options, actions } = useMemo(() => {
    const o = Object.entries(optionsObject);
    const cancelPosition =
      cancelButtonIndex !== undefined ? cancelButtonIndex : o.length + 1;
    if (withCancel) {
      o.splice(cancelPosition, 0, [
        'Cancelar',
        () => {
          return;
        },
      ]);
    }
    const options = o.map((v) => v[0]);
    const actions = o.map((v) => v[1]);
    return { options, actions };
  }, []);

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
  }, []);

  return onOptions;
};

export default useOptionsSheet;
