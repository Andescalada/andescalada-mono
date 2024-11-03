import error from "@andescalada/api/src/utils/errors";
import { ProtectedContext } from "@andescalada/api/src/utils/protectedProcedure";
import updateRedisPermissions from "@andescalada/api/src/utils/updatePermissions";
import { RoleNames } from "@andescalada/db";
import { TRPCError } from "@trpc/server";

const assignAndCacheRole = async (
  ctx: ProtectedContext,
  input: {
    zoneId: string;
    role: RoleNames;
    username?: string;
    userId?: string;
  },
) => {
  if (!ctx.user) {
    throw new TRPCError(error.userNotFound());
  }

  const roleExist = await ctx.prisma.roleByZone.findMany({
    where: {
      User: {
        OR: [{ username: input.username }, { id: input.userId }],
      },
      Zone: { id: input.zoneId },
      Role: { name: input.role },
    },
  });

  if (roleExist.length > 0) {
    throw new TRPCError({
      code: "CONFLICT",
      message: `User ${input.username} already has role ${input.role} in zone ${input.zoneId}`,
    });
  }

  const createRole = ctx.prisma.roleByZone.create({
    data: {
      User: {
        connect: {
          username: input.username,
          id: input.userId,
        },
      },
      Role: { connect: { name: input.role } },
      Zone: { connect: { id: input.zoneId } },
      AssignedBy: { connect: { id: ctx.user.id } },
    },
    select: {
      Zone: { select: { name: true } },
      User: {
        select: {
          id: true,
          RoleByZone: {
            select: {
              id: true,
              zoneId: true,
              Zone: { select: { name: true } },
              Role: {
                select: { permissions: { select: { action: true } } },
              },
            },
          },
        },
      },
    },
  });

  const transaction = await ctx.prisma.$transaction([createRole]);

  const roles = transaction[0];

  const filteredRoles = roles.User.RoleByZone.filter(
    (r) => r.zoneId === input.zoneId,
  );

  const newPermissions = filteredRoles
    .flatMap((r) => r.Role.permissions)
    .flatMap((p) => p.action);

  const permissionSet = new Set(newPermissions);

  await updateRedisPermissions(
    ctx.access,
    roles.User.id,
    input.zoneId,
    permissionSet,
  );

  return { filteredRoles, data: roles };
};

export default assignAndCacheRole;
