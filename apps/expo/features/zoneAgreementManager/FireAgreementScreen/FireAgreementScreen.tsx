import { ClassicAgreementSchema } from "@andescalada/db/zod";
import { Screen } from "@andescalada/ui";
import ClassicAgreementCardList from "@features/zoneAgreementManager/components/ClassicAgreementCardList";
import ClassicAgreementContainer from "@features/zoneAgreementManager/components/ClassicAgreementContainer";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import { FC, useState } from "react";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.FireAgreement>;

const PetsAgreementScreen: FC<Props> = ({ navigation }) => {
  const [selected, setSelected] = useState<string>();
  return (
    <Screen safeAreaDisabled>
      <ClassicAgreementContainer
        title="Sobre hacer fuego:"
        value={selected}
        onChange={(v) => setSelected(v as string)}
        onSubmit={(id) =>
          navigation.navigate(ZoneAgreementsRoutes.PayAgreement)
        }
        classic={ClassicAgreementSchema.Enum.Fire}
      >
        <ClassicAgreementCardList classic={ClassicAgreementSchema.Enum.Fire} />
      </ClassicAgreementContainer>
    </Screen>
  );
};

export default PetsAgreementScreen;
