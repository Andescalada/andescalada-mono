import { Context } from "@andescalada/api/src/createContext";
import error from "@andescalada/api/src/utils/errors";
import updateRedisPermissions from "@andescalada/api/src/utils/updatePermissions";
import { RoleNames } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const assignAndCacheRole = async (
  ctx: Context,
  input: {
    zoneId: string;
    role: RoleNames;
    username?: string;
    email?: string;
    userId?: string;
  },
) => {
  if (!ctx.user) {
    throw new TRPCError(error.userNotFound());
  }

  const roleExist = await ctx.prisma.roleByZone.findMany({
    where: {
      User: {
        OR: { username: input.username, email: input.email, id: input.userId },
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
          email: input.email,
          username: input.username,
          id: input.userId,
        },
      },
      Role: { connect: { name: input.role } },
      Zone: { connect: { id: input.zoneId } },
      AssignedBy: { connect: { email: ctx.user.email } },
    },
    select: {
      Zone: { select: { name: true } },
      User: {
        select: {
          id: true,
          email: true,
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

  await updateRedisPermissions(
    ctx.access,
    roles.User.email,
    input.zoneId,
    newPermissions,
  );

  return { filteredRoles, data: roles };
};

export default assignAndCacheRole;
