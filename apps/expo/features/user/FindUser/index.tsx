import user from "@andescalada/api/schemas/user";
import { Box, BoxWithKeyboard, Text, TextInput } from "@andescalada/ui";
import { pallete } from "@andescalada/ui/Theme/pallete";
import BottomSheet from "@gorhom/bottom-sheet";
import useZodForm from "@hooks/useZodForm";
import {
  FC,
  forwardRef,
  ForwardRefRenderFunction,
  useMemo,
  useRef,
} from "react";
import { useController } from "react-hook-form";
import { StyleSheet } from "react-native";

interface Props {
  onSetUser?: (user: string) => void;
}

const FindUser: ForwardRefRenderFunction<BottomSheet, Props> = (props, ref) => {
  const snapPoints = useMemo(() => ["1%", "100%"], []);
  const { handleSubmit, control } = useZodForm({
    schema: user.schema.pick({ username: true }),
  });

  const {
    field: { value, onChange, onBlur },
  } = useController({ name: "username", control });
  return (
    <BottomSheet
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BoxWithKeyboard flex={1} behavior="height" padding={"m"}>
        <Text variant="h3" marginBottom="s">
          Buscar usuario
        </Text>
        <Box>
          <TextInput
            textVariant="p1R"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            containerProps={{ height: 40 }}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="nombre de usuario"
            adornmentProps={{
              startAdornment: "@",
              startAdornmentContainerProps: { alignSelf: "center" },
              startAdornmentProps: { fontSize: 20, marginHorizontal: "s" },
            }}
          />
        </Box>
      </BoxWithKeyboard>
    </BottomSheet>
  );
};

export default forwardRef(FindUser);

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: pallete.grayscale.black,
  },
  handleIndicator: {
    backgroundColor: pallete.grayscale["100"],
  },
});
