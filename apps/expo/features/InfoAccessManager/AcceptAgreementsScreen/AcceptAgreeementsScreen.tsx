import { InfoAccessSchema, RequestStatusSchema } from "@andescalada/db/zod";
import {
  ActivityIndicator,
  BackButton,
  Box,
  Button,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import {
  InfoAccessManagerRoutes,
  InfoAccessManagerScreenProps,
} from "@features/InfoAccessManager/Navigation/types";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import AgreementsList from "@templates/AgreementsList";
import { FC } from "react";
import { stringify } from "superjson";

type Props =
  InfoAccessManagerScreenProps<InfoAccessManagerRoutes.AcceptAgreements>;

const AcceptAgreementsScreen: FC<Props> = ({
  route: {
    params: { zoneId, zoneName },
  },
}) => {
  const rootNavigation = useRootNavigation();
  const utils = trpc.useContext();
  const agreements = trpc.agreements.listByZone.useQuery({ zoneId });
  const accessStatus = trpc.zoneAccess.userLatestAccessStatus.useQuery({
    zoneId,
  });

  const zone = trpc.zones.allSectors.useQuery({ zoneId });

  const requestAccess = trpc.zoneAccess.requestZoneAccess.useMutation({
    onSuccess: () => {
      rootNavigation.navigate(RootNavigationRoutes.Climbs, {
        screen: ClimbsNavigationRoutes.Zone,
        params: { zoneId, zoneName },
      });
      utils.zones.allSectors.invalidate({ zoneId });
    },
  });

  const respondAgreements = trpc.zoneAccess.respondAgreement.useMutation({
    onMutate: ({ hasAgreed }) => {
      if (!hasAgreed)
        rootNavigation.navigate(RootNavigationRoutes.Climbs, {
          screen: ClimbsNavigationRoutes.Zone,
          params: { zoneId, zoneName },
        });
    },
    onSuccess: () => {
      rootNavigation.navigate(RootNavigationRoutes.Climbs, {
        screen: ClimbsNavigationRoutes.Zone,
        params: { zoneId, zoneName },
      });
      utils.zones.allSectors.invalidate({ zoneId });
    },
  });

  const handleRequestAccess = () => {
    if (
      accessStatus.data?.status === RequestStatusSchema.enum.Accepted ||
      zone.data?.infoAccess === InfoAccessSchema.enum.Public
    ) {
      respondAgreements.mutate({
        zoneId,
        agreementRecord: stringify(agreements.data || "No agreements"),
        hasAgreed: true,
      });
      return;
    }
    requestAccess.mutate({
      zoneId,
      agreementRecord: stringify(agreements.data || "No agreements"),
    });
  };

  const handleRejection = () => {
    respondAgreements.mutate({
      zoneId,
      agreementRecord: stringify(agreements.data || "No agreements"),
      hasAgreed: false,
    });
  };

  if (agreements.isLoading || accessStatus.isLoading)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    );

  if (!agreements.data || agreements.data.length === 0)
    return (
      <Screen padding="m">
        <Box flexDirection="row">
          <BackButton
            onPress={() =>
              rootNavigation.navigate(RootNavigationRoutes.Climbs, {
                screen: ClimbsNavigationRoutes.Zone,
                params: { zoneId, zoneName },
              })
            }
          />
          <Text variant="h1" marginLeft="m">
            {zoneName}
          </Text>
        </Box>
        <Box marginTop="xxxl">
          <Text variant="h2" textAlign="center" marginBottom="l">
            No hay acuerdos definidos para esta zona
          </Text>
          <Text variant="p2R" textAlign="center" marginBottom="l">
            De todas formas recuerda ser consiente y amable con la comunidad
            local y la biodiversidad.
          </Text>
          <Button
            variant="success"
            title={
              accessStatus.data?.status === RequestStatusSchema.enum.Pending
                ? "Solicitar acceso"
                : "Aceptar"
            }
            isLoading={requestAccess.isLoading || respondAgreements.isLoading}
            marginLeft="s"
            onPress={handleRequestAccess}
          />
        </Box>
      </Screen>
    );

  return (
    <Screen padding="m">
      <Box flexDirection="row">
        <BackButton
          onPress={() =>
            rootNavigation.navigate(RootNavigationRoutes.Climbs, {
              screen: ClimbsNavigationRoutes.Zone,
              params: { zoneId, zoneName },
            })
          }
        />
        <Text variant="h1" marginLeft="m">
          {zoneName}
        </Text>
      </Box>
      <AgreementsList zoneId={zoneId} toggleDescriptions />
      {agreements.data && (
        <Box flexDirection="row" marginVertical="l">
          <Button
            variant="warning"
            title="No gracias"
            flex={1}
            marginRight="s"
            isLoading={respondAgreements.isLoading}
            onPress={handleRejection}
          />
          <Button
            variant="success"
            title="Aceptar"
            flex={1}
            marginLeft="s"
            isLoading={requestAccess.isLoading || respondAgreements.isLoading}
            onPress={handleRequestAccess}
          />
        </Box>
      )}
    </Screen>
  );
};

export default AcceptAgreementsScreen;
