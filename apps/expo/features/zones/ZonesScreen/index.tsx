import { View, Text } from 'react-native';
import React from 'react';
import ZonesList from '@zart/react-native/zonesLists';

const ZonesScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>ZonesScreen</Text>
      <ZonesList />
    </View>
  );
};

export default ZonesScreen;
