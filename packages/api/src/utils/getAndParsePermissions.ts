import { Context } from "@andescalada/api/src/createContext";
import { Permissions } from "@andescalada/api/src/types/permissions";

const getAndParsePermissions = async (ctx: Context, zoneId: string) => {
  const permissions: Permissions = new Set();

  const roles = await ctx.prisma.roleByZone.findMany({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    where: { User: { email: ctx.user!.email }, Zone: { id: zoneId } },
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
