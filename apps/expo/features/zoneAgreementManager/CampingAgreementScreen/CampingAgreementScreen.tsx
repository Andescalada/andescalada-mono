import { Screen } from "@andescalada/ui";
import ClassicAgreementCard from "@features/zoneAgreementManager/components/ClassicAgreementCard";
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
      >
        <ClassicAgreementCard
          id="2"
          title="No se permite acampar"
          subTitle="No esta permitido acampar en esta zona de escalada"
          iconName="no-camping"
          marginBottom="xl"
        />
        <ClassicAgreementCard
          id="1"
          title="Permitido acampar"
          subTitle="Es posible acampar en esta zona de escalada respetando las reglas."
          iconName="camping"
          marginBottom="xl"
        />
      </ClassicAgreementContainer>
    </Screen>
  );
};

export default PetsAgreementScreen;
