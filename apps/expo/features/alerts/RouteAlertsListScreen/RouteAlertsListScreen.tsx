import { RouteAlertSeveritySchema } from "@andescalada/db/zod";
import { Box, Button, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  AlertsRoutes,
  AlertsScreenProps,
} from "@features/alerts/Navigation/types";
import RouteAlertCard from "@features/components/RouteAlertCard";
import useGetRouteAlertsQuery from "@local-database/hooks/useGetRouteAlertsQuery";
import { FC } from "react";
import { FlatList } from "react-native";

import { RouteAlertKindSchema } from "../../../../../packages/db/zod/enums/RouteAlertKind";

type Props = AlertsScreenProps<AlertsRoutes.RouteAlertsList>;

const RouteAlertsListScreen: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId },
  },
}) => {
  const routeAlerts = trpc.zones.routeAlertList.useQuery({
    zoneId,
  });

  const offlineRouteAlerts = useGetRouteAlertsQuery({ zoneId });

  const offlineRouteAlertsNotSynced = offlineRouteAlerts.data?.filter(
    ({ syncStatus }) => syncStatus !== "synced",
  );

  const isOfflineAlerts = !!offlineRouteAlertsNotSynced?.length;

  return (
    <Screen safeAreaDisabled marginTop="m">
      <FlatList
        ListHeaderComponent={() =>
          isOfflineAlerts ? (
            <Box
              marginBottom="m"
              borderRadius={16}
              borderWidth={2}
              borderColor="semantic.warning"
              borderStyle="dashed"
              padding="m"
            >
              <Text variant="p2R">Alertas sin sincronizar</Text>
              <FlatList
                data={offlineRouteAlertsNotSynced}
                ItemSeparatorComponent={() => <Box height={8} />}
                renderItem={({ item }) => (
                  <RouteAlertCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    date={item.updatedAt}
                    routeName={item.routeName}
                    routeId={item.routeId}
                    sectorName={item.sectorName}
                    zoneId={zoneId}
                    kind={RouteAlertKindSchema.parse(item.kind)}
                    severity={RouteAlertSeveritySchema.parse(item.severity)}
                  />
                )}
              />
            </Box>
          ) : null
        }
        ListEmptyComponent={() => (
          <Box
            height={50}
            justifyContent="center"
            alignItems="center"
            bg="grayscale.transparent.50.300"
            borderRadius={8}
          >
            <Text>Sin alertas</Text>
          </Box>
        )}
        data={routeAlerts.data}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Box height={8} />}
        renderItem={({ item }) => (
          <Box paddingHorizontal="m">
            <RouteAlertCard
              id={item.id}
              title={item.title.originalText}
              date={item.updatedAt}
              routeName={item.Route.name}
              routeId={item.Route.id}
              sectorName={item.Route.Wall.Sector.name}
              zoneId={zoneId}
              kind={item.kind}
              severity={item.severity}
            />
          </Box>
        )}
      />
      <Button
        variant="infoSimplified"
        title="Agregar alerta"
        titleVariant="p1R"
        icon="add-circle"
        iconProps={{ size: 24 }}
        padding="s"
        marginHorizontal="m"
        gap="s"
        flexDirection="row-reverse"
        marginBottom="xl"
        onPress={() =>
          navigation.navigate(AlertsRoutes.AddRouteAlert, { zoneId })
        }
      />
    </Screen>
  );
};

export default RouteAlertsListScreen;
