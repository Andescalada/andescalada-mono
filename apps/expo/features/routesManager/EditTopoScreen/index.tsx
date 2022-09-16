import { Text, View, Image } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Box, Button, Screen } from '@andescalada/ui';

import { RouteCanvas, RoutePath, useRoutes } from '@andescalada/climbs-drawer';
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from '@features/climbs/Navigation/types';
import { trpc } from '@andescalada/utils/trpc';

interface Props {}

const EditTopoScreen: FC<Props> = ({ route: navRoute }) => {
  const { wallId } = navRoute.params;

  const { data } = trpc.useQuery(['walls.byId', wallId]);

  const { state, methods } = useRoutes();
  const { create, finish, remove, savePath, setRoute } = methods;
  const { routes, route } = state;

  const [tappedCoords, setTapCoords] = useState<{ x: number; y: number }>();
  const [maxRouteLength, setMaxRouteLength] = useState<number>(1);

  const [allowToDraw, setAllowToDraw] = useState<boolean>(true);

  const [selectedRoute, setSelectedRoute] = useState<string>();

  useEffect(() => {
    setRoute({ id: selectedRoute });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoute]);

  const createRoute = ({ id }: { id: string }) => {
    setSelectedRoute(id);
    setTapCoords(undefined);
    create({ id });
  };

  return (
    <Screen>
      <Box height={400} overflow="hidden">
        <RouteCanvas
          value={tappedCoords}
          setValue={setTapCoords}
          imageUri={data?.topos[0].image}
        >
          {routes
            .filter((r) => r.id === selectedRoute)
            ?.map((r) => {
              return (
                <RoutePath
                  key={r.id}
                  ref={r.ref}
                  label={r.id}
                  finished={r.finished}
                  allowDrawing={allowToDraw}
                  value={r.path}
                  setValue={(p) => savePath({ id: r.id, path: p })}
                  tappedCoords={tappedCoords}
                />
              );
            })}
          {routes
            .filter((r) => r.id !== selectedRoute)
            .map((r) => {
              return (
                <RoutePath
                  key={r.id}
                  label={r.id}
                  allowDrawing={false}
                  value={r.path}
                  finished={r.finished}
                />
              );
            })}
        </RouteCanvas>
      </Box>

      <View
        style={{
          flex: 1,
          paddingTop: 20,
          position: 'absolute',
          bottom: 100,
          right: 60,
        }}
      >
        <Text>{`Zoom: ${allowToDraw}`}</Text>
        <Text>{`Selected Route: ${selectedRoute}`}</Text>
        <Button
          onPress={() => {
            route?.ref.current?.reset();
            if (selectedRoute) finish({ id: selectedRoute, finished: false });
          }}
          variant="primary"
          title="Limpiar"
        />
        <Button
          onPress={() => {
            route?.ref.current?.finishRoute();
            if (selectedRoute) finish({ id: selectedRoute, finished: true });
          }}
          variant="primary"
          title="Fin de la ruta"
        />
        <Button
          onPress={() => {
            route?.ref.current?.undo();
            if (route?.finished && selectedRoute)
              finish({ id: selectedRoute, finished: false });
          }}
          variant="primary"
          title="Deshacer"
        />
        <Button
          variant="primary"
          onPress={() => {
            setMaxRouteLength((prev) => (prev += 1));
            createRoute({ id: maxRouteLength.toString() });
          }}
          title="Crear ruta"
        />
        <Button
          variant="primary"
          onPress={() => {
            if (route) remove({ id: route?.id });
          }}
          title="Eliminar ruta"
        />
        <Button
          variant="primary"
          onPress={() => {
            setAllowToDraw((prev) => !prev);
          }}
          title={!allowToDraw ? 'Dejar de dibujar' : 'Dibujar'}
        />
        <FlatList
          data={routes}
          horizontal
          contentContainerStyle={{
            flex: 2,
            alignItems: 'stretch',
            justifyContent: 'space-evenly',
          }}
          renderItem={({ item }) => (
            <Button
              variant="primary"
              title={item.id}
              onPress={() => {
                setTapCoords(undefined);
                setSelectedRoute(item.id);
              }}
            />
          )}
        />
      </View>
    </Screen>
  );
};

export default EditTopoScreen;
