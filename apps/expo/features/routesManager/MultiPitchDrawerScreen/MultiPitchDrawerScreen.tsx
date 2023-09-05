import { pathToArray } from "@andescalada/climbs-drawer/utils";
import {
  ActivityIndicator,
  Button,
  Ionicons,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import MultiPitchDrawer from "@features/routesManager/MultiPitchDrawerScreen/MultiPitchDrawer";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import parsedTopo from "@features/routesManager/utils/parsedTopos";
import useToposById from "@hooks/offlineQueries/useToposById";
import useTopoImage from "@hooks/useTopoImage";
import constants from "@utils/constants";
import { FC, useMemo } from "react";

type Props =
  RoutesManagerScreenProps<RoutesManagerNavigationRoutes.MultiPitchDrawer>;

const MultiPitchDrawerScreen: FC<Props> = ({
  route: {
    params: { wallId, route: routeParams, topoId, zoneId, previousPitchId },
  },
  navigation,
}) => {
  const previousPitch =
    !!previousPitchId &&
    trpc.multiPitch.pitchById.useQuery({
      pitchId: previousPitchId,
      zoneId,
      topoId,
    });

  const previousPitchStart = useMemo(() => {
    if (!previousPitch) return undefined;

    const prevPath = previousPitch?.data?.Route.RoutePath[0]?.path;

    if (prevPath) {
      const arrayPath = pathToArray(prevPath).pop();
      if (!arrayPath) return undefined;
      return `${arrayPath[0]},${arrayPath[1]}`;
    }
    return undefined;
  }, [previousPitch]);

  const { data } = useToposById(
    { topoId, zoneId },
    {
      staleTime: 0,
    },
  );

  const topos = useMemo(
    () => parsedTopo(data, routeParams.id),
    [routeParams.id, data],
  );

  const { fileUrl, isImageLoaded, fitted } = useTopoImage({
    wallId,
    zoneId,
    imageQuality: constants.imageQuality,
  });

  if (!!previousPitch && !previousPitch.isLoading && !previousPitchStart) {
    return (
      <Screen justifyContent="center" alignItems="center" gap="l" padding="l">
        <Ionicons
          name="close-circle-outline"
          color="semantic.error"
          size={60}
        />
        <Text variant="p1R">No encontramos el largo anterior</Text>
        <Text>Primero debes dibujar el largo que viene antes de este</Text>
        <Button
          title="Volver"
          variant="info"
          padding="m"
          onPress={navigation.goBack}
        />
      </Screen>
    );
  }

  if (topos && isImageLoaded && (!previousPitchId || !!previousPitchStart)) {
    return (
      <MultiPitchDrawer
        topos={topos}
        fileUrl={fileUrl}
        height={fitted.height}
        width={fitted.width}
        scale={fitted.scale}
      />
    );
  }

  return (
    <Screen justifyContent="center" alignItems="center">
      <ActivityIndicator />
    </Screen>
  );
};

export default MultiPitchDrawerScreen;
