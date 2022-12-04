import { IconNames } from "@andescalada/icons";
import { Box, Icon, ListItem, Pressable, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { Ionicons } from "@expo/vector-icons";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { ZoneAgreementsRoutes } from "@features/zoneAgreementManager/Navigation/types";
import { useAppTheme } from "@hooks/useAppTheme";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { FC } from "react";
import { FlatList } from "react-native";

type Props =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.ZoneAgreementsEditor>;

const ZoneAgreementsEditorScreen: FC<Props> = ({
  route: {
    params: { zoneName, zoneId },
  },
}) => {
  const agreements = trpc.zones.agreementsList.useQuery({ zoneId });

  const rootNavigation = useRootNavigation();

  const onAddAgreement = () => {
    rootNavigation.navigate(RootNavigationRoutes.ZoneAgreementsManager, {
      screen: ZoneAgreementsRoutes.AgreementsIntro,
      params: { zoneId },
    });
  };

  const theme = useAppTheme();
  return (
    <Screen safeAreaDisabled padding="m">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text variant="h1">{zoneName}</Text>
        <Pressable onPress={onAddAgreement}>
          <Ionicons
            name="add-circle-sharp"
            size={40}
            color={theme.colors["semantic.info"]}
          />
        </Pressable>
      </Box>
      <FlatList
        data={agreements.data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          flex: 1,
        }}
        ListEmptyComponent={() => (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text variant="h2">Sin acuerdos</Text>
            <Pressable onPress={onAddAgreement}>
              <Text variant="p2R" marginTop="l" color="semantic.info">
                Agregar
              </Text>
            </Pressable>
          </Box>
        )}
        renderItem={({ item, index }) => (
          <ListItem
            variant="plain"
            flexDirection="row"
            alignItems="center"
            marginBottom="l"
            marginTop={index === 0 ? "l" : "none"}
            backgroundColor="backgroundContrast"
          >
            <Icon
              name={`${item.Agreement.icon}-color` as IconNames}
              color="background"
            />
            <Box marginLeft="m" alignItems="center">
              <Text variant="p2R" color="textContrast">
                {item.Agreement.title.originalText}
              </Text>
            </Box>
          </ListItem>
        )}
      />
    </Screen>
  );
};

export default ZoneAgreementsEditorScreen;
