import routeAlertKind from "@andescalada/common-assets/routeAlertKind";
import routeAlertSeverity from "@andescalada/common-assets/routeAlertSeverity";
import { Box, Button, Header, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  AlertsRoutes,
  AlertsScreenProps,
} from "@features/alerts/Navigation/types";
import RouteAlertCard from "@features/components/RouteAlertCard";
import { FC } from "react";
import { FlatList } from "react-native";

type Props = AlertsScreenProps<AlertsRoutes.RouteAlertsList>;

const RouteAlertsListScreen: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId },
  },
}) => {
  const routeAlerts = trpc.zones.routeAlerts.useQuery({
    zoneId,
  });

  return (
    <Screen padding="m">
      <Header title="Alertas en rutas" showOptions={false} marginBottom="m" />
      <FlatList
        ListEmptyComponent={() => (
          <Box
            height={50}
            marginTop="s"
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
          <RouteAlertCard
            title={item.title.originalText}
            date={item.updatedAt}
            routeName={item.Route.name}
            routeId={item.Route.id}
            sectorName={item.Route.Wall.Sector.name}
            zoneId={zoneId}
            kind={item.kind}
            severity={item.severity}
          />
        )}
      />
      <Button
        variant="infoSimplified"
        title="Agregar alerta"
        titleVariant="p1R"
        icon="add-circle"
        iconProps={{ size: 24 }}
        padding="s"
        gap="s"
        flexDirection="row-reverse"
        marginBottom="l"
        onPress={() =>
          navigation.navigate(AlertsRoutes.AddRouteAlert, { zoneId })
        }
      />
    </Screen>
  );
};

export default RouteAlertsListScreen;
