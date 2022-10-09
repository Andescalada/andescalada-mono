import user from "@andescalada/api/schemas/user";
import {
  ActivityIndicator,
  Box,
  BoxWithKeyboard,
  Pressable,
  Text,
  TextInput,
} from "@andescalada/ui";
import { pallete } from "@andescalada/ui/Theme/pallete";
import { trpc } from "@andescalada/utils/trpc";
import UserProfileImage from "@features/user/components/UserProfileImage/UserProfileImage";
import BottomSheet from "@gorhom/bottom-sheet";
import useDebounce from "@hooks/useDebounce";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FlatList, StyleSheet } from "react-native";

interface Props {
  onSetUser: (user: string) => void;
}

const FindUser: ForwardRefRenderFunction<BottomSheet, Props> = (
  { onSetUser },
  ref,
) => {
  const snapPoints = useMemo(() => ["1%", "100%"], []);

  const {
    data,
    mutate,
    isLoading: isLoadingSearch,
  } = trpc.user.find.useMutation();

  const [isLoading, setIsLoading] = useState(false);
  const searchUsername = (value: string) => {
    const isValid = user.usernameSearch.safeParse(value);
    if (!isValid.success) {
      return;
    }

    mutate(value);
  };

  const onDebounceChange = useDebounce(searchUsername);
  const [search, setSearch] = useState("");
  const onChange = (value: string) => {
    setIsLoading(true);
    onDebounceChange(value);
    setSearch(value);
  };

  useEffect(() => {
    setIsLoading(isLoadingSearch);
  }, [isLoadingSearch]);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BoxWithKeyboard flex={1} behavior={undefined} padding={"m"}>
        <Text variant="h3" marginBottom="s">
          Buscar usuario
        </Text>
        <Box>
          <TextInput
            textVariant="p1R"
            onChangeText={onChange}
            containerProps={{ height: 40 }}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="nombre de usuario"
            adornmentProps={{
              startAdornment: "@",
              startAdornmentContainerProps: { alignSelf: "center" },
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
              renderItem={({ item }) => {
                return (
                  <Pressable
                    padding="m"
                    borderBottomWidth={1}
                    borderBottomColor="grayscale.400"
                    flexDirection="row"
                    justifyContent={"space-between"}
                    alignItems="center"
                    onPress={() => {
                      onSetUser(item.username);
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      ref?.current?.close();
                    }}
                  >
                    <Box>
                      <Text variant="h3R" color="grayscale.white">
                        {item.username}
                      </Text>
                      <Text variant="p3R" color="grayscale.white">
                        {item.name}
                      </Text>
                    </Box>
                    <UserProfileImage
                      publicId={item.profilePhoto?.publicId || undefined}
                      style={{ width: 40, height: 40, borderRadius: 40 }}
                    />
                  </Pressable>
                );
              }}
            />
          )}
        </Box>
      </BoxWithKeyboard>
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