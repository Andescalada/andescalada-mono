import routeAlertKind from "@andescalada/common-assets/routeAlertKind";
import routeAlertSeverity from "@andescalada/common-assets/routeAlertSeverity";
import {
  RouteAlertKindSchema,
  RouteAlertSeveritySchema,
} from "@andescalada/db/zod";
import { Box, Ionicons, Pressable, Text } from "@andescalada/ui";
import { AlertsRoutes } from "@features/alerts/Navigation/types";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { ComponentProps, FC } from "react";
import { Alert } from "react-native";

interface Props extends ComponentProps<typeof Pressable> {
  id: string;
  title: string;
  date: Date;
  routeName?: string;
  routeId: string;
  sectorName?: string;
  zoneId: string;
  kind: typeof RouteAlertKindSchema._type;
  severity: typeof RouteAlertSeveritySchema._type;
  isNotSynced?: boolean;
}

const RouteAlertCard: FC<Props> = (props) => {
  const rootNavigation = useRootNavigation();
  const hideRouteName =
    props.routeName === undefined || props.sectorName === undefined;
  return (
    <Pressable
      flex={1}
      bg="grayscale.transparent.50.300"
      borderRadius={8}
      padding="s"
      {...props}
      onPress={() => {
        rootNavigation.navigate(RootNavigationRoutes.Alert, {
          screen: AlertsRoutes.RouteAlert,
          params: {
            routeAlertId: props.id,
            zoneId: props.zoneId,
            isSynced: !props.isNotSynced,
          },
        });
      }}
    >
      {props.isNotSynced && (
        <Pressable
          flexDirection="row"
          gap="xs"
          alignSelf="flex-end"
          height={20}
          paddingHorizontal="xs"
          // width={20}
          borderRadius={10}
          bg="semantic.warning"
          justifyContent="center"
          alignItems="center"
          onPress={() => {
            Alert.alert(
              "Alerta sin sincronizar",
              "Cuando vuelvas a tener internet se sincronizará automáticamente",
            );
          }}
        >
          <Text color="grayscale.black">No sincronizada</Text>
          <Ionicons
            name="cloud-offline-outline"
            size={16}
            color="grayscale.black"
          />
        </Pressable>
      )}
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        flex={1}
        gap="xs"
      >
        <Box flex={1}>
          <Text variant="p2R" numberOfLines={1} ellipsizeMode="middle">
            {props.title}
          </Text>
        </Box>
        <Box>
          <Text variant="p3R">{props.date.toLocaleDateString("es-CL")}</Text>
        </Box>
      </Box>
      {!hideRouteName && (
        <Text
          color="grayscale.300"
          numberOfLines={1}
          ellipsizeMode="middle"
        >{`${props.routeName} - ${props.sectorName}`}</Text>
      )}
      <Box flexDirection="row" alignItems="center" gap="s" marginTop="s">
        <Box
          backgroundColor="semantic.info"
          borderRadius={16}
          padding="xs"
          paddingHorizontal="s"
        >
          <Text>{"Tipo: " + routeAlertKind(props.kind).label}</Text>
        </Box>
        <Box
          borderRadius={16}
          padding="xs"
          paddingHorizontal="s"
          backgroundColor={routeAlertSeverity(props.severity).backgroundColor}
        >
          <Text color={routeAlertSeverity(props.severity).color}>
            {"Gravedad: " + routeAlertSeverity(props.severity).label}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
};

export default RouteAlertCard;
