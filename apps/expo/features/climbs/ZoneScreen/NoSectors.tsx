import { InfoAccessSchema } from "@andescalada/db/zod";
import { ActivityIndicator, Box, Button, Screen, Text } from "@andescalada/ui";
import {
  ClimbsNavigationRouteProps,
  ClimbsNavigationRoutes,
} from "@features/climbs/Navigation/types";
import { InfoAccessManagerRoutes } from "@features/InfoAccessManager/Navigation/types";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useRoute } from "@react-navigation/native";
import infoAccessAssets from "@utils/infoAccessAssets";
import { useMemo } from "react";

interface Props {
  isLoading: boolean;
  isError: boolean;
  hasAccess: boolean;
  infoAccess: keyof typeof InfoAccessSchema.Enum;
}

const NoSectors = ({ isLoading, hasAccess, infoAccess, isError }: Props) => {
  const { requestTitle, requestDescription } = useMemo(
    () => !!infoAccess && infoAccessAssets[infoAccess],
    [infoAccess],
  );

  const {
    params: { zoneId, zoneName },
  } = useRoute<ClimbsNavigationRouteProps<ClimbsNavigationRoutes.Zone>>();

  const rootNavigation = useRootNavigation();

  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size={"large"} />
      </Screen>
    );

  if (!hasAccess && !isError)
    return (
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
          variant="info"
          title="Solicitar acceso"
          alignSelf="center"
          marginTop="l"
          onPress={() =>
            rootNavigation.navigate(RootNavigationRoutes.InfoAccessManager, {
              screen: InfoAccessManagerRoutes.AcceptAgreements,
              params: { zoneId, zoneName },
            })
          }
        />
      </Box>
    );

  return (
    <Box flex={1} justifyContent="center" alignItems="center" marginTop="xxxl">
      <Text variant={"h3"}>Sin sectores</Text>
    </Box>
  );
};

export default NoSectors;
