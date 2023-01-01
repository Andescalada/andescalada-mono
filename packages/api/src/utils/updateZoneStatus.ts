import zone from "@andescalada/api/schemas/zone";
import { Context } from "@andescalada/api/src/createContext";
import { Status } from "@prisma/client";

const updateZoneStatus = async (
  ctx: Context,
  input: typeof zone.status._type,
  { allowedPreviousSteps }: { allowedPreviousSteps: Status[] },
) => {
  const currentStatus = await ctx.prisma.zone
    .findUnique({
      where: { id: input.zoneId },
      select: { currentStatus: true },
    })
    .then((res) => res?.currentStatus);

  if (!currentStatus) {
    throw new Error(`Zone ${input.zoneId} not found`);
  }

  if (!allowedPreviousSteps.includes(currentStatus)) {
    throw new Error(
      `Zone ${input.zoneId} is in status ${currentStatus} and cannot be updated to ${input.status}`,
    );
  }

  const res = await ctx.prisma.zone.update({
    where: { id: input.zoneId },
    data: {
      currentStatus: input.status,
      statusHistory: {
        create: {
          status: input.status,
          modifiedBy: { connect: { email: ctx.user!.email } },
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
