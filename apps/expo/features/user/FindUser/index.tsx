import user from "@andescalada/api/schemas/user";
import { AppRouter } from "@andescalada/api/src/routers/_app";
import {
  ActivityIndicator,
  Box,
  KeyboardDismiss,
  Pressable,
  Text,
  TextInput,
} from "@andescalada/ui";
import { TextInputRef } from "@andescalada/ui/TextInput/TextInput";
import { pallete } from "@andescalada/ui/Theme/pallete";
import { trpc } from "@andescalada/utils/trpc";
import BottomSheet, { useBottomSheetInternal } from "@gorhom/bottom-sheet";
import useDebounce from "@hooks/useDebounce";
import UserProfileImage from "@templates/UserProfileImage/UserProfileImage";
import { inferProcedureOutput } from "@trpc/server";
import {
  ComponentProps,
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
} from "react-native";

type FindOutput = inferProcedureOutput<AppRouter["user"]["find"]>[0];

export interface UserOutput {
  id: FindOutput["id"];
  username: FindOutput["username"];
  email: FindOutput["email"];
  roles: FindOutput["RoleByZone"];
}

interface Props {
  onSetUser: (args: UserOutput) => void;
  filterMe?: boolean;
}

const FindUser: ForwardRefRenderFunction<BottomSheet, Props> = (
  { onSetUser, filterMe = true },
  ref,
) => {
  const snapPoints = useMemo(() => ["1%", "100%"], []);

  const {
    data,
    mutate,
    reset,
    isLoading: isLoadingSearch,
  } = trpc.user.find.useMutation();

  const [isLoading, setIsLoading] = useState(false);
  const searchUsername = (value: string) => {
    const isValid = user.usernameSearch.safeParse(value);
    if (!isValid.success) {
      setIsLoading(false);
      reset();
      return;
    }

    mutate({ search: value, filterMe });
  };

  const onDebounceChange = useDebounce(searchUsername);
  const [search, setSearch] = useState("");
  const onChange = (value: string) => {
    setIsLoading(true);
    setSearch(value);
    if (!value) {
      setIsLoading(false);
      reset();
      return;
    }
    onDebounceChange(value);
  };

  useEffect(() => {
    setIsLoading(isLoadingSearch);
  }, [isLoadingSearch]);

  const textRef = useRef<TextInputRef>(null);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      onChange={(index) => {
        if (index === 0) {
          Keyboard.dismiss();
        }
        if (index === 1) {
          textRef?.current?.focus();
        }
      }}
    >
      <KeyboardDismiss padding={"m"}>
        <Text variant="h3" marginBottom="s">
          Buscar usuario
        </Text>
        <Box>
          <BottomSheetTextInput
            ref={textRef}
            onChangeText={onChange}
            containerProps={{ height: 40 }}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="nombre de usuario"
            adornmentProps={{
              startAdornment: "@",
              startAdornmentContainerProps: { justifyContent: "center" },
              startAdornmentProps: { fontSize: 20, marginHorizontal: "s" },
            }}
          />
        </Box>
        <Box flex={1}>
          {isLoading ? (
            <Box flex={1} marginTop="xxl">
              <ActivityIndicator size="large" />
            </Box>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={() =>
                search ? (
                  <Box>
                    <Text variant="p1R">No se encontraron usuarios</Text>
                  </Box>
                ) : null
              }
              renderItem={({
                item: { username, RoleByZone, email, name, profilePhoto, id },
              }) => {
                return (
                  <Pressable
                    padding="m"
                    borderBottomWidth={1}
                    borderBottomColor="grayscale.400"
                    flexDirection="row"
                    justifyContent={"space-between"}
                    alignItems="center"
                    onPress={() => {
                      onSetUser({ username, email, roles: RoleByZone, id });

                      // @ts-expect-error ref is correctly typed
                      ref?.current?.close();
                    }}
                  >
                    <Box>
                      <Text variant="h3R" color="grayscale.white">
                        {username}
                      </Text>
                      <Text variant="p3R" color="grayscale.white">
                        {name}
                      </Text>
                    </Box>
                    <UserProfileImage
                      publicId={profilePhoto?.publicId || undefined}
                      style={{ width: 40, height: 40, borderRadius: 40 }}
                    />
                  </Pressable>
                );
              }}
            />
          )}
        </Box>
      </KeyboardDismiss>
    </BottomSheet>
  );
};

export default forwardRef(FindUser);

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: pallete.grayscale.black,
  },
  handleIndicator: {
    backgroundColor: pallete.grayscale["100"],
  },
});

// eslint-disable-next-line react/display-name
const BottomSheetTextInput = forwardRef<
  TextInputRef,
  ComponentProps<typeof TextInput>
>((props, ref) => {
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

  const handleOnFocus = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      shouldHandleKeyboardEvents.value = true;
      if (props.onFocus) {
        props.onFocus(args);
      }
    },
    [props, shouldHandleKeyboardEvents],
  );
  const handleOnBlur = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      shouldHandleKeyboardEvents.value = false;
      if (props.onBlur) {
        props.onBlur(args);
      }
    },
    [props, shouldHandleKeyboardEvents],
  );
  return (
    <TextInput
      ref={ref}
      {...props}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
    />
  );
});
