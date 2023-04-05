import roleNameAssets from "@andescalada/common-assets/roleNameAssets";
import { RoleNamesSchema } from "@andescalada/db/zod";
import {
  A,
  Box,
  Button,
  Pressable,
  Screen,
  ScrollView,
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
import { useAppTheme } from "@hooks/useAppTheme";
import { Picker } from "@react-native-picker/picker";
import { isAndroid } from "@utils/platform";
import { FC, useMemo, useRef, useState } from "react";
import { Keyboard, Platform } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { z } from "zod";

type RoleType = z.infer<typeof RoleNamesSchema>;

type Props =
  InfoAccessManagerScreenProps<InfoAccessManagerRoutes.AddZoneRoleToUserScreen>;

const AddZoneRoleToUserScreen: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId },
  },
}) => {
  const findUserRef = useRef<BottomSheet>(null);
  const [user, setUser] = useState<UserOutput>();
  const [role, setRole] = useState<RoleType | "">("");

  const theme = useAppTheme();

  const zone = trpc.useContext().zones.allSectors.getData({ zoneId });

  const roleList = useMemo(() => {
    if (!zone) return [];
    return Object.entries(roleNameAssets)
      .filter((r) => r[1].availableFor?.includes(zone?.infoAccess))
      .map(([r]) => r as typeof RoleNamesSchema._type);
  }, [zone]);

  const utils = trpc.useContext();

  const { mutate, reset, isSuccess, isLoading } =
    trpc.user.assignRoleToUser.useMutation({
      onSuccess() {
        navigation.goBack();
        utils.zones.usersByRole.invalidate();
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
    if (role === "" || !user) {
      return { variant: "transparent" as const, title: "Guardar" };
    }
    if (isSuccess) {
      return { variant: "success" as const, title: "Guardado" };
    }
    return { variant: "info" as const, title: "Guardar" };
  }, [isSuccess, role, user]);

  const onSubmit = () => {
    if (role === "" || !user) return;
    mutate({ role, username: user.username, zoneId: zoneId });
  };

  return (
    <Screen
      safeAreaDisabled={!isAndroid}
      padding="m"
      justifyContent="space-between"
    >
      <ScrollView flex={1}>
        <Box>
          <Text variant="p2R">
            Selecciona un usuario y el rol que quieres asignar:
          </Text>
        </Box>
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
        <Box marginTop="m">
          <Text variant="p1R" marginBottom="s">
            Agregar Rol
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
            {roleList.map((role) => (
              <Picker.Item
                key={role}
                color={Platform.OS === "android" ? "black" : "white"}
                fontFamily="Rubik-400"
                label={roleNameAssets[role].label}
                value={role}
              />
            ))}
          </Picker>
        </Box>
        {!!role && (
          <A.Box entering={FadeIn} exiting={FadeOut}>
            <Text variant="h2">Descripción</Text>
            <Text variant="p2R">{roleNameAssets[role].description}</Text>
          </A.Box>
        )}
      </ScrollView>
      <Button
        alignSelf="center"
        title={saveButton.title}
        variant={saveButton.variant}
        onPress={onSubmit}
        isLoading={isLoading}
        disabled={isLoading || !user || !role || isSuccess}
        marginVertical="m"
      />
      <SemanticButton
        variant="error"
        title="Cancelar"
        onPress={navigation.goBack}
      />
      <FindUser ref={findUserRef} onSetUser={setUser} />
    </Screen>
  );
};

export default AddZoneRoleToUserScreen;
