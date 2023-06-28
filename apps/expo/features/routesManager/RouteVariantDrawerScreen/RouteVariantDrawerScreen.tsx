import { pathToArray } from "@andescalada/climbs-drawer/utils";
import {
  ActivityIndicator,
  Button,
  Ionicons,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import RouteVariantDrawer from "@features/routesManager/RouteVariantDrawerScreen/RouteVariantDrawer";
import parsedTopo from "@features/routesManager/utils/parsedTopos";
import useToposById from "@hooks/offlineQueries/useToposById";
import useTopoImage from "@hooks/useTopoImage";
import constants from "@utils/constants";
import { FC, useMemo } from "react";

type Props =
  RoutesManagerScreenProps<RoutesManagerNavigationRoutes.RouteVariantDrawer>;

const DrawRoute: FC<Props> = ({
  route: {
    params: { wallId, route: routeParams, topoId, zoneId },
  },
  navigation,
}) => {
  const extendedRoute = trpc.routes.byId.useQuery(routeParams.variantRouteId);

  const extendedRouteStart = useMemo(() => {
    if (!extendedRoute) return undefined;

    const prevPath = extendedRoute?.data?.Wall.topos
      .find((t) => t.id === topoId)
      ?.RoutePath.at(0)?.path;

    if (prevPath) {
      const arrayPath = pathToArray(prevPath).pop();
      if (!arrayPath) return undefined;
      return `${arrayPath[0]},${arrayPath[1]}`;
    }
    return undefined;
  }, [extendedRoute, topoId]);

  const { data } = useToposById({ topoId, zoneId }, {});

  const topos = useMemo(
    () => parsedTopo(data, routeParams.id),
    [routeParams.id, data],
  );

  const { fileUrl, isImageLoaded, fitted } = useTopoImage({
    wallId,
    zoneId,
    imageQuality: constants.imageQuality,
  });

  if (topos && isImageLoaded && !!extendedRouteStart) {
    return (
      <RouteVariantDrawer
        topos={topos}
        fileUrl={fileUrl}
        height={fitted.height}
        width={fitted.width}
        scale={fitted.scale}
      />
    );
  }

  if (!extendedRoute.isLoading && !extendedRouteStart) {
    return (
      <Screen justifyContent="center" alignItems="center" gap="l" padding="l">
        <Ionicons
          name="close-circle-outline"
          color="semantic.error"
          size={60}
        />
        <Text variant="p1R">
          No encontramos la ruta que quieres agregar una variante
        </Text>
        <Text>
          Primero debes dibujar la ruta original para luego agregar una
          variante.
        </Text>
        <Button title="Volver" variant="info" onPress={navigation.goBack} />
      </Screen>
    );
  }

  return (
    <Screen justifyContent="center" alignItems="center">
      <ActivityIndicator />
    </Screen>
  );
};

export default DrawRoute;
