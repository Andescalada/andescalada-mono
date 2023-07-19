import { ActivityIndicator, Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import RouteDrawer from "@features/routesManager/RouteDrawerScreen/RouteDrawer";
import parsedTopo from "@features/routesManager/utils/parsedTopos";
import { useGetTopoImage } from "@hooks/useTopoImage";
import constants from "@utils/constants";
import { FC, useMemo } from "react";

type Props =
  RoutesManagerScreenProps<RoutesManagerNavigationRoutes.RouteDrawer>;

const DrawRoute: FC<Props> = ({
  route: {
    params: { route: routeParams, topoId, zoneId },
  },
}) => {
  const { data } = trpc.topos.byId.useQuery({ topoId, zoneId });

  const topos = useMemo(
    () => parsedTopo(data, routeParams.id),
    [routeParams.id, data],
  );

  const { fileUrl, isImageLoaded, fitted } = useGetTopoImage({
    imageData: data?.image,
    imageQuality: constants.imageQuality,
  });

  if (topos && isImageLoaded) {
    return (
      <RouteDrawer
        fileUrl={fileUrl}
        height={fitted.height}
        width={fitted.width}
        scale={fitted.scale}
        topos={topos}
      />
    );
  }

  return (
    <Screen justifyContent="center" alignItems="center">
      <ActivityIndicator />
    </Screen>
  );
};

export default DrawRoute;
