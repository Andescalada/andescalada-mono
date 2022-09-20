import { Box, Text, TextInput, SemanticButton } from '@andescalada/ui';
import { FC, ReactNode, ComponentProps } from 'react';
import { z } from 'zod';
import { useController, Controller } from 'react-hook-form';
import type { Control, FieldValues, UseControllerProps } from 'react-hook-form';

type TextInputProps = Omit<ComponentProps<typeof TextInput>, 'defaultValue'>;

interface Props<T extends FieldValues>
  extends Omit<UseControllerProps<T>, 'defaultValue'>,
    TextInputProps {
  title: UseControllerProps<T>['defaultValue'];
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
      variant={props.editable ? 'filled' : 'disableAsText'}
      textVariant="h3"
      lineHeight={20}
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      multiline
      textAlignVertical="top"
      containerProps={{
        justifyContent: 'center',
        flex: 1,
      }}
      {...props}
    />
  );
};

export default EditableTitle;
