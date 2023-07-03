import { useTheme } from "@shopify/restyle";
import { ComponentProps, forwardRef } from "react";
import { StyleSheet } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import PhoneNumberInput, {
  PhoneInputProps,
} from "react-native-phone-number-input";

import Box from "../Box/Box";
import { Theme } from "../Theme/theme";

export type PhoneInputRef = PhoneNumberInput;

interface CompletePhoneInputProps
  extends Omit<PhoneInputProps, "countryPickerProps"> {
  countryPickerProps?: Partial<ComponentProps<typeof CountryPicker>>;
}

interface Props extends CompletePhoneInputProps {
  placeholder?: string;
  modalSearchPlaceholder?: string;
  isError?: boolean;
  defaultCode?: PhoneInputProps["defaultCode"];
  containerProps?: Partial<typeof Box>;
  editable?: boolean;
  onSubmit?: () => void;
}

// eslint-disable-next-line react/display-name
const PhoneInput = forwardRef<PhoneNumberInput, Props>(
  (
    {
      placeholder = "Type",
      modalSearchPlaceholder = "Buscar país",
      defaultCode = "CL",
      isError,
      containerProps,
      editable = true,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme<Theme>();

    return (
      <Box {...containerProps}>
        <PhoneNumberInput
          ref={ref}
          defaultCode={defaultCode}
          countryPickerButtonStyle={[
            styles.countryPickerButtonStyle,
            {
              backgroundColor: theme.colors.filledTextInputVariantBackground,
              marginRight: theme.spacing.xs,
            },
            props?.countryPickerButtonStyle,
          ]}
          textContainerStyle={[
            {
              backgroundColor: theme.colors.filledTextInputVariantBackground,
            },
            styles.textContainerStyle,
            isError
              ? {
                  ...styles.borderWidth,
                  borderColor: theme.colors["semantic.error"],
                }
              : {},
            props?.textContainerStyle,
          ]}
          textInputStyle={[styles.fontFamily, props?.textInputStyle]}
          codeTextStyle={[styles.fontFamily, props?.codeTextStyle]}
          placeholder={placeholder}
          layout="first"
          filterProps={{
            placeholder: modalSearchPlaceholder,
            ...props?.filterProps,
          }}
          textInputProps={{
            placeholderTextColor:
              theme.colors.filledTextInputVariantPlaceholder,
            editable,
            keyboardType: "phone-pad",
            returnKeyType: "done",
            onSubmitEditing: props?.onSubmit,
            ...props?.textInputProps,
          }}
          countryPickerProps={{
            translation: "spa",
            ...props?.countryPickerProps,
          }}
          containerStyle={{
            backgroundColor: "transparent",
            width: "100%",
          }}
          {...props}
        />
      </Box>
    );
  },
);

export default PhoneInput;

const styles = StyleSheet.create({
  countryPickerButtonStyle: {
    borderRadius: 4,
  },
  textContainerStyle: { paddingVertical: 4, borderRadius: 4 },
  fontFamily: {
    fontFamily: "Rubik-400",
  },
  borderWidth: { borderWidth: 1 },
});
