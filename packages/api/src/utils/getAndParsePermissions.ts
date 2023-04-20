import { Permissions } from "@andescalada/api/src/types/permissions";
import { ProtectedContext } from "@andescalada/api/src/utils/protectedProcedure";

const getAndParsePermissions = async (
  ctx: ProtectedContext,
  zoneId: string,
) => {
  const permissions: Permissions = new Set();

  const roles = await ctx.prisma.roleByZone.findMany({
    where: { User: { email: ctx.user.email }, Zone: { id: zoneId } },
    select: {
      Role: {
        select: { permissions: { select: { action: true } } },
      },
    },
  });

  if (!roles) return permissions;

  const newPermissions = roles
    .flatMap((r) => r.Role.permissions)
    .flatMap((p) => p.action);

  const updatedPermissions = new Set(newPermissions);

  return updatedPermissions;
};

export default getAndParsePermissions;
