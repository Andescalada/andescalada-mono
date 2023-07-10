import {
  ComponentProps,
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
} from "react";

import Pressable from "../Pressable/Pressable";
import Text from "../Text/Text";

interface ButtonItemProps
  extends Omit<ComponentProps<typeof Pressable>, "backgroundColor"> {
  label: string | ReactNode;
  value: string | number | undefined;
  backgroundColor?:
    | ComponentProps<typeof Pressable>["backgroundColor"]
    | (({
        hasSelection,
        isSelected,
      }: {
        isSelected: boolean;
        hasSelection: boolean;
      }) => ComponentProps<typeof Pressable>["backgroundColor"]);
  selectedBackgroundColor?: ComponentProps<typeof Pressable>["backgroundColor"];
  textColor?:
    | ComponentProps<typeof Text>["color"]
    | (({
        hasSelection,
        isSelected,
      }: {
        isSelected: boolean;
        hasSelection: boolean;
      }) => ComponentProps<typeof Text>["color"]);
  selectedTextColor?: ComponentProps<typeof Text>["color"];
  textProps?: ComponentProps<typeof Text>;
}

const ButtonItem: FC<ButtonItemProps> = ({
  label,
  value: localValue,
  backgroundColor = "buttonGroup",
  selectedBackgroundColor = "selectedButtonGroup",
  textColor,
  selectedTextColor = "grayscale.white",
  textProps,
  ...props
}) => {
  const { value, onChange, allowUndefined } = useButtonGroup();
  const isSelected = value === localValue;

  const backgroundColorHandler = () => {
    if (typeof backgroundColor === "function") {
      return backgroundColor({ isSelected, hasSelection: value !== undefined });
    }
    return backgroundColor;
  };

  const textColorHandler = useCallback(() => {
    if (typeof textColor === "function") {
      return textColor({ isSelected, hasSelection: value !== undefined });
    }
    return textColor;
  }, [isSelected, textColor, value]);

  const content = useCallback(
    () =>
      typeof label === "string" ? (
        <Text
          variant={isSelected ? "p2B" : "p2R"}
          color={isSelected ? selectedTextColor : textColorHandler()}
          {...textProps}
        >
          {label}
        </Text>
      ) : (
        label
      ),
    [isSelected, label, selectedTextColor, textColorHandler, textProps],
  );

  return (
    <Pressable
      onPress={() => {
        if (isSelected && allowUndefined) {
          onChange(undefined);
          return;
        }
        onChange(localValue);
      }}
      padding="m"
      backgroundColor={
        isSelected ? selectedBackgroundColor : backgroundColorHandler()
      }
      borderRadius={100}
      {...props}
    >
      {content()}
    </Pressable>
  );
};

export interface ButtonGroupProps {
  value: string | number | undefined;
  onChange: (v: string | number | undefined) => void;
  children: ReactNode;
  allowUndefined?: boolean;
}

const ButtonGroupContext = createContext<ButtonGroupProps | null>(null);

export const ButtonGroup: FC<ButtonGroupProps> & {
  Item: FC<ButtonItemProps>;
} = ({ children, value, allowUndefined = true, onChange }) => {
  return (
    <ButtonGroupContext.Provider
      value={{ value, onChange, children, allowUndefined }}
    >
      {children}
    </ButtonGroupContext.Provider>
  );
};

export const useButtonGroup = () => {
  const methods = useContext(ButtonGroupContext);

  return methods as unknown as ButtonGroupProps;
};

ButtonGroup.Item = ButtonItem;

export default ButtonGroup;
