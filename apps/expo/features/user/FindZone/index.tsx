import zone from "@andescalada/api/schemas/zone";
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
import BottomSheet from "@gorhom/bottom-sheet";
import useDebounce from "@hooks/useDebounce";
import { Zone } from "@prisma/client";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FlatList, StyleSheet } from "react-native";

interface Props {
  onSetZone: (zone: { name: Zone["name"]; id: Zone["id"] }) => void;
}

const FindZone: ForwardRefRenderFunction<BottomSheet, Props> = (
  { onSetZone },
  ref,
) => {
  const snapPoints = useMemo(() => ["1%", "100%"], []);

  const {
    data,
    mutate,
    reset,
    isLoading: isLoadingSearch,
  } = trpc.zones.find.useMutation();

  const [isLoading, setIsLoading] = useState(false);
  const searchZone = (value: string) => {
    const isValid = zone.nameSearch.safeParse(value);
    if (!isValid.success) {
      setIsLoading(false);
      reset();
      return;
    }

    mutate(value);
  };

  const onDebounceChange = useDebounce(searchZone);
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

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BoxWithKeyboard padding={"m"}>
        <Text variant="h3" marginBottom="s">
          Buscar zona
        </Text>
        <Box>
          <TextInput
            textVariant="p1R"
            onChangeText={onChange}
            containerProps={{ height: 40, paddingLeft: "s" }}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="nombre de la zona"
          />
        </Box>
        {!!search && (
          <Box flex={1}>
            {isLoading ? (
              <Box flex={1} marginTop="xxl">
                <ActivityIndicator size="large" />
              </Box>
            ) : (
              <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ flex: 1 }}
                ListEmptyComponent={() => (
                  <Box flex={1} justifyContent="center" alignItems="center">
                    <Text variant="p1R">No se encontraron zonas</Text>
                  </Box>
                )}
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
                        onSetZone({ name: item.name, id: item.id });
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        ref?.current?.close();
                      }}
                    >
                      <Text variant="h3R" color="grayscale.white">
                        {item.name}
                      </Text>
                    </Pressable>
                  );
                }}
              />
            )}
          </Box>
        )}
      </BoxWithKeyboard>
    </BottomSheet>
  );
};

export default forwardRef(FindZone);

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: pallete.grayscale.black,
  },
  handleIndicator: {
    backgroundColor: pallete.grayscale["100"],
  },
});
