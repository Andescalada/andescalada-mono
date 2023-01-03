import { ActivityIndicator, Box, Text, TextInput } from "@andescalada/ui";
import useDebounce from "@hooks/useDebounce";
import useUsernameValidation from "@hooks/useUsernameValidation";
import { ComponentProps, FC, useEffect, useMemo } from "react";
import { useController, useFormContext } from "react-hook-form";

interface Props extends ComponentProps<typeof Box> {
  defaultValue?: string;
  onLoading?: (isValid: boolean) => void;
}

const UsernameInput: FC<Props> = ({ onLoading, defaultValue, ...props }) => {
  const form = useFormContext();

  const {
    field: { onChange: onChangeUsername, value: valueUsername },
    fieldState: { error: errorUsername, isTouched },
  } = useController({ name: "username", defaultValue });

  const {
    isLoading: isLoadingUsernameValidation,
    isValid: isUsernameValid,
    validateUsername,
  } = useUsernameValidation();

  useEffect(() => {
    if (onLoading) onLoading(isLoadingUsernameValidation);
  }, [isLoadingUsernameValidation, onLoading]);

  const userNameCheck = async (text: string) => {
    const res = await validateUsername(text);
    if (!res?.isValid) {
      form.setError("username", {
        type: "validate",
        message: res?.errorMessage,
      });
    } else {
      form.clearErrors("username");
    }
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

  const debounceUserNameCheck = useDebounce(userNameCheck, 500);

  const onChangeHandler = async (text: string) => {
    onChangeUsername(text);
    await debounceUserNameCheck(text);
  };

  const errorMessage = useMemo(
    () =>
      typeof errorUsername?.message === "string" ? errorUsername?.message : "",
    [errorUsername?.message],
  );

  return (
    <Box {...props}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <TextInput
          value={valueUsername}
          onChangeText={onChangeHandler}
          // onBlur={onBlurUsername}
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
        {errorMessage}
      </Text>
    </Box>
  );
};

export default UsernameInput;
