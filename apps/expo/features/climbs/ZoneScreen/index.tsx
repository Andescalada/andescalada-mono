import {
  ActivityIndicator,
  Box,
  Pressable,
  Screen,
  Text,
} from '@andescalada/ui';
import { trpc } from '@andescalada/utils/trpc';
import useRefresh from '@hooks/useRefresh';
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from '@navigation/AppNavigation/RootNavigation/ClimbsNavigation/types';
import { FC } from 'react';
import { Button, FlatList } from 'react-native';

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Zone>;

const ZoneScreen: FC<Props> = ({ route, navigation }) => {
  const { data, refetch, isFetching, isLoading } = trpc.useQuery([
    'zones.allSectors',
    { zoneId: route.params.zoneId },
  ]);
  const refresh = useRefresh(refetch, isFetching);
  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size={'large'} />
      </Screen>
    );
  return (
    <Screen padding="m">
      <Box
        flexDirection={'row'}
        alignItems="center"
        justifyContent={'space-between'}
      >
        <Text variant={'h1'}>{route.params.zoneName}</Text>
        <Button
          title="Agregar"
          onPress={() =>
            navigation.navigate(ClimbsNavigationRoutes.AddZone, {
              zoneId: route.params.zoneId,
            })
          }
        />
      </Box>
      <Box flex={1}>
        <FlatList
          data={data}
          refreshControl={refresh}
          contentContainerStyle={{ flex: 1 }}
          ListEmptyComponent={() => (
            <Box flex={1} justifyContent="center" alignItems="center">
              <Text variant={'h3'}>Sin sectores</Text>
            </Box>
          )}
          renderItem={({ item }) => (
            <Pressable
              backgroundColor="listItemBackground"
              alignItems="stretch"
              padding="m"
              marginVertical={'s'}
              onPress={() =>
                navigation.navigate(ClimbsNavigationRoutes.Sector, {
                  sectorId: item.id,
                  sectorName: item.name,
                  zoneId: route.params.zoneId,
                })
              }
            >
              <Text variant="p1R">{item.name}</Text>
            </Pressable>
          )}
        />
      </Box>
    </Screen>
  );
};

export default ZoneScreen;
