import {
  AnimatedBackground,
  BackButton,
  Box,
  KeyboardAvoidingBox,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import {
  AuthNavigationRoutes,
  AuthNavigationScreenProps,
} from "@features/auth/Navigation/types";
import { useAppDispatch } from "@hooks/redux";
import { loginAuth0 } from "@store/auth";
import passwordless from "@utils/auth0/passwordless";
import { FC, useMemo, useState } from "react";
import { Alert } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useTimer } from "react-timing-hooks";

const TIMEOUT = 3 * 60;

type Props = AuthNavigationScreenProps<AuthNavigationRoutes.EnterCode>;

const EnterCodeScreen: FC<Props> = ({
  route: {
    params: { email },
  },
  navigation,
}) => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (value: string) => {
    if (value.length < 4) return;
    try {
      const { access_token, id_token, refresh_token } =
        await passwordless.verifyCode(email, value);
      dispatch(
        loginAuth0({
          accessToken: access_token,
          idToken: id_token,
          refreshToken: refresh_token,
        }),
      );
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      Alert.alert("Error", message);
      ref.current?.clear();
    }
  };

  const seconds = useTimer(0);

  const timer = useMemo(() => {
    const date = new Date(0);
    date.setSeconds(TIMEOUT - seconds); // specify value for SECONDS here
    const timeString = date.toISOString().substring(14, 19);
    return timeString;
  }, [seconds]);

  return (
    <KeyboardAvoidingBox keyboardVerticalOffset={0} behavior={"height"}>
      <Screen
        justifyContent="flex-start"
        alignItems="center"
        padding="m"
        paddingTop="xxxl"
      >
        <AnimatedBackground />
        <BackButton.Transparent
          onPress={navigation.goBack}
          iconProps={{ color: "grayscale.white" }}
        />
        <Box>
          <Box justifyContent="space-evenly" alignItems="center">
            <Text variant="h1" marginBottom="m">
              Ingresa el código
            </Text>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={(t) => {
                setValue(t);
                if (t.length === 4) onSubmit(t);
              }}
              cellCount={4}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              textAlignVertical="center"
              renderCell={({ index, symbol, isFocused }) => (
                <Box
                  key={index}
                  onLayout={getCellOnLayoutHandler(index)}
                  justifyContent="center"
                  alignItems="center"
                  borderRadius={10}
                  borderColor={isFocused ? "semantic.info" : "grayscale.100"}
                  borderWidth={2}
                  width={50}
                  height={50}
                  marginHorizontal="s"
                >
                  <Text variant="p1R">
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </Box>
              )}
            />
            <Box marginTop="s">
              {seconds <= TIMEOUT ? (
                <Text>{timer}</Text>
              ) : (
                <Pressable onPress={() => passwordless.login(email)}>
                  <Text textDecorationLine={"underline"}>Reenviar código</Text>
                </Pressable>
              )}
            </Box>
          </Box>
        </Box>
      </Screen>
    </KeyboardAvoidingBox>
  );
};

export default EnterCodeScreen;
