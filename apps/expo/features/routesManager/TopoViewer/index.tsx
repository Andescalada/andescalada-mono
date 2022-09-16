import { RouteCanvas, RoutePath } from '@andescalada/climbs-drawer';
import { Screen } from '@andescalada/ui';
import { trpc } from '@andescalada/utils/trpc';
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from '@features/routesManager/Navigation/types';
import { FC } from 'react';

type Props = RoutesManagerScreenProps<RoutesManagerNavigationRoutes.TopoViewer>;

const TopoViewer: FC<Props> = ({ route: navRoute }) => {
  const { topoId } = navRoute.params;
  const { data } = trpc.useQuery(['topos.byId', topoId]);
  if (!data) return null;
  return (
    <Screen>
      <RouteCanvas imageUri={data.image} zoomProps={{ zoomEnabled: true }}>
        {data.RoutePath.map((route) => (
          <RoutePath
            disableDrawing
            key={route.id}
            finished
            label={route.route.position}
            value={route.path}
          />
        ))}
      </RouteCanvas>
    </Screen>
  );
};

export default TopoViewer;
