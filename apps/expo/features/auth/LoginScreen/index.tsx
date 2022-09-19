import { View, Text, Button } from 'react-native';
import React from 'react';
import { useAppDispatch } from '@hooks/redux';
import { loginAuth0 } from '@store/auth';

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const onLogin = () => {
    dispatch(loginAuth0());
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenido</Text>
      <Button title="Iniciar Sesión" onPress={onLogin} />
    </View>
  );
}
