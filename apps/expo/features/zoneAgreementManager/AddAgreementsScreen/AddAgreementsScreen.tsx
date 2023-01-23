import { notNull } from "@andescalada/api/src/utils/filterGuards";
import { ClassicAgreementSchema, SoftDeleteSchema } from "@andescalada/db/zod";
import {
  ActivityIndicator,
  Box,
  Button,
  ListItem,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import useRefresh from "@hooks/useRefresh";
import classicAgreementAssets from "@utils/classicAgreementAssets";
import { FC, useMemo } from "react";
import { FlatList } from "react-native";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.AddAgreements>;

const AddAgreementsScreen: FC<Props> = ({
  route: {
    params: { zoneId },
  },
  navigation,
}) => {
  const utils = trpc.useContext();
  const agreements = trpc.agreements.adminAgreementsList.useQuery({ zoneId });

  const existingClassicAgreements = useMemo(
    () =>
      agreements.data?.map((a) => a.Agreement.classic).filter(notNull) ?? [],
    [agreements.data],
  );

  const deletedClassicAgreements = useMemo(
    () =>
      agreements.data?.filter(
        (a) => a.isDeleted === SoftDeleteSchema.enum.DeletedPublic,
      ) ?? [],
    [agreements.data],
  );

  const missingClassicAgreements = useMemo(
    () =>
      ClassicAgreementSchema.options.filter(
        (c) => !existingClassicAgreements.includes(c),
      ),
    [existingClassicAgreements],
  );

  const restoreAgreement = trpc.agreements.restoreAgreement.useMutation({
    onSuccess: () => {
      utils.agreements.adminAgreementsList.invalidate({ zoneId });
      utils.zones.agreementsList.invalidate({ zoneId });
    },
  });

  const refresh = useRefresh(
    agreements.refetch,
    agreements.isFetching && !agreements.isLoading,
  );

  if (agreements.isLoading)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    );

  return (
    <Screen safeAreaDisabled padding="m">
      <FlatList
        data={missingClassicAgreements}
        refreshControl={refresh}
        keyExtractor={(item) => item}
        ListEmptyComponent={() => (
          <Box
            flex={1}
            justifyContent="center"
            alignItems="center"
            marginVertical="xxxl"
          >
            <Text variant="p3R">No hay acuerdos disponibles para agregar</Text>
          </Box>
        )}
        renderItem={({ item }) => (
          <ListItem
            marginBottom="m"
            onPress={() =>
              navigation.navigate(ZoneAgreementsRoutes.SelectClassicAgreement, {
                classicAgreement: item,
                zoneId,
              })
            }
          >
            <Text variant="p2R">{classicAgreementAssets[item].title}</Text>
          </ListItem>
        )}
        ListFooterComponent={() => (
          <FlatList
            data={deletedClassicAgreements}
            refreshControl={refresh}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() =>
              deletedClassicAgreements.length > 0 ? (
                <Box marginTop="l" marginBottom="m">
                  <Text variant="h4">Acuerdos eliminados</Text>
                </Box>
              ) : null
            }
            renderItem={({ item }) =>
              item.Agreement.classic ? (
                <ListItem
                  marginBottom="m"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text variant="p2R">
                    {classicAgreementAssets[item.Agreement.classic].title}
                  </Text>
                  <Button
                    variant="transparentSimplified"
                    paddingHorizontal="xs"
                    title="Restablecer"
                    isLoading={restoreAgreement.isLoading}
                    onPress={() =>
                      restoreAgreement.mutate({
                        zoneAgreementId: item.id,
                        zoneId,
                      })
                    }
                    titleVariant="p3R"
                  />
                </ListItem>
              ) : null
            }
          />
        )}
      />
    </Screen>
  );
};

export default AddAgreementsScreen;
