import { Screen, Text } from "@andescalada/ui";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import { FC } from "react";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.AgreementsIntro>;

const AgreementsIntroScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text variant="h1">Acuerdos</Text>
    </Screen>
  );
};

export default AgreementsIntroScreen;
