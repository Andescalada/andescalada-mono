import { Box, Pressable, Screen, Text } from '@andescalada/ui';
import { trpc } from '@andescalada/utils/trpc';
import {
  RouteManagerNavigationRoutes,
  RouteManagerScreenProps,
} from '@features/routesManager/Navigation/types';
import { FC } from 'react';
import { FlatList } from 'react-native';

type Props =
  RouteManagerScreenProps<RouteManagerNavigationRoutes.SelectRouteToDraw>;

const SelectRouteToDrawScreen: FC<Props> = ({ route }) => {
  const { wallId } = route.params;
  const { data } = trpc.useQuery(['walls.byId', wallId]);
  return (
    <Screen padding="m">
      <Text variant="h3">Selecciona una ruta</Text>
      <Box>
        <FlatList
          data={data?.routes}
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
              <Text variant="p1R">{`${item.position} - ${item.name}`}</Text>
            </Pressable>
          )}
        />
      </Box>
    </Screen>
  );
};

export default SelectRouteToDrawScreen;
