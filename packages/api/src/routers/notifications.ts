import { t } from "@andescalada/api/src/createRouter";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { TRPCError } from "@trpc/server";
import Expo, { ExpoPushMessage, ExpoPushTicket } from "expo-server-sdk";
import { z } from "zod";

export const notificationsRouter = t.router({
  registerUserToken: protectedProcedure
    .input(z.object({ token: z.string(), deviceName: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.access.hset(`notificationTokens:${ctx.user.email}`, {
        [input.deviceName]: input.token,
      }),
    ),
  unregisterUserToken: protectedProcedure
    .input(z.object({ deviceName: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.access.hdel(`notificationTokens:${ctx.user.email}`, input.deviceName),
    ),
  sendTestNotification: protectedProcedure.mutation(async ({ ctx }) => {
    const tokens = await ctx.access.hgetall<Record<string, string>>(
      `notificationTokens:${ctx.user.email}`,
    );
    if (!tokens)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `No tokens found for ${ctx.user.email}`,
      });
    const tokensArray = Object.values(tokens);
    const expo = new Expo();
    const messages: ExpoPushMessage[] = [];
    for (const pushToken of tokensArray) {
      // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      messages.push({
        to: pushToken,
        sound: "default",
        body: "This is a test notification",
        data: { withSome: "data" },
      });
    }
    const chunks = expo.chunkPushNotifications(messages);
    const tickets: ExpoPushTicket[] = [];
    (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (const chunk of chunks) {
        try {
          const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          console.log(ticketChunk);
          tickets.push(...ticketChunk);
          // NOTE: If a ticket contains an error code in ticket.details.error, you
          // must handle it appropriately. The error codes are listed in the Expo
          // documentation:
          // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
        } catch (error) {
          console.error(error);
        }
      }
    })();
    return tickets;
  }),
});
