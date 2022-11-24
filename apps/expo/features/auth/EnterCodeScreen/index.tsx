import {
  A,
  AnimatedBackground,
  BackButton,
  Box,
  Button,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import {
  AuthNavigationRoutes,
  AuthNavigationScreenProps,
} from "@features/auth/Navigation/types";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
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
import { FadeIn } from "react-native-reanimated";
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
  const { loadingAuth } = useAppSelector((state) => state.auth);

  const onSubmit = async () => {
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
    <Screen padding="m" justifyContent="space-evenly" alignItems="center">
      <AnimatedBackground />
      <BackButton.Transparent
        onPress={navigation.goBack}
        iconProps={{ color: "white" }}
      />
      <Box flex={0.2} justifyContent="space-evenly" alignItems="center">
        <Text variant="h1">Ingresa el código</Text>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
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
      {value.length === 4 && (
        <A.Box entering={FadeIn}>
          <Button
            title="Enviar"
            onPress={onSubmit}
            variant="transparent"
            paddingHorizontal="l"
            isLoading={loadingAuth}
            titleProps={{ color: "grayscale.white" }}
          />
        </A.Box>
      )}
    </Screen>
  );
};

export default EnterCodeScreen;
