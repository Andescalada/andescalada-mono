import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '@andescalada/ui';

import RouteCanvas from './RouteCanvas';
import RoutePath from './RoutePath';
import useRoutes from './useRoutes';

const EditTopoScreenTemplate = () => {
  const { state, methods } = useRoutes({});
  const { create, finish, remove, savePath, setRoute } = methods;
  const { routes, route } = state;

  const [tappedCoords, setTapCoords] = useState<{ x: number; y: number }>();
  const [maxRouteLength, setMaxRouteLength] = useState<number>(1);

  const [zoomEnable, setZoomEnable] = useState<boolean>(false);

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
    <View style={styles.screen}>
      <RouteCanvas value={tappedCoords} setValue={setTapCoords}>
        {routes
          .filter((r) => r.id === selectedRoute)
          ?.map((r) => {
            return (
              <RoutePath
                key={r.id}
                ref={r.ref}
                label={r.id}
                finished={r.finished}
                allowDrawing={!zoomEnable}
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

      <View style={{ flex: 1, paddingTop: 20 }}>
        <Text>{`Zoom: ${zoomEnable}`}</Text>
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
            setZoomEnable((prev) => !prev);
          }}
          title={!zoomEnable ? 'Dejar de dibujar' : 'Dibujar'}
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
    </View>
  );
};

export default EditTopoScreenTemplate;

const styles = StyleSheet.create({
  screen: { flex: 1 },
});
