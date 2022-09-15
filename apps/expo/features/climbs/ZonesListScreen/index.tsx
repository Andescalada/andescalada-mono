import { FlatList } from 'react-native';
import { Text, Screen, ActivityIndicator, Pressable } from '@andescalada/ui';
import React from 'react';
import { trpc } from '@andescalada/utils/trpc';
import useRefresh from '@hooks/useRefresh';

import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from '@navigation/AppNavigation/RootNavigation/ClimbsNavigation/types';

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.ZonesList>;

const ZonesScreen = ({ navigation }: Props) => {
  const { data, refetch, isLoading, isFetching } = trpc.useQuery(['zones.all']);
  const refresh = useRefresh(refetch, isFetching);
  if (isLoading)
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
        refreshControl={refresh}
        renderItem={({ item }) => (
          <Pressable
            backgroundColor="listItemBackground"
            alignItems="stretch"
            padding="m"
            marginVertical={'s'}
            onPress={() =>
              navigation.navigate(ClimbsNavigationRoutes.Zone, {
                zoneId: item.id,
                zoneName: item.name,
              })
            }
          >
            <Text variant="p1R">{item.name}</Text>
          </Pressable>
        )}
      />
    </Screen>
  );
};

export default ZonesScreen;
