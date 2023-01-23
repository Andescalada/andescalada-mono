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
  TextButton,
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
import { FC, useCallback, useState } from "react";
import { Alert, FlatList } from "react-native";
import { FadeInUp, FadeOut, Layout } from "react-native-reanimated";

type Props =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.ZoneAgreementsEditor>;

const ZoneAgreementsEditorScreen: FC<Props> = ({
  route: {
    params: { zoneName, zoneId },
  },
}) => {
  const utils = trpc.useContext();
  const agreements = trpc.zones.agreementsList.useQuery({ zoneId });

  const deleteAgreement = trpc.zoneAgreements.delete.useMutation({
    onMutate: async ({ zoneAgreementId }) => {
      await utils.zones.agreementsList.cancel();
      const previousData = utils.zones.agreementsList.getData();
      utils.zones.agreementsList.setData({ zoneId }, (old) =>
        old ? old.filter((a) => a.id !== zoneAgreementId) : undefined,
      );
      return { previousData };
    },
    onError: (_, __, context) => {
      utils.zones.agreementsList.setData({ zoneId }, context?.previousData);
    },
  });

  const [openDescription, setOpenDescription] = useState(false);

  const rootNavigation = useRootNavigation();

  const onAddAgreement = () => {
    rootNavigation.navigate(RootNavigationRoutes.ZoneAgreementsManager, {
      screen: ZoneAgreementsRoutes.AgreementsIntro,
      params: { zoneId },
    });
  };

  const onDelete = useCallback(
    (id: string) =>
      Alert.alert("Eliminar", "¿Estás seguro de eliminar este acuerdo?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            deleteAgreement.mutate({
              zoneAgreementId: id,
              zoneId,
            });
          },
        },
      ]),
    [],
  );

  return (
    <Screen safeAreaDisabled>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding="m"
      >
        <Text variant="h1">{zoneName}</Text>
        {!!agreements.data && (
          <TextButton variant="info" onPress={onAddAgreement}>
            Editar
          </TextButton>
        )}
      </Box>
      <FlatList
        data={agreements.data}
        keyExtractor={(item) => item.id}
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
              <>
                <Text variant="h2">Sin acuerdos</Text>
                <TextButton variant="info" onPress={onAddAgreement}>
                  Agregar
                </TextButton>
              </>
            )}
          </Box>
        )}
        renderItem={({ item, index }) => (
          <Box marginBottom="xl">
            <ListItem
              variant="plain"
              flexDirection="row"
              alignItems="center"
              marginTop={index === 0 ? "l" : "none"}
              backgroundColor="backgroundContrast"
              marginHorizontal="m"
              onPress={() => setOpenDescription((prev) => !prev)}
            >
              <Box
                position={"absolute"}
                right={5}
                top={-15}
                flexDirection="row"
              >
                <Pressable
                  borderWidth={3}
                  borderColor="background"
                  borderRadius={25}
                  backgroundColor="semantic.info"
                  padding="xs"
                  marginRight="s"
                  onPress={() =>
                    rootNavigation.navigate(
                      RootNavigationRoutes.ZoneAgreementsManager,
                      {
                        screen: ZoneAgreementsRoutes.EditAgreement,
                        params: { zoneId, zoneAgreementId: item.id },
                      },
                    )
                  }
                >
                  <Ionicons
                    name="settings-sharp"
                    color="background"
                    size={15}
                  />
                </Pressable>
                <Pressable
                  borderWidth={3}
                  borderColor="background"
                  borderRadius={25}
                  backgroundColor="semantic.error"
                  padding="xs"
                  onPress={() => onDelete(item.id)}
                >
                  <Ionicons name="close" color="background" size={15} />
                </Pressable>
              </Box>
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
              <SubItem
                justifyContent="center"
                height={undefined}
                padding="s"
                marginHorizontal="l"
              >
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
