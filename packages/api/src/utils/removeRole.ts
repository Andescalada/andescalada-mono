import { ProtectedContext } from "@andescalada/api/src/utils/protectedProcedure";
import updateRedisPermissions from "@andescalada/api/src/utils/updatePermissions";
import { RoleNames, User, Zone } from "@prisma/client";

const removeRole = async (
  ctx: ProtectedContext,
  input: {
    id?: string;
    relation?: { roleName: RoleNames; zoneId: Zone["id"]; userId: User["id"] };
  },
) => {
  const deletedRole = ctx.prisma.roleByZone.delete({
    where: {
      id: input.id,
      rolebyzone_unique: input.relation,
    },
    select: {
      zoneId: true,
      userId: true,
    },
  });

  const transaction = await ctx.prisma.$transaction([deletedRole]);

  const userId = transaction[0].userId;
  const zoneId = transaction[0].zoneId;

  const user = await ctx.prisma.user.findUnique({
    where: { id: userId },
    select: {
      email: true,
      RoleByZone: {
        where: { zoneId },
        select: {
          id: true,
          Role: {
            select: { permissions: { select: { action: true } } },
          },
        },
      },
    },
  });

  if (user) {
    const newPermissions = user.RoleByZone.flatMap((r) => r.Role)
      .flatMap((r) => r.permissions)
      .flatMap((p) => p.action);

    const permissionSet = new Set(newPermissions);

    await updateRedisPermissions(ctx.access, user.email, zoneId, permissionSet);
  }

  return { userId, zoneId };
};

export default removeRole;
