import agreements from "@andescalada/api/schemas/agreements";
import error from "@andescalada/api/src/utils/errors";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { SoftDelete } from "@andescalada/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { t } from "../createRouter";

export const agreementsRouter = t.router({
  classic: t.procedure.input(agreements.classic).query(({ ctx, input }) =>
    ctx.prisma.agreement.findMany({
      where: { classic: input.classic },
      include: {
        title: { select: { originalText: true } },
        description: { select: { originalText: true } },
      },
    }),
  ),
  addToZoneList: protectedZoneProcedure
    .input(
      agreements.data.merge(agreements.classic).merge(agreements.agreementId),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.permissions.has("EditZoneAgreements")) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "EditZoneAgreements"),
        );
      }
      const agreement = await ctx.prisma.zoneAgreement.create({
        data: {
          Author: { connect: { id: ctx.user.id } },
          Zone: { connect: { id: input.zoneId } },
          Agreement: { connect: { id: input.agreementId } },
          level: input.level,
          comment: !!input.comment
            ? {
                create: {
                  originalText: input.comment,
                  originalLang: {
                    connect: { languageId: "es" },
                  },
                },
              }
            : undefined,
        },
      });

      await ctx.prisma.zone.update({
        where: { id: input.zoneId },
        data: { version: { increment: 1 } },
      });

      return agreement;
    }),
  listByZone: protectedZoneProcedure.query(async ({ ctx, input }) =>
    ctx.prisma.zoneAgreement.findMany({
      where: { zoneId: input.zoneId, isDeleted: SoftDelete.NotDeleted },
      orderBy: { level: "asc" },
      include: {
        Agreement: {
          include: {
            title: { select: { originalText: true } },
            description: { select: { originalText: true } },
            ZoneAgreement: {
              where: { zoneId: input.zoneId },
              select: { comment: { select: { originalText: true } } },
            },
          },
        },
      },
    }),
  ),
  adminListByZone: protectedZoneProcedure.query(async ({ ctx, input }) => {
    if (!ctx.permissions.has("EditZoneAgreements")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "EditZoneAgreements"),
      );
    }
    return ctx.prisma.zoneAgreement.findMany({
      where: {
        zoneId: input.zoneId,
        OR: [
          { isDeleted: SoftDelete.NotDeleted },
          { isDeleted: SoftDelete.DeletedPublic },
        ],
      },
      include: {
        Agreement: {
          include: {
            title: { select: { originalText: true } },
            description: { select: { originalText: true } },
            ZoneAgreement: {
              where: { zoneId: input.zoneId },
              select: { comment: { select: { originalText: true } } },
            },
          },
        },
      },
    });
  }),
  restoreAgreement: protectedZoneProcedure
    .input(agreements.zoneAgreementId)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.permissions.has("EditZoneAgreements")) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "EditZoneAgreements"),
        );
      }
      const agreement = await ctx.prisma.zoneAgreement.update({
        where: { id: input.zoneAgreementId },
        data: { isDeleted: SoftDelete.NotDeleted },
      });

      await ctx.prisma.zone.update({
        where: { id: input.zoneId },
        data: { version: { increment: 1 } },
      });

      return agreement;
    }),
  byId: protectedProcedure
    .input(agreements.zoneAgreementId)
    .query(({ ctx, input }) =>
      ctx.prisma.zoneAgreement.findUnique({
        where: { id: input.zoneAgreementId },
        include: {
          Agreement: { include: { title: true, description: true } },
          comment: true,
        },
      }),
    ),
  delete: protectedZoneProcedure
    .input(
      agreements.zoneAgreementId.merge(
        z.object({ privateDelete: z.boolean().optional() }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.permissions.has("EditZoneAgreements")) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "EditZoneAgreements"),
        );
      }
      const agreement = await ctx.prisma.zoneAgreement.update({
        where: { id: input.zoneAgreementId },
        data: {
          isDeleted: input.privateDelete
            ? SoftDelete.DeletedPrivate
            : SoftDelete.DeletedPublic,
        },
      });

      await ctx.prisma.zone.update({
        where: { id: input.zoneId },
        data: { version: { increment: 1 } },
      });

      return agreement;
    }),
  edit: protectedZoneProcedure
    .input(agreements.zoneAgreementId.merge(agreements.data))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.permissions.has("EditZoneAgreements")) {
        throw new TRPCError(
          error.unauthorizedActionForZone(input.zoneId, "EditZoneAgreements"),
        );
      }
      const author = await ctx.prisma.zoneAgreement.findUnique({
        where: { id: input.zoneAgreementId },
        select: { Author: { select: { id: true } } },
      });

      const agreement = await ctx.prisma.zoneAgreement.update({
        where: { id: input.zoneAgreementId },
        data: {
          level: input.level,
          comment: input.comment
            ? { update: { originalText: input.comment } }
            : undefined,
          coAuthors:
            author?.Author.id === ctx.user.id
              ? undefined
              : {
                  connect: { id: ctx.user.id },
                },
        },
      });

      await ctx.prisma.zone.update({
        where: { id: input.zoneId },
        data: { version: { increment: 1 } },
      });

      return agreement;
    }),
});
