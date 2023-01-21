import { InfoAccessSchema, RequestStatusSchema } from "@andescalada/db/zod";
import {
  ActivityIndicator,
  Box,
  Button,
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
import infoAccessAssets from "@utils/infoAccessAssets";
import { FC, ReactElement, useMemo } from "react";

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
    } = {},
    isLoading,
    isError,
    isFetching,
    refetch,
  } = trpc.zones.allSectors.useQuery({ zoneId });

  const requestStatus = useMemo(() => {
    if (ZoneAccessRequest?.length === 0) return undefined;
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
      !isLoading &&
      hasAccess &&
      !isError &&
      (requestStatus === RequestStatusSchema.enum.Accepted ||
        infoAccess === InfoAccessSchema.enum.Public) &&
      !permission?.has("EditZoneAgreements") &&
      !UserZoneAgreementHistory[0]?.hasAgreed,
    [
      UserZoneAgreementHistory,
      hasAccess,
      infoAccess,
      isError,
      isLoading,
      permission,
      requestStatus,
    ],
  );

  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size={"large"} />
      </Screen>
    );

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
              onPress={() =>
                rootNavigation.navigate(
                  RootNavigationRoutes.InfoAccessManager,
                  {
                    screen: InfoAccessManagerRoutes.AgreementsIntro,
                    params: { zoneId, zoneName },
                  },
                )
              }
            />
          </Box>
        </ScrollView>
      </Screen>
    );
  }

  if (!hasAccess && !isError && !!infoAccess) {
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
              onPress={() =>
                rootNavigation.navigate(
                  RootNavigationRoutes.InfoAccessManager,
                  {
                    screen: InfoAccessManagerRoutes.AgreementsIntro,
                    params: { zoneId, zoneName },
                  },
                )
              }
            />
          </Box>
        </ScrollView>
      </Screen>
    );
  }

  return children;
};

export default SectorsGateway;
