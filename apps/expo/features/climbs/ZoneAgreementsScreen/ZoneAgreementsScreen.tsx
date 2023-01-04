import { AgreementLevelSchema } from "@andescalada/db/zod";
import { IconNames } from "@andescalada/icons";
import {
  A,
  ActivityIndicator,
  Box,
  Icon,
  ListItem,
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
import { FC, useState } from "react";
import { FlatList } from "react-native";
import { FadeInUp, FadeOut, Layout } from "react-native-reanimated";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.ZoneAgreements>;

const ZoneAgreementsScreen: FC<Props> = ({
  route: {
    params: { zoneName, zoneId },
  },
}) => {
  const agreements = trpc.zones.agreementsList.useQuery({ zoneId });
  const [openDescription, setOpenDescription] = useState(false);
  return (
    <Screen safeAreaDisabled padding="m">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text variant="h1">{zoneName}</Text>
      </Box>
      <FlatList
        data={agreements.data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Box
            flex={1}
            justifyContent="center"
            alignItems="center"
            marginTop="xxxl"
          >
            {agreements.isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <Text variant="p1R">Sin acuerdos</Text>
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

export default ZoneAgreementsScreen;
