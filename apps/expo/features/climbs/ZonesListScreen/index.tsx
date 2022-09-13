import { Button, FlatList } from 'react-native';
import { Text, Screen, ActivityIndicator, Pressable } from '@andescalada/ui';
import React from 'react';
import { useAppDispatch } from '@hooks/redux';
import { logoutAuth0 } from '@store/auth';
import { trpc } from '@andescalada/utils/trpc';

const ZonesScreen = () => {
  const dispatch = useAppDispatch();
  const { data, refetch, isFetching } = trpc.useQuery(['zones.all']);
  if (isFetching)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size={'large'} />
      </Screen>
    );
  return (
    <Screen padding="m">
      <Text variant="h1">Zonas</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Pressable
            backgroundColor="listItemBackground"
            alignItems="stretch"
            padding="m"
            marginVertical={'s'}
          >
            <Text variant="p1R">{item.name}</Text>
          </Pressable>
        )}
      />
    </Screen>
  );
};

export default ZonesScreen;
