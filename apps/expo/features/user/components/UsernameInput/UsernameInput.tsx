import { ActivityIndicator, Box, Text, TextInput } from "@andescalada/ui";
import useUsernameValidation from "@hooks/useUsernameValidation";
import { ComponentProps, FC, useMemo } from "react";
import { useController, useFormContext } from "react-hook-form";
import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

interface Props extends ComponentProps<typeof Box> {
  defaultValue?: string;
}

const UsernameInput: FC<Props> = ({ defaultValue, ...props }) => {
  const form = useFormContext();

  const {
    field: {
      onChange: onChangeUsername,
      onBlur: onBlurUsername,
      value: valueUsername,
    },
    fieldState: { error: errorUsername, isTouched },
  } = useController({ name: "username", defaultValue });

  const {
    isLoading: isLoadingUsernameValidation,
    isValid: isUsernameValid,
    validateUsername,
  } = useUsernameValidation();

  const onUserNameBlur = async (
    e: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => {
    onBlurUsername();

    if (defaultValue === valueUsername) {
      form.clearErrors("username");
      return;
    }

    const res = await validateUsername(e.nativeEvent.text);
    if (!res?.isValid)
      form.setError("username", {
        message: res?.errorMessage,
        type: "onBlur",
      });
    else form.clearErrors("username");
  };

  const usernameBorderColor = useMemo(() => {
    if (isUsernameValid && !isLoadingUsernameValidation && isTouched)
      return {
        borderWidth: 1,
        borderColor: "semantic.success" as const,
      };
    if (!isUsernameValid && !isLoadingUsernameValidation && isTouched)
      return {
        borderWidth: 1,
        borderColor: "semantic.error" as const,
      };
    return {
      borderWidth: 0,
    };
  }, [isLoadingUsernameValidation, isTouched, isUsernameValid]);

  return (
    <Box>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <TextInput
          value={valueUsername}
          onChangeText={onChangeUsername}
          onBlur={onUserNameBlur}
          autoCapitalize="none"
          autoCorrect={false}
          containerProps={{
            height: 40,
            flex: 1,
            ...usernameBorderColor,
            paddingLeft: "s",
          }}
          editable={!isLoadingUsernameValidation}
        />
        {isLoadingUsernameValidation && (
          <ActivityIndicator size="small" paddingLeft={"s"} />
        )}
      </Box>
      <Text marginTop={"xs"} color="semantic.error">
        {errorUsername?.message}
      </Text>
    </Box>
  );
};

export default UsernameInput;
