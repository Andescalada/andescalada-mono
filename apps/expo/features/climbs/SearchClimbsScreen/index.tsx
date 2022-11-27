import {
  BackButton,
  Box,
  KeyboardDismiss,
  Screen,
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
import Results from "@features/climbs/SearchClimbsScreen/Results";
import useDebounce from "@hooks/useDebounce";
import React, { FC, RefObject, useEffect, useRef } from "react";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.SearchClimbs>;

const SearchClimbsScreen: FC<Props> = ({ navigation }) => {
  const ref = useRef<TextInputRef>() as RefObject<TextInputRef>;

  const search = trpc.search.all.useMutation();

  const debounceSearch = useDebounce(search.mutate);

  useEffect(() => {
    if (ref) ref?.current?.focus();
  }, []);

  return (
    <Screen padding="m">
      <KeyboardDismiss flex={1}>
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
      </KeyboardDismiss>
    </Screen>
  );
};

export default SearchClimbsScreen;
