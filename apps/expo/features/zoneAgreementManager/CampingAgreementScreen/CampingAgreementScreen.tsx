import { ClassicAgreementSchema } from "@andescalada/db/zod";
import { Screen } from "@andescalada/ui";
import ClassicAgreementCardList from "@features/zoneAgreementManager/components/ClassicAgreementCardList";
import ClassicAgreementContainer from "@features/zoneAgreementManager/components/ClassicAgreementContainer";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import { FC, useState } from "react";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.CampingAgreement>;

const PetsAgreementScreen: FC<Props> = ({ navigation }) => {
  const [selected, setSelected] = useState<string>();
  return (
    <Screen safeAreaDisabled>
      <ClassicAgreementContainer
        title="Sobre acampar:"
        value={selected}
        onChange={(v) => setSelected(v as string)}
        onSubmit={(id) =>
          navigation.navigate(ZoneAgreementsRoutes.FireAgreement)
        }
        classic={ClassicAgreementSchema.Enum.Camping}
      >
        <ClassicAgreementCardList
          classic={ClassicAgreementSchema.Enum.Camping}
        />
      </ClassicAgreementContainer>
    </Screen>
  );
};

export default PetsAgreementScreen;
