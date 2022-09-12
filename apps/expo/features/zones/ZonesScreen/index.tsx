import { View, Text, Button } from 'react-native';
import React from 'react';
import ZonesList from '@zart/react-native/zonesLists';
import { useAppDispatch } from '@hooks/redux';
import { logoutAuth0 } from '@store/auth';

const ZonesScreen = () => {
  const dispatch = useAppDispatch();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ZonesScreen</Text>
      <ZonesList />
      <Button
        title="Cerrar Sesión"
        onPress={() => {
          dispatch(logoutAuth0());
        }}
      />
    </View>
  );
};

export default ZonesScreen;
