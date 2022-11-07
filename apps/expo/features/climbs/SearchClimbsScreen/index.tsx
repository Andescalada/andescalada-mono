import { AppRouter } from "@andescalada/api/src/routers/_app";
import {
  ActivityIndicator,
  BackButton,
  Box,
  BoxWithKeyboard,
  Screen,
  Text,
  TextInput,
} from "@andescalada/ui";
import { TextInputRef } from "@andescalada/ui/TextInput/TextInput";
import theme from "@andescalada/ui/Theme/theme";
import { trpc } from "@andescalada/utils/trpc";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import useDebounce from "@hooks/useDebounce";
import { inferProcedureOutput } from "@trpc/server";
import React, { FC, RefObject, useEffect, useMemo, useRef } from "react";
import { FlatList } from "react-native";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.SearchClimbs>;

type Data = inferProcedureOutput<AppRouter["search"]["all"]>;

const SearchClimbsScreen: FC<Props> = ({ navigation }) => {
  const ref = useRef<TextInputRef>() as RefObject<TextInputRef>;

  const search = trpc.search.all.useMutation();

  console.log(search.data);

  const debounceSearch = useDebounce(search.mutate);

  useEffect(() => {
    if (ref) ref?.current?.focus();
  }, []);

  return (
    <Screen padding="m">
      <BoxWithKeyboard disableAvoiding flex={1}>
        <Box
          flexDirection="row"
          alignItems="center"
          marginBottom="s"
          width="100%"
        >
          <BackButton onPress={navigation.goBack} />
          <TextInput
            ref={ref}
            adornmentProps={{
              startAdornment: (
                <Box justifyContent="center" paddingHorizontal="xs">
                  <Ionicons
                    name="search"
                    size={24}
                    color={theme.colors["grayscale.600"]}
                  />
                </Box>
              ),
              startAdornmentProps: {},
            }}
            textVariant="p1R"
            containerProps={{
              height: 40,
              paddingLeft: "s",
              flex: 1,
              marginLeft: "s",
            }}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Buscar zona, ruta ..."
            onChangeText={debounceSearch}
          />
        </Box>
        <Box marginTop="s">
          <Results isLoading={search.isLoading} data={search.data} />
        </Box>
      </BoxWithKeyboard>
    </Screen>
  );
};

export default SearchClimbsScreen;

interface ResultsProps {
  isLoading: boolean;
  data: Data | undefined;
}

const Results = ({ data, isLoading }: ResultsProps) => {
  if (isLoading) {
    return (
      <Box flex={1} marginTop="xxl">
        <ActivityIndicator size="large" />
      </Box>
    );
  }
  if (data)
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Box>
            <Text variant="p1B">{item.name}</Text>
            <Text variant="p3R">{item.detail}</Text>
          </Box>
        )}
      />
    );

  return <Box />;
};
