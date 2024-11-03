import { AppRouter } from "@andescalada/api/src/routers/_app";
import { EntityTypeIdSchema } from "@andescalada/db/zod";
import { trpc } from "@andescalada/utils/trpc";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import { InfoAccessManagerRoutes } from "@features/InfoAccessManager/Navigation/types";
import { ZoneManagerRoutes } from "@features/zoneManager/Navigation/types";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { inferProcedureOutput } from "@trpc/server";
import { useCallback } from "react";

type Action = {
  [key in typeof EntityTypeIdSchema._type]: (...values: any[]) => void;
};

type NotificationType = inferProcedureOutput<
  AppRouter["user"]["notifications"]
>[0];

const useNotificationPress = () => {
  const rootNavigation = useRootNavigation();
  const utils = trpc.useContext();
  const setNotificationToRead = trpc.user.setNotificationToRead.useMutation({
    onSuccess: () => {
      utils.user.notifications.invalidate();
    },
  });
  const onPressHandler = useCallback(
    async (item: NotificationType) => {
      if (!item.isRead) setNotificationToRead.mutate(item.id);
      const action = {
        ApproveZoneReview() {
          if ("zone" in item && item.zone?.id && item.zone?.name) {
            rootNavigation.navigate(RootNavigationRoutes.ZoneManager, {
              screen: ZoneManagerRoutes.EditZoneStatus,
              params: { zoneId: item.zone?.id, zoneName: item.zone?.name },
            });
          }
        },
        RejectZoneReview() {
          if ("zone" in item && item.zone?.id && item.zone?.name) {
            rootNavigation.navigate(RootNavigationRoutes.ZoneManager, {
              screen: ZoneManagerRoutes.EditZoneStatus,
              params: { zoneId: item.zone?.id, zoneName: item.zone?.name },
            });
          }
        },
        ZoneReviewAssigned() {
          if ("zone" in item && item.zone?.id && item.zone?.name) {
            rootNavigation.navigate(RootNavigationRoutes.Climbs, {
              screen: ClimbsNavigationRoutes.Zone,
              params: { zoneId: item.zone?.id, zoneName: item.zone?.name },
            });
          }
        },
        PausePublicationByAdmin() {
          if ("zone" in item && item.zone?.id && item.zone?.name) {
            rootNavigation.navigate(RootNavigationRoutes.Climbs, {
              screen: ClimbsNavigationRoutes.Zone,
              params: { zoneId: item.zone?.id, zoneName: item.zone?.name },
            });
          }
        },
        PublishZoneByAdmin() {
          if ("zone" in item && item.zone?.id && item.zone?.name) {
            rootNavigation.navigate(RootNavigationRoutes.Climbs, {
              screen: ClimbsNavigationRoutes.Zone,
              params: { zoneId: item.zone?.id, zoneName: item.zone?.name },
            });
          }
        },
        RequestZoneAccess() {
          if ("zone" in item && item.zone?.id && item.zone?.name) {
            rootNavigation.navigate(RootNavigationRoutes.InfoAccessManager, {
              screen: InfoAccessManagerRoutes.MembersScreen,
              params: { zoneId: item.zone?.id, zoneName: item.zone?.name },
            });
          }
        },
        ApproveZoneAccess() {
          if ("zone" in item && item.zone?.id && item.zone?.name) {
            rootNavigation.navigate(RootNavigationRoutes.Climbs, {
              screen: ClimbsNavigationRoutes.Zone,
              params: { zoneId: item.zone?.id, zoneName: item.zone?.name },
            });
          }
        },
        AssignNewZoneRole() {
          if ("zone" in item && item.zone?.id && item.zone?.name) {
            rootNavigation.navigate(RootNavigationRoutes.Climbs, {
              screen: ClimbsNavigationRoutes.Zone,
              params: { zoneId: item.zone?.id, zoneName: item.zone?.name },
            });
          }
        },
        RequestZoneReview() {
          if ("zone" in item && item.zone?.id && item.zone?.name) {
            rootNavigation.navigate(RootNavigationRoutes.ZoneManager, {
              screen: ZoneManagerRoutes.EditZoneStatus,
              params: { zoneId: item.zone?.id, zoneName: item.zone?.name },
            });
          }
        },
        UnpublishZoneByReviewer() {
          if ("zone" in item && item.zone?.id && item.zone?.name) {
            rootNavigation.navigate(RootNavigationRoutes.ZoneManager, {
              screen: ZoneManagerRoutes.EditZoneStatus,
              params: { zoneId: item.zone?.id, zoneName: item.zone?.name },
            });
          }
        },
      } satisfies Action;

      action[item.Object.entityTypeId]();
    },
    [rootNavigation, setNotificationToRead],
  );

  return onPressHandler;
};

export default useNotificationPress;
