import infoAccessAssets from "@andescalada/common-assets/infoAccessAssets";
import {
  InfoAccessSchema,
  RequestStatusSchema,
  StatusSchema,
} from "@andescalada/db/zod";
import {
  ActivityIndicator,
  Box,
  Button,
  Icon,
  Screen,
  ScrollView,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRouteProps,
  ClimbsNavigationRoutes,
} from "@features/climbs/Navigation/types";
import ZoneHeader from "@features/climbs/ZoneScreen/ZoneHeader";
import { InfoAccessManagerRoutes } from "@features/InfoAccessManager/Navigation/types";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useRoute } from "@react-navigation/native";
import { onlineManager } from "@tanstack/react-query";
import { skipAgreementsIntro } from "@templates/AgreementsIntro/AgreementsIntro";
import emptyArray from "@utils/emptyArray";
import { useAtom } from "jotai";
import { FC, ReactElement, useCallback, useMemo } from "react";

interface Props {
  children: ReactElement;
}

const SectorsGateway: FC<Props> = ({ children }) => {
  const {
    params: { zoneId, zoneName },
  } = useRoute<ClimbsNavigationRouteProps<ClimbsNavigationRoutes.Zone>>();

  const {
    data: {
      ZoneAccessRequest,
      UserZoneAgreementHistory = [],
      infoAccess,
      hasAccess,
      currentStatus,
    } = {},
    isLoading,
    isFetching,
    isError,
    refetch,
  } = trpc.zones.allSectors.useQuery({ zoneId });

  const requestStatus = useMemo(() => {
    if (emptyArray(ZoneAccessRequest)) return undefined;
    return ZoneAccessRequest?.[0].status;
  }, [ZoneAccessRequest]);

  const rootNavigation = useRootNavigation();

  const { permission, getPermissions } = usePermissions({ zoneId });

  const refresh = useRefresh(() => {
    getPermissions();
    refetch();
  }, isFetching && !isLoading);

  const hasNotAcceptedAgreement = useMemo(
    () =>
      hasAccess &&
      (requestStatus === RequestStatusSchema.enum.Accepted ||
        infoAccess === InfoAccessSchema.enum.Public) &&
      !permission?.has("EditZoneAgreements") &&
      !UserZoneAgreementHistory[0]?.hasAgreed,
    [
      UserZoneAgreementHistory,
      hasAccess,
      infoAccess,
      permission,
      requestStatus,
    ],
  );

  const [skip] = useAtom(skipAgreementsIntro);

  const navigateToAgreements = useCallback(() => {
    if (skip) {
      rootNavigation.navigate(RootNavigationRoutes.InfoAccessManager, {
        screen: InfoAccessManagerRoutes.AcceptAgreements,
        params: { zoneId, zoneName },
      });
      return;
    }
    rootNavigation.navigate(RootNavigationRoutes.InfoAccessManager, {
      screen: InfoAccessManagerRoutes.AgreementsIntro,
      params: { zoneId, zoneName },
    });
  }, [rootNavigation, skip, zoneId, zoneName]);

  if (!onlineManager.isOnline()) return children;

  if (isError) {
    return (
      <Screen safeAreaDisabled padding="m">
        <Box marginBottom="s" marginTop="xl">
          <Icon name="eyes-color" size={50} />
          <Text variant="h1" fontFamily="Rubik-700">
            Hubo un error!
          </Text>
        </Box>
        <Text variant="p2R">Estas cosas le pasan a l@s mejores</Text>
        <Text variant="p2R">
          Intenta reiniciar la app o puedes contactarnos si persiste.
        </Text>
      </Screen>
    );
  }

  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size={"large"} />
      </Screen>
    );

  if (currentStatus !== StatusSchema.Enum.Published && !hasAccess) {
    return (
      <Screen safeAreaDisabled padding="m">
        <Box marginBottom="s" marginTop="xl">
          <Icon name="eyes-color" size={50} />
          <Text variant="h1" fontFamily="Rubik-700">
            Zona no publicada
          </Text>
        </Box>
        <Text variant="p2R">
          Esta zona de escalada no se encuentra publicada para que otros
          usuarios puedan acceder.
        </Text>
      </Screen>
    );
  }
  if (hasNotAcceptedAgreement) {
    return (
      <Screen safeAreaDisabled>
        <ScrollView refreshControl={refresh}>
          <ZoneHeader />
          <Box flex={1} justifyContent={"flex-start"} marginTop="m">
            <Box flex={1 / 2} justifyContent="center">
              <Text variant="h2" marginBottom="l">
                Aceptar acuerdos
              </Text>
              <Text variant="p1R" marginBottom="m">
                Para poder ver los sectores de esta zona, debes revisar y
                aceptar los acuerdos.
              </Text>
            </Box>
            <Button
              variant="info"
              title="Continuar"
              alignSelf="center"
              marginTop="l"
              onPress={navigateToAgreements}
            />
          </Box>
        </ScrollView>
      </Screen>
    );
  }

  if (!hasAccess && !!infoAccess) {
    const { requestTitle, requestDescription } = infoAccessAssets[infoAccess];

    return (
      <Screen safeAreaDisabled>
        <ScrollView refreshControl={refresh}>
          <ZoneHeader />
          <Box flex={1} justifyContent={"flex-start"} marginTop="m">
            <Box flex={1 / 3} justifyContent="center">
              <Text variant="h2" marginBottom="l">
                {requestTitle}
              </Text>
              <Text variant="p1R" marginBottom="m">
                No tienes permiso para ver esta zona
              </Text>
              <Text marginBottom="s" variant="p3R">
                {requestDescription}
              </Text>
            </Box>
            <Button
              variant={requestStatus === "Pending" ? "transparent" : "info"}
              title={
                requestStatus === "Pending" ? "Pendiente" : "Solicitar acceso"
              }
              alignSelf="center"
              marginTop="l"
              disabled={requestStatus === "Pending"}
              onPress={navigateToAgreements}
            />
          </Box>
        </ScrollView>
      </Screen>
    );
  }

  return children;
};

export default SectorsGateway;
