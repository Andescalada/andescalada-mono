import { Box, Pressable, Screen, Text } from '@andescalada/ui';
import { trpc } from '@andescalada/utils/trpc';
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from '@features/routesManager/Navigation/types';
import { FC } from 'react';
import { FlatList } from 'react-native';

type Props =
  RoutesManagerScreenProps<RoutesManagerNavigationRoutes.SelectRouteToDraw>;

const SelectRouteToDrawScreen: FC<Props> = ({ route, navigation }) => {
  const { wallId } = route.params;

  const { data } = trpc.useQuery(['walls.byId', wallId]);

  return (
    <Screen padding="m">
      <Text variant="h3">Selecciona una ruta</Text>
      <Box flex={1}>
        <FlatList
          data={data?.routes}
          contentContainerStyle={{ flex: 1 }}
          ListEmptyComponent={() => (
            <Box flex={1} justifyContent="center" alignItems="center">
              <Text variant={'h3'}>Sin rutas</Text>
            </Box>
          )}
          renderItem={({ item: { name, position, id } }) => (
            <Pressable
              backgroundColor="listItemBackground"
              alignItems="stretch"
              padding="m"
              marginVertical={'s'}
              onPress={() => {
                navigation.navigate(RoutesManagerNavigationRoutes.DrawRoute, {
                  route: { id, position },
                  wallId,
                });
              }}
            >
              <Text variant="p1R">{`${position} - ${name}`}</Text>
            </Pressable>
          )}
        />
      </Box>
    </Screen>
  );
};

export default SelectRouteToDrawScreen;
