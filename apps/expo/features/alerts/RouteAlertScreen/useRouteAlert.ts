import {
  RouteAlertKindSchema,
  RouteAlertSeveritySchema,
} from "@andescalada/db/zod";
import { trpc } from "@andescalada/utils/trpc";
import useOwnInfo from "@hooks/useOwnInfo";
import useGetRouteAlertQuery from "@local-database/hooks/useGetRouteAlertQuery";

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
  const remoteAlert = trpc.alerts.byId.useQuery(
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
            id: localAlert.data.id,
            title: localAlert.data.title,
            description: localAlert.data.description,
            kind: RouteAlertKindSchema.parse(localAlert.data.kind),
            severity: RouteAlertSeveritySchema.parse(localAlert.data.severity),
            dueDate: localAlert.data.dueDate ?? undefined,
            updatedAt: localAlert.data.updatedAt,
            Route: {
              id: localAlert.data.routeId,
              name: localAlert.data.routeName,
              sectorName: localAlert.data.sectorName,
              RouteGrade: null,
              kind: undefined,
            },
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
          id: remoteAlert.data.id,
          title: remoteAlert.data.title.originalText,
          description: remoteAlert.data.description?.originalText,
          dueDate: remoteAlert.data.dueDate ?? undefined,
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
            sectorName: remoteAlert.data.Route.Wall.Sector.name,
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

export default useRouteAlert;
