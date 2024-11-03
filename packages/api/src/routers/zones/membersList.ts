import user from "@andescalada/api/schemas/user";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const membersList = protectedZoneProcedure
  .input(z.object({ roles: user.rolesArray }))
  .query(async ({ ctx, input }) => {
    const zone = await ctx.prisma.zone.findUniqueOrThrow({
      where: { id: input.zoneId },
      select: {
        infoAccess: true,
        RoleByZone: {
          where: { Role: { OR: input.roles.map((r) => ({ name: r })) } },
          orderBy: { createdAt: "desc" },
          include: {
            Role: true,
            AssignedBy: {
              select: {
                name: true,
                id: true,
                username: true,
                profilePhoto: { select: { publicId: true } },
              },
            },
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

    const uniqueUsers = new Set(
      zone.RoleByZone.sort(
        (a, b) => -a.createdAt.getTime() + b.createdAt.getTime(),
      ).map((r) => r.User.id),
    );

    const parsedData = Array.from(uniqueUsers).map((userId) => {
      const r = zone.RoleByZone.find((u) => u.User.id === userId);
      if (!r) throw new Error("User not found");
      return {
        ...r.User,
        assignedBy: r.AssignedBy,
        assignedAt: r.createdAt,
      };
    });

    return parsedData;
  });
