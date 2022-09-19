import { RouteCanvas, RoutePath, useRoutes } from '@andescalada/climbs-drawer';
import { Box, Button, Screen, Theme } from '@andescalada/ui';
import { trpc } from '@andescalada/utils/trpc';
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from '@features/routesManager/Navigation/types';
import type { RoutePath as RoutePathType } from '@prisma/client';
import { useTheme } from '@shopify/restyle';
import { FC, useState } from 'react';

type Props = RoutesManagerScreenProps<RoutesManagerNavigationRoutes.DrawRoute>;

interface RP extends RoutePathType {
  route: {
    id: string;
    position: number;
  };
}

const DrawRoute: FC<Props> = ({ route: navRoute, navigation }) => {
  const theme = useTheme<Theme>();
  const { wallId, route: routeParams, topoId } = navRoute.params;
  const { data } = trpc.useQuery(['walls.byId', wallId]);
  const [otherRoutes, setOtherRoutes] = useState<RP[]>();
  const [selectedRoutePathId, setSelectedRoutePathId] = useState<
    string | undefined
  >();
  trpc.useQuery(['topos.byId', topoId], {
    onSettled(topo) {
      const existingRoutesPath = topo?.RoutePath;
      if (existingRoutesPath) {
        const selectedRoute = existingRoutesPath.find(
          (r) => r.route.id === routeParams.id,
        );
        if (selectedRoute) {
          create({
            id: routeParams.id,
            label: routeParams.position.toString(),
            path: selectedRoute.path,
          });
          setSelectedRoutePathId(selectedRoute.id);
        } else {
          create({
            id: routeParams.id,
            label: routeParams.position.toString(),
          });
        }
      }
      const filteredTopos = topo?.RoutePath.filter(
        (r) => r.route.id !== routeParams.id,
      );

      setOtherRoutes(filteredTopos);
      setRoute({ id: routeParams.id });
    },
  });

  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation(['routes.addPath']);
  const [tappedCoords, setTapCoords] = useState<{ x: number; y: number }>();
  const [canSave, setCanSave] = useState(false);
  const { state, methods } = useRoutes();
  const { create, finish, savePath, setRoute } = methods;
  const { route } = state;

  const onFinishOrSave = () => {
    if (!canSave) {
      route?.ref.current?.finishRoute(() =>
        finish({ id: routeParams.id, finished: true }),
      );
      setCanSave(true);
      return;
    }
    if (route?.path && data) {
      mutate(
        {
          path: route?.path,
          routeId: route.id,
          topoId: data.topos[0].id,
          routePathId: selectedRoutePathId,
        },
        {
          onSuccess: () => {
            utils.invalidateQueries(['topos.byId', topoId]);
            setTimeout(() => navigation.popToTop(), 500);
          },
        },
      );
    }
  };

  return (
    <Screen>
      <RouteCanvas
        value={tappedCoords}
        setValue={setTapCoords}
        imageUri={data?.topos[0].image.url}
        zoomProps={{ zoomEnabled: false }}
      >
        {route && (
          <RoutePath
            key={route.id}
            ref={route.ref}
            label={route.label}
            value={route.path}
            routeColor={theme.colors.drawingRoute}
            setValue={(p) => savePath({ id: route.id, path: p })}
            tappedCoords={tappedCoords}
          />
        )}
        {otherRoutes?.map((route) => (
          <RoutePath
            disableDrawing
            key={route.id}
            finished
            label={route.route.position}
            value={route.path}
          />
        ))}
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
