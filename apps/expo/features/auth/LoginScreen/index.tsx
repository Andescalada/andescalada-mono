import { Button, Screen, Text } from "@andescalada/ui";
import { useAppDispatch } from "@hooks/redux";
import { loginAuth0 } from "@store/auth";
import React from "react";

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const onLogin = () => {
    dispatch(loginAuth0());
  };
  return (
    <Screen alignItems="center" justifyContent="space-evenly">
      <Text variant="h1">Bienvenido</Text>
      <Button
        title="Iniciar Sesión"
        onPress={onLogin}
        variant="primary"
        paddingHorizontal="s"
      />
    </Screen>
  );
}
