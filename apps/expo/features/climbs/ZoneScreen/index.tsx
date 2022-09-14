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
  RootNavigationRoutes,
  RootNavigationScreenProps,
} from '@navigation/AppNavigation/RootNavigation/types';
import { FC } from 'react';
import { Button, FlatList } from 'react-native';

type Props = RootNavigationScreenProps<RootNavigationRoutes.Zone>;

const ZoneScreen: FC<Props> = ({ route, navigation }) => {
  const {} = trpc.useMutation(['sectors.add']);
  const { data, refetch, isFetching, isLoading } = trpc.useQuery([
    'sectors.all',
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
        <Button title="Agregar" />
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
                navigation.navigate(RootNavigationRoutes.Zone, {
                  zoneId: item.id,
                  zoneName: item.name,
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
