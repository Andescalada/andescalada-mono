import {
  Box,
  Button,
  Pressable,
  Screen,
  SemanticButton,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  InfoAccessManagerRoutes,
  InfoAccessManagerScreenProps,
} from "@features/InfoAccessManager/Navigation/types";
import FindUser, { UserOutput } from "@features/user/FindUser";
import BottomSheet from "@gorhom/bottom-sheet";
import { isAndroid } from "@utils/platform";
import { FC, useRef, useState } from "react";
import { Keyboard } from "react-native";

type Props =
  InfoAccessManagerScreenProps<InfoAccessManagerRoutes.InviteUserToZoneScreen>;

const InviteUserToZoneScreen: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId },
  },
}) => {
  const findUserRef = useRef<BottomSheet>(null);
  const [user, setUser] = useState<UserOutput>();
  const utils = trpc.useContext();
  const acceptAccess = trpc.zoneAccess.approveZoneAccess.useMutation({
    onSuccess: () => {
      navigation.goBack();
      utils.zones.usersByRole.invalidate({
        roles: ["Member", "Reader"],
        zoneId,
      });
    },
  });

  const onInvite = () => {
    if (!user) return;
    acceptAccess.mutate({ userId: user.id, zoneId });
  };

  return (
    <Screen
      safeAreaDisabled={!isAndroid}
      padding="m"
      justifyContent="space-between"
    >
      <Box>
        <Text variant="p2R">Busca al usuario que quieres invitar:</Text>

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
              color={user ? "grayscale.black" : "grayscale.400"}
            >
              {user?.username || "Buscar usuario"}
            </Text>
          </Pressable>
        </Box>
      </Box>
      <Box marginTop="m" marginBottom="l">
        <Button
          alignSelf="center"
          title="Invitar"
          variant="info"
          onPress={onInvite}
          isLoading={acceptAccess.isLoading}
          disabled={acceptAccess.isLoading || !user || acceptAccess.isSuccess}
          marginBottom="m"
        />
        <SemanticButton
          variant="error"
          title="Cancelar"
          onPress={navigation.goBack}
        />
      </Box>
      <FindUser ref={findUserRef} onSetUser={setUser} />
    </Screen>
  );
};

export default InviteUserToZoneScreen;
