import user from "@andescalada/api/schemas/user";
import zone from "@andescalada/api/schemas/zone";
import { Access, Permissions } from "@andescalada/api/src/types/permissions";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { deserialize } from "superjson";

import { t } from "../createRouter";

export const userRouter = t.router({
  ownInfo: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.user.findUnique({
      where: { email: ctx.user.email },
      select: {
        email: true,
        firstLogin: true,
        id: true,
        profilePhoto: true,
        name: true,
        preferredTradGrade: true,
        preferredBoulderGrade: true,
        preferredSportGrade: true,
        username: true,
      },
    }),
  ),
  edit: protectedProcedure.input(user.schema).mutation(({ ctx, input }) =>
    ctx.prisma.user.update({
      where: { email: ctx.user.email },
      data: {
        name: input.name,
        username: input.username,
        profilePhoto: input.image ? { create: input.image } : undefined,
        firstLogin: false,
      },
    }),
  ),
  editGradingSystem: protectedProcedure
    .input(user.gradeSystem)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { email: ctx.user.email },
        data: {
          preferredTradGrade: input.preferredTradGrade,
          preferredSportGrade: input.preferredSportGrade,
          preferredBoulderGrade: input.preferredBoulderGrade,
        },
      });
    }),
  zonePermissions: protectedProcedure
    .input(zone.id)
    .query(async ({ ctx, input }) => {
      const res = await ctx.access.hget<Access>(ctx.user.email, input.zoneId);
      let permissions: Permissions = new Set();
      if (res) {
        permissions = deserialize<Permissions>(res);
      }

      return permissions;
    }),
  uniqueUsername: protectedProcedure
    .input(user.schema.pick({ username: true }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { username: input.username },
      });
      if (!user) return true;
      return false;
    }),
});
