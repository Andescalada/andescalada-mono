import user from "@andescalada/api/schemas/user";
import error from "@andescalada/api/src/utils/errors";
import parseUsersToRole from "@andescalada/api/src/utils/parseUsersToRole";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const usersByRole = protectedZoneProcedure
  .input(z.object({ roles: user.rolesArray }))
  .query(async ({ ctx, input }) => {
    const zone = await ctx.prisma.zone.findUnique({
      where: { id: input.zoneId },
      select: {
        infoAccess: true,
        RoleByZone: {
          where: { Role: { OR: input.roles.map((r) => ({ name: r })) } },
          orderBy: { updatedAt: "desc" },
          include: {
            Role: true,
            User: {
              select: {
                name: true,
                id: true,
                username: true,
                profilePhoto: { select: { publicId: true } },
              },
            },
          },
        },
      },
    });

    if (!ctx.permissions.has("Read") && zone?.infoAccess !== "Public") {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Read"),
      );
    }

    const parsedData = parseUsersToRole(zone?.RoleByZone);

    return parsedData;
  });

export default usersByRole;
