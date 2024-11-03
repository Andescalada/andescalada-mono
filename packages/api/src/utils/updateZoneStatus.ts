import zone from "@andescalada/api/schemas/zone";
import error from "@andescalada/api/src/utils/errors";
import { ProtectedContext } from "@andescalada/api/src/utils/protectedProcedure";
import { Status } from "@andescalada/db";
import { TRPCError } from "@trpc/server";

const updateZoneStatus = async (
  ctx: ProtectedContext,
  input: typeof zone.status._type,
  { allowedPreviousSteps }: { allowedPreviousSteps: Status[] },
) => {
  if (!ctx.user) {
    throw new TRPCError(error.userNotFound());
  }
  const currentStatus = await ctx.prisma.zone
    .findUnique({
      where: { id: input.zoneId },
      select: { currentStatus: true },
    })
    .then((res) => res?.currentStatus);

  if (!currentStatus) {
    throw new TRPCError(error.zoneNotFound(input.zoneId));
  }

  if (!allowedPreviousSteps.includes(currentStatus)) {
    throw new TRPCError(
      error.notValidStatusFlow(input.zoneId, currentStatus, input.status),
    );
  }

  const res = await ctx.prisma.zone.update({
    where: { id: input.zoneId },
    data: {
      currentStatus: input.status,
      statusHistory: {
        create: {
          status: input.status,
          modifiedBy: { connect: { id: ctx.user.id } },
          message: {
            create: {
              originalText: input.message,
              // TODO: Get Language from user
              originalLang: { connect: { languageId: "es" } },
            },
          },
        },
      },
    },
  });
  return res;
};

export default updateZoneStatus;
