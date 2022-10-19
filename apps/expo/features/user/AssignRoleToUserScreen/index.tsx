import { Box, Pressable, Screen, Text } from "@andescalada/ui";
import FindUser from "@features/user/FindUser";
import FindZone from "@features/user/FindZone";
import BottomSheet from "@gorhom/bottom-sheet";
import { FC, useRef, useState } from "react";
import { Keyboard } from "react-native";

interface Props {
  p?: string;
}

const AssignRoleToUserScreen: FC<Props> = (props) => {
  const findUserRef = useRef<BottomSheet>(null);
  const findZoneRef = useRef<BottomSheet>(null);
  const [username, setUsername] = useState("");
  const [zone, setZone] = useState("");
  return (
    <Screen safeAreaDisabled padding="m">
      <Box marginTop="m">
        <Text variant="p1R" marginBottom="s">
          Usuario
        </Text>
        <Pressable
          borderRadius={4}
          backgroundColor="filledTextInputVariantBackground"
          height={40}
          onPress={() => {
            Keyboard.dismiss();
            findUserRef.current?.expand();
          }}
          justifyContent="center"
          paddingLeft="s"
        >
          <Text
            variant="p1R"
            color={username ? "grayscale.black" : "grayscale.400"}
          >
            {username || "Buscar usuario"}
          </Text>
        </Pressable>
      </Box>
      <Box marginTop="m">
        <Text variant="p1R" marginBottom="s">
          Zona
        </Text>
        <Pressable
          borderRadius={4}
          backgroundColor="filledTextInputVariantBackground"
          height={40}
          onPress={() => {
            Keyboard.dismiss();
            findZoneRef.current?.expand();
          }}
          justifyContent="center"
          paddingLeft="s"
        >
          <Text
            variant="p1R"
            color={zone ? "grayscale.black" : "grayscale.400"}
          >
            {zone || "Buscar zona"}
          </Text>
        </Pressable>
      </Box>
      <FindUser ref={findUserRef} onSetUser={setUsername} />
      <FindZone ref={findZoneRef} onSetZone={setZone} />
    </Screen>
  );
};

export default AssignRoleToUserScreen;
