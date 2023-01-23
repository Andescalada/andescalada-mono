import { Screen, Text } from "@andescalada/ui";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import { FC } from "react";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.AddAgreements>;

const AddAgreementsScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text></Text>
    </Screen>
  );
};

export default AddAgreementsScreen;
