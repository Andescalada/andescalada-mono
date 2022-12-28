import { Context } from "@andescalada/api/src/createContext";
import { isDefined, notNull } from "@andescalada/api/src/utils/filterGuards";
import { TRPCError } from "@trpc/server";
import Expo, { ExpoPushMessage } from "expo-server-sdk";

const sendPushNotification = async (
  ctx: Context,
  { body, data }: { body: string; data?: object },
  usersEmail: string[],
) => {
  const tokensPromise = usersEmail.map((email) =>
    ctx.access.hgetall<Record<string, string>>(`notificationTokens:${email}`),
  );

  const tokens = await Promise.allSettled(tokensPromise).then((t) =>
    t
      .map((r) => (r.status === "fulfilled" ? r.value : null))
      .filter(notNull)
      .map((t) => Object.values(t))
      .flat(),
  );

  const expo = new Expo();

  const messages = tokens
    .map((pushToken) => {
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        return;
      }

      return {
        to: pushToken,
        sound: "default",
        body,
        data,
      } as ExpoPushMessage;
    })
    .filter(isDefined);

  const chunks = expo.chunkPushNotifications(messages);

  const ticketsPromise = chunks.map(async (chunk) => {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);

      return ticketChunk;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: JSON.stringify(error),
      });
    }
  });

  const tickets = (await Promise.allSettled(ticketsPromise))
    .map((r) => (r.status === "fulfilled" ? r.value : null))
    .filter(notNull)
    .flat();

  return tickets;
};

export default sendPushNotification;
