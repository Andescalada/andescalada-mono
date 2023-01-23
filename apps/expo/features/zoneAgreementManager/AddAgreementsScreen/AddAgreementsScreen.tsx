import { notNull } from "@andescalada/api/src/utils/filterGuards";
import { ClassicAgreementSchema } from "@andescalada/db/zod";
import {
  ActivityIndicator,
  Box,
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
  const agreements = trpc.zones.agreementsList.useQuery({ zoneId });

  const existingClassicAgreements = useMemo(
    () =>
      agreements.data?.map((a) => a.Agreement.classic).filter(notNull) ?? [],
    [agreements.data],
  );

  const missingClassicAgreements = useMemo(
    () =>
      ClassicAgreementSchema.options.filter(
        (c) => !existingClassicAgreements.includes(c),
      ),
    [existingClassicAgreements],
  );

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
            marginTop="xxxl"
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
            <Text>{classicAgreementAssets[item].title}</Text>
          </ListItem>
        )}
      />
    </Screen>
  );
};

export default AddAgreementsScreen;
