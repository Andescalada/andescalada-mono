import { Screen } from "@andescalada/ui";
import ClassicAgreementCard from "@features/zoneAgreementManager/components/ClassicAgreementCard";
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
      >
        <ClassicAgreementCard
          id="2"
          title="Pagado"
          subTitle="Es necesario pagar para acceder a esta zona de escalada."
          iconName="paid-hands"
          marginBottom="xl"
        />
        <ClassicAgreementCard
          id="1"
          title="Libre"
          subTitle="No es necesario pagar para acceder a esta zona de escalada."
          iconName="shake-hands"
          marginBottom="xl"
        />
      </ClassicAgreementContainer>
    </Screen>
  );
};

export default PetsAgreementScreen;
