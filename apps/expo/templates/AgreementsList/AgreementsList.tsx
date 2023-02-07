import { AgreementLevelSchema } from "@andescalada/db/zod";
import { IconNames } from "@andescalada/icons/NativeIcons";
import {
  A,
  ActivityIndicator,
  Box,
  Icon,
  ListItem,
  SubItem,
  Text,
  TextButton,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import AgreementLevelBadge from "@features/climbs/ZoneAgreementsEditorScreen/AgreementLevelBadge";
import { ZoneAgreementsRoutes } from "@features/zoneAgreementManager/Navigation/types";
import usePermissions from "@hooks/usePermissions";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { ComponentProps, FC, useState } from "react";
import { FlatList } from "react-native";
import { FadeInUp, FadeOut, Layout } from "react-native-reanimated";

type FlatListFiltered = Omit<
  ComponentProps<typeof FlatList>,
  "data" | "keyExtractor" | "renderItem" | "extraData" | "getItem"
>;

interface Props extends FlatListFiltered {
  zoneId: string;
  toggleDescriptions?: boolean;
}

const ZoneAgreementsScreen: FC<Props> = ({
  zoneId,
  toggleDescriptions = false,
  ...props
}) => {
  const agreements = trpc.agreements.listByZone.useQuery({ zoneId });
  const { permission } = usePermissions({ zoneId });
  const [openDescription, setOpenDescription] = useState(!toggleDescriptions);
  const rootNavigation = useRootNavigation();
  return (
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
            <Box alignItems="center">
              <Text variant="p1R">Sin acuerdos</Text>
              {permission?.has("EditZoneAgreements") && (
                <TextButton
                  variant="info"
                  onPress={() =>
                    rootNavigation.navigate(
                      RootNavigationRoutes.ZoneAgreementsManager,
                      {
                        screen: ZoneAgreementsRoutes.AgreementsIntro,
                        params: { zoneId },
                      },
                    )
                  }
                >
                  Agregar
                </TextButton>
              )}
            </Box>
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
      {...props}
    />
  );
};

export default ZoneAgreementsScreen;
