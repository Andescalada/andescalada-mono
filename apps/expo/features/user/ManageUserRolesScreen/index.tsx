import { RoleNamesSchema } from "@andescalada/db/zod";
import {
  Box,
  Button,
  Pressable,
  Screen,
  ScrollView,
  SemanticButton,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import FindUser, { UserOutput } from "@features/user/FindUser";
import FindZone from "@features/user/FindZone";
import {
  UserNavigationRoutes,
  UserNavigationScreenProps,
} from "@features/user/Navigation/types";
import BottomSheet from "@gorhom/bottom-sheet";
import { useAppTheme } from "@hooks/useAppTheme";
import type { RoleByZone, Zone } from "@prisma/client";
import { Picker } from "@react-native-picker/picker";
import { FC, useMemo, useRef, useState } from "react";
import { Keyboard, Platform } from "react-native";
import { z } from "zod";

type RoleType = z.infer<typeof RoleNamesSchema>;

type Props = UserNavigationScreenProps<UserNavigationRoutes.ManageUserRoles>;

const ManageUserRolesScreen: FC<Props> = ({ navigation }) => {
  const findUserRef = useRef<BottomSheet>(null);
  const findZoneRef = useRef<BottomSheet>(null);
  const [user, setUser] = useState<UserOutput>();
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
    if (role === "" || !zone || !user) {
      return { variant: "transparent" as const, title: "Guardar" };
    }
    if (isSuccess) {
      return { variant: "success" as const, title: "Guardado" };
    }
    return { variant: "info" as const, title: "Guardar" };
  }, [isSuccess, role, user, zone]);

  const onSubmit = () => {
    if (role === "" || !zone || !user) return;
    mutate({ role, username: user.username, zoneId: zone.id });
  };

  const rolesByZone = useMemo(
    () => user?.roles?.filter?.((z) => z.zoneId === zone?.id) || [],
    [user?.roles, zone?.id],
  );

  const deleteRoleByZone = trpc.user.adminDeleteRoleByUser.useMutation();

  const onDeleteRole = (id: RoleByZone["id"]) => {
    deleteRoleByZone.mutate({ roleByZoneId: id });
    setUser(
      (prev) =>
        prev && { ...prev, roles: prev.roles.filter((r) => r.id !== id) },
    );
  };

  return (
    <Screen safeAreaDisabled padding="m" justifyContent="space-between">
      <ScrollView flex={1}>
        <Box>
          <Text variant="p2R">
            Selecciona un usuario y una zona para gestionar sus roles:
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
        <Box marginTop="m" visible={!!zone && !!user}>
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
        <Box marginTop="m" visible={!!zone && !!user}>
          <Text variant="p1R" marginBottom="s">
            Gestionar Roles
          </Text>
          {rolesByZone.length < 1 && (
            <Box alignItems="center">
              <Text marginTop="xl" variant="p3R" color="semantic.info">
                Sin roles asignados
              </Text>
            </Box>
          )}
          {rolesByZone.map((item) => (
            <Box
              padding="m"
              borderBottomWidth={1}
              borderBottomColor="grayscale.400"
              flexDirection="row"
              justifyContent={"space-between"}
              alignItems="center"
              key={item?.Role?.name}
            >
              <Text>{item?.Role?.name}</Text>
              <SemanticButton
                titleVariant="p3R"
                title="Eliminar"
                variant="error"
                onPress={() => onDeleteRole(item.id)}
              />
            </Box>
          ))}
        </Box>
      </ScrollView>
      <Button
        alignSelf="center"
        title={saveButton.title}
        variant={saveButton.variant}
        onPress={onSubmit}
        isLoading={isLoading}
        disabled={isLoading || !user || !role || isSuccess || !zone}
        marginVertical="m"
      />
      <FindUser ref={findUserRef} onSetUser={setUser} filterMe={false} />
      <FindZone ref={findZoneRef} onSetZone={setZone} />
    </Screen>
  );
};

export default ManageUserRolesScreen;
