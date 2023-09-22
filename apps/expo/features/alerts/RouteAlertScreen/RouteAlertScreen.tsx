import routeAlertKind from "@andescalada/common-assets/routeAlertKind";
import routeAlertSeverity from "@andescalada/common-assets/routeAlertSeverity";
import { routeKindLabel } from "@andescalada/common-assets/routeKind";
import {
  RouteAlertKindSchema,
  RouteAlertSeveritySchema,
} from "@andescalada/db/zod";
import { Box, Button, Pressable, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  AlertsRoutes,
  AlertsScreenProps,
} from "@features/alerts/Navigation/types";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import useGradeSystem from "@hooks/useGradeSystem";
import useOwnInfo from "@hooks/useOwnInfo";
import useRootNavigation from "@hooks/useRootNavigation";
import useGetRouteAlertQuery from "@local-database/hooks/useGetRouteAlertQuery";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import UserProfileImage from "@templates/UserProfileImage/UserProfileImage";
import { FC } from "react";

type Props = AlertsScreenProps<AlertsRoutes.RouteAlert>;

const useRouteAlert = ({
  id,
  zoneId,
  isSynced,
}: {
  id: string;
  zoneId: string;
  isSynced?: boolean;
}) => {
  const localAlert = useGetRouteAlertQuery({ id });
  const remoteAlert = trpc.zones.routeAlert.useQuery(
    {
      id,
      zoneId,
    },
    { enabled: isSynced },
  );

  const userInfo = useOwnInfo();

  if (!isSynced)
    return {
      ...localAlert,
      data: localAlert.data
        ? {
            title: localAlert.data.title,
            description: localAlert.data.description,
            kind: RouteAlertKindSchema.parse(localAlert.data.kind),
            severity: RouteAlertSeveritySchema.parse(localAlert.data.severity),
            updatedAt: localAlert.data.updatedAt,
            Route: null,
            Author: userInfo?.data
              ? {
                  id: userInfo?.data?.id,
                  username: userInfo?.data?.username,
                  profilePhoto: userInfo?.data?.profilePhoto,
                }
              : null,
          }
        : null,
    };

  return {
    ...remoteAlert,
    data: remoteAlert.data
      ? {
          title: remoteAlert.data.title.originalText,
          description: remoteAlert.data.description?.originalText,
          kind: RouteAlertKindSchema.parse(remoteAlert.data.kind),
          severity: RouteAlertSeveritySchema.parse(remoteAlert.data.severity),
          updatedAt: remoteAlert.data.updatedAt,
          Author: {
            id: remoteAlert.data.Author.id,
            username: remoteAlert.data.Author.username,
            profilePhoto: remoteAlert.data.Author.profilePhoto,
          },
          Route: {
            id: remoteAlert.data.Route.id,
            name: remoteAlert.data.Route.name,
            kind: remoteAlert.data.Route.kind,
            Wall: {
              Sector: {
                name: remoteAlert.data.Route.Wall.Sector.name,
              },
            },
            RouteGrade: remoteAlert.data.Route.RouteGrade
              ? {
                  grade: remoteAlert.data.Route.RouteGrade.grade,
                  project: remoteAlert.data.Route.RouteGrade.project,
                }
              : null,
          },
        }
      : null,
  };
};

const RouteAlertScreen: FC<Props> = ({
  route: {
    params: { routeAlertId, zoneId, isSynced },
  },
}) => {
  const { data } = useRouteAlert({ id: routeAlertId, zoneId, isSynced });

  const { gradeLabel } = useGradeSystem();

  const ownInfo = useOwnInfo();

  const rootNavigation = useRootNavigation();

  if (!data) return null;
  return (
    <Screen padding="m" safeAreaDisabled gap="s">
      <Box
        alignItems="center"
        justifyContent="flex-end"
        flexDirection="row"
        gap="s"
      >
        {ownInfo?.data?.id === data?.Author?.id && (
          <Button
            variant="infoSimplified"
            title="Editar"
            titleVariant="p3R"
            icon="pencil-outline"
            flexDirection="row-reverse"
            gap="s"
            iconProps={{ size: 16 }}
            padding="s"
          />
        )}
        <Button
          variant="errorSimplified"
          title="Desestimar"
          titleVariant="p3R"
          icon="remove-circle-outline"
          flexDirection="row-reverse"
          gap="s"
          iconProps={{ size: 16 }}
          padding="s"
        />
      </Box>
      <Text variant="h1">{data.title}</Text>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {data.Author && (
          <Box flexDirection="row" gap="s" alignItems="center">
            <UserProfileImage
              publicId={data.Author.profilePhoto?.publicId || undefined}
              style={{ width: 30, height: 30, borderRadius: 15 }}
            />
            <Box>
              <Text>Autor/a</Text>
              <Text>{"@" + data.Author.username}</Text>
            </Box>
          </Box>
        )}
        <Box alignItems="flex-end">
          <Text>Última actualización</Text>
          <Text>{data.updatedAt.toLocaleDateString("es-CL")}</Text>
        </Box>
      </Box>
      <Box flexDirection="row" alignItems="center" gap="s" marginTop="s">
        <Box
          backgroundColor="semantic.info"
          borderRadius={16}
          padding="xs"
          paddingHorizontal="s"
        >
          <Text>{"Tipo: " + routeAlertKind(data.kind).label}</Text>
        </Box>
        <Box
          borderRadius={16}
          padding="xs"
          paddingHorizontal="s"
          backgroundColor={routeAlertSeverity(data.severity).backgroundColor}
        >
          <Text color={routeAlertSeverity(data.severity).color}>
            {"Gravedad: " + routeAlertSeverity(data.severity).label}
          </Text>
        </Box>
      </Box>
      <Box bg="backgroundContrast" borderRadius={8} padding="m">
        <Text variant="p2R" color="background">
          {data.description ?? "Sin descripción"}
        </Text>
      </Box>
      {data.Route && (
        <Box>
          <Text variant="h2">Ruta</Text>
          <Pressable
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            borderColor="grayscale.300"
            borderWidth={2}
            borderRadius={8}
            padding="m"
            onPress={() => {
              rootNavigation.navigate(RootNavigationRoutes.Climbs, {
                screen: ClimbsNavigationRoutes.Route,
                params: {
                  routeId: data.Route.id,
                  routeName: data.Route.name,
                  zoneId,
                },
              });
            }}
          >
            <Box flexDirection="row" gap="s" flex={1}>
              <Box>
                <Text variant="p1R">{data.Route.name}</Text>
                <Text>
                  {routeKindLabel(data.Route.kind).long}

                  <Text color="grayscale.500">
                    {" - "}
                    {data.Route.Wall.Sector.name}
                  </Text>
                </Text>
              </Box>
            </Box>
            {data.Route.RouteGrade && (
              <Text variant="p1R">
                {gradeLabel(
                  {
                    grade: data.Route.RouteGrade.grade,
                    project: data.Route.RouteGrade.project,
                  },
                  data.Route.kind,
                )}
              </Text>
            )}
          </Pressable>
        </Box>
      )}
    </Screen>
  );
};

export default RouteAlertScreen;
