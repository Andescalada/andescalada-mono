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
import BottomSheet, {
  BottomSheetFlatList,
  useBottomSheetInternal,
} from "@gorhom/bottom-sheet";
import useDebounce from "@hooks/useDebounce";
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
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
} from "react-native";

type FindOutput = inferProcedureOutput<AppRouter["routes"]["searchInAZone"]>[0];

export interface RouteOutput {
  id: FindOutput["id"];
  name: FindOutput["name"];
  wallName: FindOutput["Wall"]["name"];
  wallId: FindOutput["Wall"]["id"];
  sectorName: FindOutput["Wall"]["Sector"]["name"];
  sectorId: FindOutput["Wall"]["Sector"]["id"];
  zoneId: FindOutput["Wall"]["Sector"]["Zone"]["id"];
  zoneName: FindOutput["Wall"]["Sector"]["Zone"]["name"];
}

interface Props {
  zoneId: string;
  onSetRoute: (args: RouteOutput) => void;
}

const FindRouteInAZone: ForwardRefRenderFunction<BottomSheet, Props> = (
  { zoneId, onSetRoute },
  ref,
) => {
  const snapPoints = useMemo(() => ["1%", "100%"], []);

  const {
    data,
    mutate,
    reset,
    isLoading: isLoadingSearch,
  } = trpc.routes.searchInAZone.useMutation();

  const [isLoading, setIsLoading] = useState(false);
  const searchRoute = (value: string) => {
    mutate(
      { search: value, zoneId },
      {
        onSuccess: () => {
          Keyboard.dismiss();
        },
      },
    );
  };

  const onDebounceChange = useDebounce(searchRoute);
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
          Buscar ruta
        </Text>
        <Box>
          <BottomSheetTextInput
            ref={textRef}
            onChangeText={onChange}
            containerProps={{ height: 40 }}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Nombre de la ruta"
          />
        </Box>
        <Box flex={1}>
          {isLoading ? (
            <Box flex={1} marginTop="xxl">
              <ActivityIndicator size="large" />
            </Box>
          ) : (
            <BottomSheetFlatList
              data={data}
              keyExtractor={(item) => item.id}
              onTouchStart={Keyboard.dismiss}
              ListEmptyComponent={() =>
                search ? (
                  <Box>
                    <Text variant="p1R">No se encontraron rutas</Text>
                  </Box>
                ) : null
              }
              renderItem={({ item: { id, name, Wall } }) => {
                return (
                  <Pressable
                    padding="m"
                    borderBottomWidth={1}
                    borderBottomColor="grayscale.400"
                    flexDirection="row"
                    justifyContent={"space-between"}
                    alignItems="center"
                    onPress={() => {
                      onSetRoute({
                        id,
                        name,
                        wallName: Wall.name,
                        sectorName: Wall.Sector.name,
                        wallId: Wall.id,
                        sectorId: Wall.Sector.id,
                        zoneId: Wall.Sector.Zone.id,
                        zoneName: Wall.Sector.Zone.name,
                      });
                      // @ts-expect-error ref is correctly typed
                      ref?.current?.close();
                    }}
                  >
                    <Box>
                      <Text variant="h3R" color="grayscale.white">
                        {name}
                      </Text>
                      <Text variant="p3R" color="grayscale.white">
                        {`${Wall.name} / ${Wall.Sector.name}`}
                      </Text>
                    </Box>
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

export default forwardRef(FindRouteInAZone);

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
