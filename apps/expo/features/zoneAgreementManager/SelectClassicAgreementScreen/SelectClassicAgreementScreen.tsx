import { Screen } from "@andescalada/ui";
import ClassicAgreementCardList from "@features/zoneAgreementManager/components/ClassicAgreementCardList";
import ClassicAgreementContainer from "@features/zoneAgreementManager/components/ClassicAgreementContainer";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import classicAgreementAssets from "@utils/classicAgreementAssets";
import { FC } from "react";

type Props =
  ZoneAgreementsScreenProps<ZoneAgreementsRoutes.SelectClassicAgreement>;

const SelectClassicAgreementScreen: FC<Props> = ({
  route: {
    params: { classicAgreement, zoneId },
  },
  navigation,
}) => {
  return (
    <Screen safeAreaDisabled>
      <ClassicAgreementContainer
        title={`${classicAgreementAssets[classicAgreement].title}:`}
        zoneId={zoneId}
        onSubmit={navigation.goBack}
        classic={classicAgreement}
      >
        <ClassicAgreementCardList classic={classicAgreement} />
      </ClassicAgreementContainer>
    </Screen>
  );
};

export default SelectClassicAgreementScreen;
