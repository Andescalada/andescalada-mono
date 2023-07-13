import { Screen, Text } from "@andescalada/ui";
import { FC } from "react";

interface Props {
  onNext: () => void;
}

const StepWelcome: FC<Props> = (props) => {
  return (
    <Screen>
      <Text>Bienvenido al primer concurso de documentación</Text>
    </Screen>
  );
};

export default StepWelcome;
