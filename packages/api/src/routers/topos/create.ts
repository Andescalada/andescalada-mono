import topo from "@andescalada/api/schemas/topo";
import error from "@andescalada/api/src/utils/errors";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { VerificationStatus } from "@andescalada/db";
import { TRPCError } from "@trpc/server";

export const create = protectedZoneProcedure
  .input(topo.schema)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.permissions.has("Create")) {
      throw new TRPCError(
        error.unauthorizedActionForZone(input.zoneId, "Create"),
      );
    }

    const wallHasMainTopo = await ctx.prisma.topo.count({
      where: { wallId: input.wallId, main: true },
    });

    const main =
      wallHasMainTopo === 0 && ctx.permissions.has("Create") ? true : false;

    return ctx.prisma.topo.create({
      data: {
        main,
        name: input.name,
        slug: slug(input.name),
        Wall: { connect: { id: input.wallId } },
        image: {
          create: input.image,
        },
        Author: { connect: { id: ctx.user.id } },
        Verification: {
          create: {
            status: ctx.permissions.has("Create")
              ? VerificationStatus.Approved
              : VerificationStatus.Pending,
            ...(ctx.permissions.has("Create") && {
              VerifierUser: { connect: { id: ctx.user.id } },
            }),
          },
        },
      },
    });
  });
