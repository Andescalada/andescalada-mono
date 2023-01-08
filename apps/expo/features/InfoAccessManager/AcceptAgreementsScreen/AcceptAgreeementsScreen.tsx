import { Box, Screen, Text } from "@andescalada/ui";
import {
  InfoAccessManagerRoutes,
  InfoAccessManagerScreenProps,
} from "@features/InfoAccessManager/Navigation/types";
import AgreementsList from "@templates/AgreementsList";
import { FC } from "react";

type Props =
  InfoAccessManagerScreenProps<InfoAccessManagerRoutes.AcceptAgreements>;

const AcceptAgreementsScreen: FC<Props> = ({
  route: {
    params: { zoneId },
  },
}) => {
  return (
    <Screen>
      <AgreementsList
        zoneId={zoneId}
        toggleDescriptions
        ListHeaderComponent={Header}
      />
    </Screen>
  );
};

export default AcceptAgreementsScreen;

const Header = () => (
  <Box>
    <Text variant="h1">Acuerdos</Text>
    <Text variant="p1R">
      Estos son los acuerdos que se han definido para esta zona.
    </Text>
    <Text variant="p1R">
      Es muy importante que los leas y los aceptes para poder acceder a guía de
      la zona.
    </Text>
  </Box>
);
