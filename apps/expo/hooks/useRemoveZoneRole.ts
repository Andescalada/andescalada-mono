import user from "@andescalada/api/schemas/user";
import { Zone } from "@andescalada/db";
import { trpc } from "@andescalada/utils/trpc";

interface Args {
  invalidation: { zoneId: Zone["id"]; roles: typeof user.rolesArray._type };
}

const useRemoveZoneRole = ({ invalidation: { zoneId, roles } }: Args) => {
  const utils = trpc.useContext();
  return trpc.user.removeZoneRole.useMutation({
    onMutate: async ({ userId }) => {
      await utils.zones.usersByRole.cancel({
        roles,
        zoneId,
      });
      const previousData = utils.zones.usersByRole.getData({
        roles,
        zoneId,
      });
      utils.zones.usersByRole.setData(
        {
          roles,
          zoneId,
        },
        (old) =>
          old
            ? old.map((list) => ({
                role: list.role,
                users: list.users.filter((u) => u.id !== userId),
              }))
            : old,
      );
      return { previousData };
    },
    onError: (_, __, context) => {
      if (context?.previousData) {
        utils.zones.usersByRole.setData(
          {
            roles,
            zoneId,
          },
          context.previousData,
        );
      }
    },
    onSuccess: () => {
      utils.zones.usersByRole.invalidate({
        roles,
        zoneId,
      });
    },
  });
};

export default useRemoveZoneRole;
