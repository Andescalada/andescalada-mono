import { Context } from "@andescalada/api/src/createContext";
import sendPushNotification from "@andescalada/api/src/utils/sendPushNotification";
import { Entity, EntityTypeId } from "@prisma/client";

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
  try {
    if (receivers.length <= 0) {
      throw new Error("No admins found to notify");
    }
    await ctx.prisma.notificationObject.create({
      data: {
        entityId,
        Entity,
        entityTypeId,
        messageSent: message,
        NotificationSender: {
          create: { Sender: { connect: { email: ctx.user!.email } } },
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
