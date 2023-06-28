import routeSchema from "@andescalada/api/schemas/route";
import { UpsertAction } from "@andescalada/api/src/types/upsertRoute";
import error from "@andescalada/api/src/utils/errors";
import getMainTopo from "@andescalada/api/src/utils/getMainTopo";
import { ProtectedZoneContext } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { SoftDelete } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const upsertRoute = async ({
  ctx,
  input,
  zoneId,
}: {
  ctx: ProtectedZoneContext;
  input: z.infer<typeof routeSchema.upsertRoute>;
  zoneId: string;
}) => {
  if (input.routeId) {
    const route = await ctx.prisma.route.findUniqueOrThrow({
      where: { id: input.routeId },
      select: { Author: { select: { email: true } }, wallId: true },
    });
    if (
      !ctx.permissions.has("Update") &&
      route?.Author.email !== ctx.user.email
    ) {
      throw new TRPCError(error.unauthorizedActionForZone(zoneId, "Update"));
    }

    const {
      grade,
      kind,
      name,
      unknownName,
      originalGradeSystem,
      originalGrade,
    } = input;

    await ctx.prisma.wall.update({
      where: { id: route.wallId },
      data: { version: { increment: 1 } },
    });

    const updatedRoute = await ctx.prisma.route.update({
      where: { id: input.routeId },
      data: {
        RouteGrade: {
          update: {
            ...grade,
            ...(originalGradeSystem && { originalGradeSystem }),
            ...(originalGrade && { originalGrade }),
          },
        },
        ...(name && { name, slug: slug(name) }),
        kind,
        unknownName,
        version: { increment: 1 },
        coAuthors:
          route?.Author.email === ctx.user.email
            ? undefined
            : {
                connect: { email: ctx.user.email },
              },
      },
      include: {
        Wall: {
          select: {
            name: true,
            Sector: { select: { id: true, sectorKind: true } },
          },
        },
      },
    });

    const mainTopoId = await getMainTopo({
      ctx,
      wallId: route.wallId,
    });

    return {
      ...updatedRoute,
      mainTopoId,
      action: UpsertAction.RouteEdited,
    };
  }

  if (!ctx.permissions.has("Create")) {
    throw new TRPCError(error.unauthorizedActionForZone(zoneId, "Create"));
  }
  const {
    grade,
    kind,
    name,
    originalGradeSystem,
    unknownName,
    originalGrade,
    wallId,
  } = routeSchema.schema.parse(input);

  const maxRoutePosition = await ctx.prisma.route.aggregate({
    where: { wallId: input.wallId, isDeleted: SoftDelete.NotDeleted },
    _max: { position: true },
  });
  const maxMultiPitchPosition = await ctx.prisma.multiPitch.aggregate({
    where: { wallId: input.wallId, isDeleted: SoftDelete.NotDeleted },
    _max: { position: true },
  });

  const biggestPosition =
    Math.max(
      Number(maxRoutePosition._max.position),
      Number(maxMultiPitchPosition._max.position),
    ) ?? 0;

  const newRoute = await ctx.prisma.route.create({
    data: {
      name,
      slug: slug(name),
      Wall: { connect: { id: input.wallId } },
      kind,
      unknownName,
      position: biggestPosition + 1,
      RouteGrade: {
        create: {
          grade: grade.grade,
          project: grade.project,
          ...(originalGradeSystem && {
            originalGradeSystem,
          }),
          ...(originalGrade && { originalGrade }),
        },
      },
      Author: { connect: { email: ctx.user.email } },
    },
    include: {
      Wall: {
        select: {
          name: true,
          Sector: { select: { id: true, sectorKind: true } },
        },
      },
    },
  });

  await ctx.prisma.wall.update({
    where: { id: input.wallId },
    data: { version: { increment: 1 } },
  });

  const mainTopoId = await getMainTopo({ ctx, wallId });

  return {
    ...newRoute,
    mainTopoId,
    action: UpsertAction.RouteAdded,
  };
};

export default upsertRoute;
