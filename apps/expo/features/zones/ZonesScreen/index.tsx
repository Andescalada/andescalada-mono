import { View, Text, Button } from 'react-native';
import React from 'react';
import ZonesList from '@andescalada/utils/zonesLists';
import { useAppDispatch } from '@hooks/redux';
import { logoutAuth0 } from '@store/auth';

const ZonesScreen = () => {
  const dispatch = useAppDispatch();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
      }}
    >
      <Text style={{ fontFamily: 'Rubik-700', fontSize: 30 }}>Zonas</Text>
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
