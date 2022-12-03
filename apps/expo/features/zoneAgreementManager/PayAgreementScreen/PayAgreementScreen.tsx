import { ClassicAgreementSchema } from "@andescalada/db/zod";
import { Screen } from "@andescalada/ui";
import ClassicAgreementCardList from "@features/zoneAgreementManager/components/ClassicAgreementCardList";
import ClassicAgreementContainer from "@features/zoneAgreementManager/components/ClassicAgreementContainer";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import { FC, useState } from "react";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.PayAgreement>;

const PetsAgreementScreen: FC<Props> = ({ navigation }) => {
  const [selected, setSelected] = useState<string>();
  return (
    <Screen safeAreaDisabled>
      <ClassicAgreementContainer
        title="Sobre el acceso:"
        value={selected}
        onChange={(v) => setSelected(v as string)}
        onSubmit={(id) =>
          navigation.navigate(ZoneAgreementsRoutes.ToiletAgreement)
        }
        classic={ClassicAgreementSchema.Enum.Payment}
      >
        <ClassicAgreementCardList
          classic={ClassicAgreementSchema.Enum.Payment}
        />
      </ClassicAgreementContainer>
    </Screen>
  );
};

export default PetsAgreementScreen;
