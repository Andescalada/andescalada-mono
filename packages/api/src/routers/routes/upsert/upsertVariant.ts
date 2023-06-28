import routeSchema from "@andescalada/api/schemas/route";
import { UpsertAction } from "@andescalada/api/src/types/upsertRoute";
import getMainTopo from "@andescalada/api/src/utils/getMainTopo";
import { ProtectedZoneContext } from "@andescalada/api/src/utils/protectedZoneProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const upsertVariant = async ({
  ctx,
  input,
}: {
  ctx: ProtectedZoneContext;
  input: z.infer<typeof routeSchema.addVariant>;
}) => {
  if (!ctx.permissions.has("Create")) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const variantRoute = await ctx.prisma.route.findUnique({
    where: { id: input.variantRouteId },
  });

  if (!variantRoute) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `No route with id '${input.variantRouteId}'`,
    });
  }

  const newVariant = await ctx.prisma.route.create({
    data: {
      name: input.name,
      slug: slug(input.name),
      Wall: { connect: { id: variantRoute.wallId } },
      kind: input.kind,
      unknownName: input.unknownName,
      position: variantRoute.position,
      RouteGrade: {
        create: { grade: input.grade.grade, project: input.grade.project },
      },
      VariantRoute: { connect: { id: input.variantRouteId } },
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

  const mainTopoId = await getMainTopo({
    ctx,
    wallId: variantRoute.wallId,
  });

  return {
    ...newVariant,
    mainTopoId,
    action: UpsertAction.VariantAdded,
  };
};

export default upsertVariant;
