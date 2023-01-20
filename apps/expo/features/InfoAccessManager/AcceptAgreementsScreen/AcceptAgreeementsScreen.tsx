import { BackButton, Box, Button, Screen, Text } from "@andescalada/ui";
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
  const agreements = trpc.zones.agreementsList.useQuery({ zoneId });

  const requestAccess = trpc.zoneAccess.requestZoneAccess.useMutation({
    onSuccess: () => {
      rootNavigation.navigate(RootNavigationRoutes.Climbs, {
        screen: ClimbsNavigationRoutes.Zone,
        params: { zoneId, zoneName },
      });
    },
  });

  const rejectAgreements = trpc.zoneAccess.rejectAgreements.useMutation({
    onMutate: () => {
      rootNavigation.navigate(RootNavigationRoutes.Climbs, {
        screen: ClimbsNavigationRoutes.Zone,
        params: { zoneId, zoneName },
      });
    },
  });

  const handleRequestAccess = () => {
    requestAccess.mutate({
      zoneId,
      agreementRecord: stringify(agreements.data || "No agreements"),
    });
  };

  const handleRejection = () => {
    rejectAgreements.mutate({
      zoneId,
      agreementRecord: stringify(agreements.data || "No agreements"),
    });
  };

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
            title="Solicitar acceso"
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
            onPress={handleRejection}
          />
          <Button
            variant="success"
            title="Aceptar"
            flex={1}
            marginLeft="s"
            onPress={handleRequestAccess}
          />
        </Box>
      )}
    </Screen>
  );
};

export default AcceptAgreementsScreen;
