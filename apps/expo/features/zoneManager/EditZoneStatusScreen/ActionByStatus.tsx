import { StatusSchema } from "@andescalada/db/zod";
import {
  A,
  Box,
  Button,
  Ionicons,
  Pressable,
  Text,
  TextFieldAccordion,
} from "@andescalada/ui";
import zoneStatus from "@utils/zoneStatus";
import { FC, useMemo, useState } from "react";
import { FadeIn, FadeOut } from "react-native-reanimated";

interface Props {
  message: string;
  setMessage: (message: string) => void;
  isLoading: boolean;
  disabled: boolean;
  onPress: () => void;
  status: typeof StatusSchema._type;
  visible: boolean;
}

const ActionByStatus: FC<Props> = ({
  message,
  setMessage,
  status,
  disabled,
  isLoading,
  onPress,
  visible,
}) => {
  const [showMore, setShowMore] = useState(false);

  const { about, nextStepTitle } = useMemo(() => zoneStatus(status), [status]);

  if (!visible) return <Box />;

  return (
    <A.Box entering={FadeIn} exiting={FadeOut}>
      {nextStepTitle && (
        <>
          <TextFieldAccordion
            label="Agregar mensaje"
            value={message}
            onChangeText={setMessage}
            marginVertical="s"
          />
          <Button
            marginTop="m"
            isLoading={isLoading}
            disabled={disabled}
            title={nextStepTitle}
            variant="info"
            padding="m"
            onPress={onPress}
          />
        </>
      )}
      <Pressable
        marginTop="s"
        flexDirection="row"
        alignItems="center"
        onPress={() => setShowMore((prev) => !prev)}
        justifyContent="center"
      >
        <Ionicons name="information-circle-sharp" size={20} />
        <Text variant="h4" marginLeft="s" textDecorationLine="underline">
          Sobre el siguiente paso
        </Text>
      </Pressable>
      {showMore && (
        <Text variant="p2R" textAlign="center">
          {about}
        </Text>
      )}
    </A.Box>
  );
};

export default ActionByStatus;
