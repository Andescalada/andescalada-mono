import { Text, Button, Screen } from '@andescalada/ui';
import React from 'react';
import { useAppDispatch } from '@hooks/redux';
import { loginAuth0 } from '@store/auth';

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const onLogin = () => {
    dispatch(loginAuth0());
  };
  return (
    <Screen alignItems="center" justifyContent="space-evenly">
      <Text variant="h1">Bienvenido</Text>
      <Button title="Iniciar Sesión" onPress={onLogin} variant="primary" />
    </Screen>
  );
}
