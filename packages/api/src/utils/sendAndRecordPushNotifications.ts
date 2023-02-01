import { Context } from "@andescalada/api/src/createContext";
import error from "@andescalada/api/src/utils/errors";
import sendPushNotification from "@andescalada/api/src/utils/sendPushNotification";
import { Entity, EntityTypeId } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const sendAndRecordPushNotification = async (
  ctx: Context,
  {
    entityId,
    entityTypeId,
    Entity,
    message,
    receivers,
  }: {
    receivers: { email: string; id: string }[];
    entityId: string;
    entityTypeId: EntityTypeId;
    Entity: Entity;
    message: string;
  },
) => {
  if (!ctx.user) {
    throw new TRPCError(error.userNotFound());
  }
  try {
    if (receivers.length <= 0) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No admins found to notify",
      });
    }
    await ctx.prisma.notificationObject.create({
      data: {
        entityId,
        Entity,
        entityTypeId,
        messageSent: message,
        NotificationSender: {
          create: { Sender: { connect: { email: ctx.user.email } } },
        },
        NotificationReceiver: {
          createMany: {
            data: receivers.map((r) => ({ receiverId: r.id })),
          },
        },
      },
    });

    await sendPushNotification(
      ctx,
      { body: message },
      receivers.map((r) => r.email),
    );
  } catch (err) {}
};

export default sendAndRecordPushNotification;
