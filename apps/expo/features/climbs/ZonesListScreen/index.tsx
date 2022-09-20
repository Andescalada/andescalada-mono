import { FlatList } from 'react-native';
import {
  Text,
  Screen,
  ActivityIndicator,
  Pressable,
  ListItem,
} from '@andescalada/ui';
import React from 'react';
import { trpc } from '@andescalada/utils/trpc';
import useRefresh from '@hooks/useRefresh';

import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from '@features/climbs/Navigation/types';

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.ZonesList>;

const ZonesScreen = ({ navigation }: Props) => {
  const { data, refetch, isLoading, isFetching } = trpc.zones.all.useQuery();
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
          <ListItem
            marginVertical={'s'}
            onPress={() =>
              navigation.navigate(ClimbsNavigationRoutes.Zone, {
                zoneId: item.id,
                zoneName: item.name,
              })
            }
          >
            <Text variant="p1R">{item.name}</Text>
          </ListItem>
        )}
      />
    </Screen>
  );
};

export default ZonesScreen;
