import { Screen, Text } from "@andescalada/ui";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import { FC } from "react";

type Props =
  ZoneAgreementsScreenProps<ZoneAgreementsRoutes.SelectClassicAgreement>;

const SelectClassicAgreementScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text></Text>
    </Screen>
  );
};

export default SelectClassicAgreementScreen;
