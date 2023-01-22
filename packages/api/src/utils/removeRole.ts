import { Context } from "@andescalada/api/src/createContext";
import updateRedisPermissions from "@andescalada/api/src/utils/updatePermissions";

const removeRole = async (
  ctx: Context,
  input: {
    roleByZoneId: string;
  },
) => {
  const deletedRole = ctx.prisma.roleByZone.delete({
    where: { id: input.roleByZoneId },
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

    await updateRedisPermissions(
      ctx.access,
      user.email,
      zoneId,
      newPermissions,
    );
  }

  return { userId, zoneId };
};

export default removeRole;
