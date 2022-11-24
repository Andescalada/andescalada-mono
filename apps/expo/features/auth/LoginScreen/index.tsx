/* eslint-disable @typescript-eslint/no-var-requires */
import { A, AnimatedBackground, Button, Screen } from "@andescalada/ui";
import {
  AuthNavigationRoutes,
  AuthNavigationScreenProps,
} from "@features/auth/Navigation/types";
import React from "react";
import { FadeIn } from "react-native-reanimated";

const DURATION = 2000;

type Props = AuthNavigationScreenProps<AuthNavigationRoutes.Login>;

const LoginScreen = ({ navigation }: Props) => {
  return (
    <Screen alignItems="center" justifyContent="center">
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
          onPress={() => navigation.navigate(AuthNavigationRoutes.EnterEmail)}
          variant="transparent"
          paddingHorizontal="l"
          titleProps={{ color: "grayscale.white" }}
        />
      </A.Box>
    </Screen>
  );
};

export default LoginScreen;
