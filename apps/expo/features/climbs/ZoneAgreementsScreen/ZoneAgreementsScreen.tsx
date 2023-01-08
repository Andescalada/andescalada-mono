import { Box, Screen, Text } from "@andescalada/ui";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import AgreementsList from "@templates/AgreementsList";
import { FC } from "react";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.ZoneAgreements>;

const ZoneAgreementsScreen: FC<Props> = ({
  route: {
    params: { zoneName, zoneId },
  },
}) => {
  return (
    <Screen safeAreaDisabled padding="m">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text variant="h1">{zoneName}</Text>
      </Box>
      <AgreementsList zoneId={zoneId} toggleDescriptions />
    </Screen>
  );
};

export default ZoneAgreementsScreen;
