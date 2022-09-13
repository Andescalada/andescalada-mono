import { Button } from 'react-native';
import { Box, Text } from '@andescalada/ui';
import React from 'react';
import { useAppDispatch } from '@hooks/redux';
import { logoutAuth0 } from '@store/auth';

const ZonesScreen = () => {
  const dispatch = useAppDispatch();
  return (
    <Box flex={1} justifyContent="center" alignItems="center" padding="xl">
      <Text variant="h1">Zonas</Text>

      <Button
        title="Cerrar Sesión"
        onPress={() => {
          dispatch(logoutAuth0());
        }}
      />
    </Box>
  );
};

export default ZonesScreen;
