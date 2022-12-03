import { Screen, Text } from "@andescalada/ui";
import ClassicAgreementCard from "@features/zoneAgreementManager/components/ClassicAgreementCard";
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
    <Screen safeAreaDisabled padding="m">
      <Text variant="h2">Sobre donde ir al baño:</Text>
      <ClassicAgreementContainer
        value={selected}
        onChange={(v) => setSelected(v as string)}
        onSubmit={(id) => console.log(id)}
      >
        <ClassicAgreementCard
          id="2"
          title="Usa el baño habilitado"
          subTitle="Existe un baño habilitado para que hagas tus necesidades."
          iconName="toilet"
          marginBottom="xl"
        />
        <ClassicAgreementCard
          id="1"
          title="No dejes rastro"
          subTitle="No existe un baño habilitado, por favor no dejes rastro. Entierra o llévate tus caca."
          iconName="poop-bag"
          marginBottom="xl"
        />
      </ClassicAgreementContainer>
    </Screen>
  );
};

export default PetsAgreementScreen;
