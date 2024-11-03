import routeSchema from "@andescalada/api/schemas/route";
import { UpsertAction } from "@andescalada/api/src/types/upsertRoute";
import getMainTopo from "@andescalada/api/src/utils/getMainTopo";
import { ProtectedZoneContext } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const upsertExtension = async ({
  ctx,
  input,
}: {
  ctx: ProtectedZoneContext;
  input: z.infer<typeof routeSchema.addExtension>;
}) => {
  if (!ctx.permissions.has("Create")) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const extendedRoute = await ctx.prisma.route.findUnique({
    where: { id: input.extendedRouteId },
  });

  if (!extendedRoute) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `No route with id '${input.extendedRouteId}'`,
    });
  }

  const newExtension = await ctx.prisma.route.create({
    data: {
      name: input.name,
      slug: slug(input.name),
      Wall: { connect: { id: extendedRoute.wallId } },
      kind: input.kind,
      unknownName: input.unknownName,
      position: extendedRoute.position,
      RouteGrade: {
        create: { grade: input.grade.grade, project: input.grade.project },
      },
      ExtendedRoute: { connect: { id: input.extendedRouteId } },
      Author: { connect: { id: ctx.user.id } },
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
    wallId: extendedRoute.wallId,
  });

  return {
    ...newExtension,
    mainTopoId,
    action: UpsertAction.ExtensionAdded,
  };
};

export default upsertExtension;
