import TextInput from "@andescalada/ui/TextInput/TextInput";
import { ComponentProps } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

type TextInputProps = Omit<ComponentProps<typeof TextInput>, "defaultValue">;

interface Props<T extends FieldValues>
  extends Omit<UseControllerProps<T>, "defaultValue">,
    TextInputProps {
  title: UseControllerProps<T>["defaultValue"];
}

const EditableTitle = <T extends FieldValues>({
  name,
  control,
  title,
  shouldUnregister,
  rules,
  ...props
}: Props<T>) => {
  const {
    field: { onBlur, onChange, value },
  } = useController({
    name,
    defaultValue: title,
    control,
    shouldUnregister,
    rules,
  });
  return (
    <TextInput
      variant={props.editable ? "filled" : "disableAsText"}
      textVariant="h3"
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      multiline
      textAlignVertical="center"
      containerProps={{
        justifyContent: "center",
        flex: 1,
      }}
      {...props}
    />
  );
};

export default EditableTitle;
