import zone from "@andescalada/api/schemas/zone";
import {
  Box,
  BoxWithKeyboard,
  Button,
  Pressable,
  Screen,
  Text,
  TextInput,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import FindUser from "@features/user/FindUser";
import {
  UserNavigationRoutes,
  UserNavigationScreenProps,
} from "@features/user/Navigation/types";
import BottomSheet from "@gorhom/bottom-sheet";
import useZodForm from "@hooks/useZodForm";
import { FC, useMemo, useRef, useState } from "react";
import { useController } from "react-hook-form";
import { Keyboard } from "react-native";

type Props = UserNavigationScreenProps<UserNavigationRoutes.CreateZone>;

const CreateZoneScreen: FC<Props> = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isValid },
  } = useZodForm({
    schema: zone.schema,
  });
  const utils = trpc.useContext();
  const {
    mutate,
    isLoading,
    isSuccess,
    reset: resetMutation,
  } = trpc.zones.create.useMutation({
    onSuccess: () => {
      utils.zones.all.invalidate();
    },
    onSettled: (data) => {
      if (data) {
        setTimeout(() => {
          reset({
            name: "",
          }),
            resetMutation();
        }, 1500);
      }
    },
  });

  const {
    field: { onChange },
    fieldState: { error },
  } = useController({
    control,
    name: "name",
  });

  const [username, setUsername] = useState("");

  const onSubmit = handleSubmit((input) => {
    mutate({ name: input.name, username });
  });

  const bottomSheetRef = useRef<BottomSheet>(null);

  const saveButton = useMemo(() => {
    if (!isDirty || !username) {
      return { variant: "transparent" as const, title: "Guardar" };
    }
    if (isSuccess) {
      return { variant: "success" as const, title: "Guardado" };
    }
    return { variant: "info" as const, title: "Guardar" };
  }, [isDirty, isSuccess, username]);

  return (
    <Screen safeAreaDisabled padding="m">
      <BoxWithKeyboard behavior="height">
        <Box marginVertical={"ll"}>
          <Text variant="h3">Crea una nueva zona pública de escalada</Text>
        </Box>
        <Box marginTop="m">
          <Text variant="p1R" marginBottom="s">
            Nombre de la zona*
          </Text>
          <TextInput onChangeText={onChange} containerProps={{ height: 40 }} />
          <Text marginTop="xs" color="semantic.error">
            {error?.message}
          </Text>
        </Box>
        <Box
          borderColor="semantic.error"
          borderWidth={2}
          borderRadius={10}
          borderStyle={"dashed"}
          padding="s"
        >
          <Box marginTop="m">
            <Text variant="p1R" marginBottom="s">
              Agregar administrador*
            </Text>
            <Pressable
              borderRadius={4}
              backgroundColor="filledTextInputVariantBackground"
              height={40}
              onPress={() => {
                Keyboard.dismiss();
                bottomSheetRef.current?.expand();
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
            <Text marginTop="xs" color="semantic.error">
              {error?.message}
            </Text>
          </Box>
          <Text variant="p3R" marginBottom="s">
            Los administradores pueden editar, crear y borrar cualquier
            contenido de la zona.
          </Text>
        </Box>

        <Button
          title={saveButton.title}
          variant={saveButton.variant}
          onPress={onSubmit}
          isLoading={isLoading}
          disabled={isLoading || !username || !isDirty || isSuccess}
          marginVertical="m"
        />
      </BoxWithKeyboard>
      <FindUser ref={bottomSheetRef} onSetUser={setUsername} />
    </Screen>
  );
};

export default CreateZoneScreen;