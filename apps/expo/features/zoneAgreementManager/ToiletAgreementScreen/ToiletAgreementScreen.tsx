import { ClassicAgreementSchema } from "@andescalada/db/zod";
import { Screen } from "@andescalada/ui";
import ClassicAgreementCardList from "@features/zoneAgreementManager/components/ClassicAgreementCardList";
import ClassicAgreementContainer from "@features/zoneAgreementManager/components/ClassicAgreementContainer";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import { FC, useState } from "react";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.ToiletAgreement>;

const PetsAgreementScreen: FC<Props> = ({ navigation }) => {
  const [selected, setSelected] = useState<string>();
  return (
    <Screen safeAreaDisabled>
      <ClassicAgreementContainer
        title="Sobre donde ir al baño:"
        value={selected}
        onChange={(v) => setSelected(v as string)}
        onSubmit={(id) => console.log(id)}
        classic={ClassicAgreementSchema.Enum.Toilet}
      >
        <ClassicAgreementCardList
          classic={ClassicAgreementSchema.Enum.Toilet}
        />
      </ClassicAgreementContainer>
    </Screen>
  );
};

export default PetsAgreementScreen;
