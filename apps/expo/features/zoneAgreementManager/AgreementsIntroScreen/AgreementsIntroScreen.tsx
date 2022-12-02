import { A, Box, Button, Screen, Text } from "@andescalada/ui";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import { FC } from "react";
import { SlideInDown } from "react-native-reanimated";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.AgreementsIntro>;

const DELAY = 1800;

const AgreementsIntroScreen: FC<Props> = ({ navigation }) => {
  return (
    <Screen backgroundColor="brand.primaryA">
      <Box padding="m">
        <Text variant="h1">Acuerdos</Text>
      </Box>
      <Box flex={1}>
        <A.Box
          flex={1}
          backgroundColor="brand.secondaryA"
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          entering={SlideInDown.delay(DELAY / 2)}
        >
          <Box padding="m">
            <Text variant="h2" color="grayscale.black">
              Son reglas de convivencia entre la comunidad de escalada,
              comunidad local y biodiversidad de la zona.
            </Text>
          </Box>
          <A.Box
            marginTop="m"
            flex={1}
            backgroundColor="brand.primaryB"
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            entering={SlideInDown.delay(DELAY * 2)}
          >
            <Box padding="m">
              <Text variant="p1B">
                Cada acuerdo tiene un grado de relevancia
              </Text>

              <Box padding="s">
                <Text variant="p1B">Crítico</Text>
                <Text variant="p2R">
                  El acceso a la zona depende directamente de este acuerdo.
                </Text>
              </Box>
              <Box padding="s">
                <Text variant="p1B">Importante</Text>
                <Text variant="p2R">
                  La buena convivencia depende de este acuerdo.
                </Text>
              </Box>
              <Box padding="s">
                <Text variant="p1B">Recomendado</Text>
                <Text variant="p2R">
                  Cumplir este acuerdo ayuda a la buena convivencia.
                </Text>
              </Box>
            </Box>
            <A.Box
              marginTop="s"
              flex={1}
              backgroundColor="brand.secondaryB"
              borderTopLeftRadius={10}
              borderTopRightRadius={10}
              entering={SlideInDown.delay(DELAY * 3)}
            >
              <Box padding="m">
                <Text variant="p1R" color="grayscale.black">
                  Se recomienda que los acuerdos sean claros y concisos, y que
                  se puedan resumir en una frase.
                </Text>
              </Box>
              <A.Box
                marginTop="s"
                flex={1}
                backgroundColor="brand.primaryA"
                borderTopLeftRadius={10}
                borderTopRightRadius={10}
                entering={SlideInDown.delay(DELAY * 4)}
              >
                <Box padding="m" paddingHorizontal="xxl">
                  <Button variant="transparent" title="Continuar" />
                </Box>
              </A.Box>
            </A.Box>
          </A.Box>
        </A.Box>
      </Box>
    </Screen>
  );
};

export default AgreementsIntroScreen;
