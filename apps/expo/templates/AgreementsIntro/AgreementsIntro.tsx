import { A, Box, Button, Ionicons, Pressable, Text } from "@andescalada/ui";
import { atomWithMMKV, Storage } from "@utils/mmkv/storage";
import { useAtom } from "jotai";
import { ComponentProps, FC } from "react";
import { SlideInDown } from "react-native-reanimated";

interface Props extends ComponentProps<typeof Box> {
  onContinue: () => void;
  showSkip?: boolean;
}

const DELAY = 1800;

export const skipAgreementsIntro = atomWithMMKV(
  Storage.SKIP_AGREEMENTS_INTRO,
  false,
);

const AgreementsIntro: FC<Props> = ({
  onContinue,
  showSkip = false,
  ...props
}) => {
  const [skip, setSkip] = useAtom(skipAgreementsIntro);
  return (
    <Box flex={1} backgroundColor="brand.primaryA" {...props}>
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
            marginTop="s"
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
              marginTop="minusL"
              minHeight={500}
              paddingBottom="s"
              flex={1}
              backgroundColor="brand.secondaryB"
              borderTopLeftRadius={10}
              borderTopRightRadius={10}
              entering={SlideInDown.delay(DELAY * 3)}
            >
              <Box padding="m" paddingHorizontal="xxl">
                {showSkip && (
                  <Pressable
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    marginBottom="s"
                    onPress={() => setSkip((prev) => !prev)}
                  >
                    <Ionicons
                      name={skip ? "checkbox" : "stop-outline"}
                      size={25}
                    />
                    <Text variant="p3R" marginLeft="s">
                      No mostrar más
                    </Text>
                  </Pressable>
                )}
                <Button
                  variant="transparent"
                  title="Continuar"
                  onPress={onContinue}
                />
              </Box>
            </A.Box>
          </A.Box>
        </A.Box>
      </Box>
    </Box>
  );
};

export default AgreementsIntro;
