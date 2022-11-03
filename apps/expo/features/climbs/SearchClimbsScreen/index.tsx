import { BackButton, Box, Screen, Text, TextInput } from "@andescalada/ui";
import { TextInputRef } from "@andescalada/ui/TextInput/TextInput";
import theme from "@andescalada/ui/Theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import React, { FC, RefObject, useEffect, useRef } from "react";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.SearchClimbs>;

const SearchClimbsScreen: FC<Props> = ({ navigation }) => {
  const ref = useRef<TextInputRef>() as RefObject<TextInputRef>;

  useEffect(() => {
    if (ref) ref?.current?.focus();
  }, []);

  return (
    <Screen padding="m">
      <Box flexDirection="row" alignItems="center" marginBottom="s">
        <BackButton onPress={navigation.goBack} />
        <Text variant="h2" marginLeft="m">
          Buscar
        </Text>
      </Box>
      <Box marginTop="s">
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
          containerProps={{ height: 40, paddingLeft: "s" }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Buscar zona"
        />
      </Box>
    </Screen>
  );
};

export default SearchClimbsScreen;
