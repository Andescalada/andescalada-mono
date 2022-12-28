import zone from "@andescalada/api/schemas/zone";
import { Context } from "@andescalada/api/src/createContext";

const updateZoneStatus = (ctx: Context, input: typeof zone.status._type) =>
  ctx.prisma.zone.update({
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

export default updateZoneStatus;
