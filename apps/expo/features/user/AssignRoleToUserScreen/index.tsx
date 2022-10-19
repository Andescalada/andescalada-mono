import { RoleNamesSchema } from "@andescalada/db/zod";
import { Box, Button, Pressable, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import FindUser from "@features/user/FindUser";
import FindZone from "@features/user/FindZone";
import {
  UserNavigationRoutes,
  UserNavigationScreenProps,
} from "@features/user/Navigation/types";
import BottomSheet from "@gorhom/bottom-sheet";
import { useAppTheme } from "@hooks/useAppTheme";
import type { Zone } from "@prisma/client";
import { Picker } from "@react-native-picker/picker";
import { FC, useMemo, useRef, useState } from "react";
import { Keyboard, Platform } from "react-native";
import { z } from "zod";

type RoleType = z.infer<typeof RoleNamesSchema>;

type Props = UserNavigationScreenProps<UserNavigationRoutes.AssignRoleToUser>;

const AssignRoleToUserScreen: FC<Props> = ({ navigation }) => {
  const findUserRef = useRef<BottomSheet>(null);
  const findZoneRef = useRef<BottomSheet>(null);
  const [username, setUsername] = useState("");
  const [zone, setZone] = useState<{ id: Zone["id"]; name: Zone["name"] }>();
  const [role, setRole] = useState<RoleType | "">("");

  const theme = useAppTheme();

  const { mutate, reset, isSuccess, isLoading } =
    trpc.user.assignRoleToUser.useMutation({
      onSuccess() {
        navigation.goBack();
      },
      onSettled: (data) => {
        if (data) {
          setTimeout(() => {
            reset();
          }, 1500);
        }
      },
    });

  const saveButton = useMemo(() => {
    if (role === "" || !zone || !username) {
      return { variant: "transparent" as const, title: "Guardar" };
    }
    if (isSuccess) {
      return { variant: "success" as const, title: "Guardado" };
    }
    return { variant: "info" as const, title: "Guardar" };
  }, [isSuccess, role, username, zone]);

  const onSubmit = () => {
    if (role === "" || !zone || !username) return;
    mutate({ role, username, zoneId: zone.id });
  };

  return (
    <Screen safeAreaDisabled padding="m" justifyContent="space-between">
      <Box>
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
              {zone?.name || "Buscar zona"}
            </Text>
          </Pressable>
        </Box>
        <Box marginTop="m">
          <Text variant="p1R" marginBottom="s">
            Rol
          </Text>
          <Picker
            onValueChange={setRole}
            selectedValue={role}
            mode="dialog"
            style={{
              backgroundColor:
                Platform.OS === "android"
                  ? theme.colors.filledTextInputVariantBackground
                  : undefined,
            }}
          >
            <Picker.Item label="" value="" />
            {Object.values(RoleNamesSchema.Values).map((role) => (
              <Picker.Item
                key={role}
                color={Platform.OS === "android" ? "black" : "white"}
                fontFamily="Rubik-400"
                label={role}
                value={role}
              />
            ))}
          </Picker>
        </Box>
      </Box>
      <Button
        alignSelf="center"
        title={saveButton.title}
        variant={saveButton.variant}
        onPress={onSubmit}
        isLoading={isLoading}
        disabled={isLoading || !username || !role || isSuccess || !zone}
        marginVertical="m"
      />
      <FindUser ref={findUserRef} onSetUser={setUsername} />
      <FindZone ref={findZoneRef} onSetZone={setZone} />
    </Screen>
  );
};

export default AssignRoleToUserScreen;
