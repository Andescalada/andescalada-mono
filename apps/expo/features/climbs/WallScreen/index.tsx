import { Box, Pressable, Screen, Text } from '@andescalada/ui';
import { trpc } from '@andescalada/utils/trpc';
import useRefresh from '@hooks/useRefresh';
import {
  RootNavigationRoutes,
  RootNavigationScreenProps,
} from '@navigation/AppNavigation/RootNavigation/types';
import { FC } from 'react';
import { FlatList } from 'react-native';

type Props = RootNavigationScreenProps<RootNavigationRoutes.Wall>;

const WallScreen: FC<Props> = ({ route, navigation }) => {
  const { data, refetch, isFetching } = trpc.useQuery([
    'walls.byId',
    route.params.wallId,
  ]);
  const refresh = useRefresh(refetch, isFetching);

  const mainTopo = data?.topos[0];

  return (
    <Screen padding={'m'}>
      <Text variant={'h3'}>{route.params.wallName}</Text>
      {!mainTopo && (
        <Pressable
          flex={1 / 2}
          borderColor="info"
          borderWidth={2}
          borderRadius={10}
          borderStyle={'dashed'}
          justifyContent="center"
          alignItems={'center'}
          marginVertical="s"
        >
          <Text variant={'p1R'}>Agregar topo</Text>
        </Pressable>
      )}
      <FlatList
        data={data?.routes}
        refreshControl={refresh}
        contentContainerStyle={{ flex: 1 }}
        ListEmptyComponent={() => (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text variant={'h3'}>Sin rutas</Text>
          </Box>
        )}
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

export default WallScreen;
