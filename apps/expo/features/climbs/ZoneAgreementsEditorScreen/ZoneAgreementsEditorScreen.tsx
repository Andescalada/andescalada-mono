import { AgreementLevelSchema } from "@andescalada/db/zod";
import { IconNames } from "@andescalada/icons";
import {
  A,
  ActivityIndicator,
  Box,
  Icon,
  Ionicons,
  ListItem,
  Pressable,
  Screen,
  SubItem,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import AgreementLevelBadge from "@features/climbs/ZoneAgreementsEditorScreen/AgreementLevelBadge";
import { ZoneAgreementsRoutes } from "@features/zoneAgreementManager/Navigation/types";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { FC, useState } from "react";
import { FlatList } from "react-native";
import { FadeInUp, FadeOut, Layout } from "react-native-reanimated";

type Props =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.ZoneAgreementsEditor>;

const ZoneAgreementsEditorScreen: FC<Props> = ({
  route: {
    params: { zoneName, zoneId },
  },
}) => {
  const agreements = trpc.zones.agreementsList.useQuery({ zoneId });
  const [openDescription, setOpenDescription] = useState(false);

  const rootNavigation = useRootNavigation();

  const onAddAgreement = () => {
    rootNavigation.navigate(RootNavigationRoutes.ZoneAgreementsManager, {
      screen: ZoneAgreementsRoutes.AgreementsIntro,
      params: { zoneId },
    });
  };

  return (
    <Screen safeAreaDisabled padding="m">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text variant="h1">{zoneName}</Text>
        {false && (
          <Pressable onPress={onAddAgreement}>
            <Ionicons
              name="add-circle-sharp"
              size={40}
              color={"semantic.info"}
            />
          </Pressable>
        )}
      </Box>
      <FlatList
        data={agreements.data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          flex: 1,
        }}
        ListEmptyComponent={() => (
          <Box flex={1} justifyContent="center" alignItems="center">
            {agreements.isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <>
                <Text variant="h2">Sin acuerdos</Text>
                <Pressable onPress={onAddAgreement}>
                  <Text variant="p2R" marginTop="l" color="semantic.info">
                    Agregar
                  </Text>
                </Pressable>
              </>
            )}
          </Box>
        )}
        renderItem={({ item, index }) => (
          <Box marginBottom="l">
            <ListItem
              variant="plain"
              flexDirection="row"
              alignItems="center"
              marginTop={index === 0 ? "l" : "none"}
              backgroundColor="backgroundContrast"
              onPress={() => setOpenDescription((prev) => !prev)}
            >
              <Icon
                name={`${item.Agreement.icon}-color` as IconNames}
                color="background"
              />
              <Box marginLeft="m" alignItems="flex-start">
                <Text variant="p2R" color="textContrast">
                  {item.Agreement.title.originalText}
                </Text>
                {openDescription && (
                  <A.Box
                    paddingRight="l"
                    entering={FadeInUp}
                    exiting={FadeOut}
                    layout={Layout.delay(1000)}
                  >
                    <Text variant="p3R" color="textContrast">
                      {item.Agreement.description.originalText}
                    </Text>
                  </A.Box>
                )}
              </Box>

              {item.level !== AgreementLevelSchema.Enum.NotAplicable && (
                <AgreementLevelBadge level={item.level} />
              )}
            </ListItem>
            {item.Agreement?.ZoneAgreement[0]?.comment?.originalText && (
              <SubItem justifyContent="center" height={undefined} padding="s">
                <Text variant="p3R">
                  {item.Agreement?.ZoneAgreement[0]?.comment?.originalText.trim()}
                </Text>
              </SubItem>
            )}
          </Box>
        )}
      />
    </Screen>
  );
};

export default ZoneAgreementsEditorScreen;
