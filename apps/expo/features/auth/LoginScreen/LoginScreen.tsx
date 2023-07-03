/* eslint-disable @typescript-eslint/no-var-requires */
import { A, AnimatedBackground, Button, Screen } from "@andescalada/ui";
import {
  AuthNavigationRoutes,
  AuthNavigationScreenProps,
} from "@features/auth/Navigation/types";
import { useAppDispatch } from "@hooks/redux";
import { loginWithPassword } from "@store/auth";
import React from "react";
import { FadeIn } from "react-native-reanimated";

const DURATION = 2000;

type Props = AuthNavigationScreenProps<AuthNavigationRoutes.Login>;

const LoginScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const loginWithPasswordHandler = () => {
    dispatch(loginWithPassword());
  };
  return (
    <Screen alignItems="center" justifyContent="center" safeAreaDisabled>
      <AnimatedBackground withLogo />
      <A.Box
        entering={FadeIn.duration(500).delay(DURATION + 500)}
        justifyContent="flex-end"
        alignItems="center"
        marginBottom="xxxl"
        flex={1}
      >
        <Button
          title="Comencemos"
          onPress={() =>
            navigation.navigate(AuthNavigationRoutes.EnterPhoneNumber)
          }
          onLongPress={loginWithPasswordHandler}
          variant="transparent"
          paddingHorizontal="l"
          titleProps={{ color: "grayscale.white" }}
        />
      </A.Box>
    </Screen>
  );
};

export default LoginScreen;
