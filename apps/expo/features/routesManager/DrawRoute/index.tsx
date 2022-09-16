import { RouteCanvas, RoutePath, useRoutes } from '@andescalada/climbs-drawer';
import { Box, Button, Screen } from '@andescalada/ui';
import { trpc } from '@andescalada/utils/trpc';
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from '@features/routesManager/Navigation/types';
import { FC, useState } from 'react';

type Props = RoutesManagerScreenProps<RoutesManagerNavigationRoutes.DrawRoute>;

const DrawRoute: FC<Props> = ({ route: navRoute, navigation }) => {
  const { wallId, route: routeParams } = navRoute.params;
  const { data } = trpc.useQuery(['walls.byId', wallId]);
  const { mutate, isLoading } = trpc.useMutation(['routes.addPath']);
  const [tappedCoords, setTapCoords] = useState<{ x: number; y: number }>();
  const [canSave, setCanSave] = useState(false);
  const { state, methods } = useRoutes();
  const { create, finish, savePath, setRoute } = methods;
  const { route } = state;

  const createRoute = () => {
    create({ id: routeParams.id, label: routeParams.position.toString() });
    setRoute({ id: routeParams.id });
  };

  const onFinishOrSave = () => {
    if (!canSave) {
      route?.ref.current?.finishRoute(() =>
        finish({ id: routeParams.id, finished: true }),
      );
      setCanSave(true);
      return;
    }
    if (route?.path && data) {
      mutate({
        path: route?.path,
        routeId: route.id,
        topoId: data.topos[0].id,
      });
      setTimeout(() => navigation.popToTop(), 500);
    }
  };

  return (
    <Screen onLayout={createRoute}>
      <RouteCanvas
        value={tappedCoords}
        setValue={setTapCoords}
        imageUri={data?.topos[0].image}
        zoomProps={{ zoomEnabled: false }}
      >
        {route && (
          <RoutePath
            key={route.id}
            ref={route.ref}
            label={route.label}
            value={route.path}
            setValue={(p) => savePath({ id: route.id, path: p })}
            tappedCoords={tappedCoords}
          />
        )}
      </RouteCanvas>
      <Box position="absolute" top={50} right={0} margin="l">
        <Button
          title={canSave ? 'Guardar' : 'Finalizar'}
          variant={canSave ? 'success' : 'error'}
          titleVariant={'p1R'}
          isLoading={isLoading}
          onPress={onFinishOrSave}
        />
        <Button
          title="Deshacer"
          variant={'transparent'}
          titleVariant={'p1R'}
          marginTop="s"
          onPress={() => {
            route?.ref.current?.undo();
            setCanSave(false);
            if (route?.finished)
              finish({ id: routeParams.id, finished: false });
          }}
        />
        <Button
          title="Borrar"
          variant={'transparent'}
          titleVariant={'p1R'}
          marginTop="s"
          onPress={() => {
            route?.ref.current?.reset();
            setCanSave(false);
            if (route?.finished)
              finish({ id: routeParams.id, finished: false });
          }}
        />
      </Box>
    </Screen>
  );
};

export default DrawRoute;
