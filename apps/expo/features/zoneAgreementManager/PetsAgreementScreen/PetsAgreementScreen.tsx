import { Screen, Text } from "@andescalada/ui";
import ClassicAgreementCard from "@features/zoneAgreementManager/components/ClassicAgreementCard";
import ClassicAgreementContainer from "@features/zoneAgreementManager/components/ClassicAgreementContainer";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import { FC, useState } from "react";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.PetsAgreement>;

const PetsAgreementScreen: FC<Props> = (props) => {
  const [selected, setSelected] = useState<string>();
  return (
    <Screen safeAreaDisabled padding="m">
      <Text variant="h2">Sobre mascotas:</Text>
      <ClassicAgreementContainer
        value={selected}
        onChange={(v) => setSelected(v as string)}
        onSubmit={(id) => console.log(id)}
      >
        <ClassicAgreementCard
          id="2"
          title="Se permiten mascotas"
          subTitle="Tus mascotas son bienvenidas en esta zona de escalada. Se responsable y respetuoso."
          iconName="dog"
          marginBottom="xl"
        />
        <ClassicAgreementCard
          id="1"
          title="No se permiten mascotas"
          subTitle=" Lamentamos que tus mascotas no puedan acompañarte en esta zona de
        escalada."
          iconName="no-dog"
          marginBottom="xl"
        />
      </ClassicAgreementContainer>
    </Screen>
  );
};

export default PetsAgreementScreen;
