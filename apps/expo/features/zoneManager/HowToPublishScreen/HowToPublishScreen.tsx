import StepHowToPublish from "@features/zoneManager/components/StepHowToPublish";
import {
  ZoneManagerRoutes,
  ZoneManagerScreenProps,
} from "@features/zoneManager/Navigation/types";
import { FC } from "react";

type Props = ZoneManagerScreenProps<ZoneManagerRoutes.HowToPublish>;

const HowToPublishScreen: FC<Props> = ({ navigation }) => {
  return (
    <StepHowToPublish onNext={navigation.goBack} onNextButtonTitle="Volver" />
  );
};

export default HowToPublishScreen;
