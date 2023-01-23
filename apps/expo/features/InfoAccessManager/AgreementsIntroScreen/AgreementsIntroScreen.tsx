import { Screen } from "@andescalada/ui";
import {
  InfoAccessManagerRoutes,
  InfoAccessManagerScreenProps,
} from "@features/InfoAccessManager/Navigation/types";
import AgreementsIntro from "@templates/AgreementsIntro";
import { FC } from "react";

type Props =
  InfoAccessManagerScreenProps<InfoAccessManagerRoutes.AgreementsIntro>;

const AgreementsIntroScreen: FC<Props> = ({
  navigation,
  route: { params },
}) => {
  return (
    <Screen backgroundColor="brand.primaryA">
      <AgreementsIntro
        showSkip
        onContinue={() =>
          navigation.navigate(InfoAccessManagerRoutes.AcceptAgreements, params)
        }
      />
    </Screen>
  );
};

export default AgreementsIntroScreen;
