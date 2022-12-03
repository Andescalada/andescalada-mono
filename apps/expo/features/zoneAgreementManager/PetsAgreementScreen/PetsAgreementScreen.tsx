import { ClassicAgreementSchema } from "@andescalada/db/zod";
import { Screen } from "@andescalada/ui";
import ClassicAgreementCardList from "@features/zoneAgreementManager/components/ClassicAgreementCardList";
import ClassicAgreementContainer from "@features/zoneAgreementManager/components/ClassicAgreementContainer";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import { FC, useState } from "react";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.PetsAgreement>;

const PetsAgreementScreen: FC<Props> = ({ navigation }) => {
  const [selected, setSelected] = useState<string>();

  return (
    <Screen safeAreaDisabled>
      <ClassicAgreementContainer
        title="Sobre mascotas:"
        value={selected}
        onChange={(v) => setSelected(v as string)}
        onSubmit={(id) =>
          navigation.navigate(ZoneAgreementsRoutes.CampingAgreement)
        }
        classic={ClassicAgreementSchema.Enum.Pets}
      >
        <ClassicAgreementCardList classic={ClassicAgreementSchema.Enum.Pets} />
      </ClassicAgreementContainer>
    </Screen>
  );
};

export default PetsAgreementScreen;
