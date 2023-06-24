// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://1951a9484b244be0bf6f169b92b71cbb@o1423499.ingest.sentry.io/4504668095709184",
  tracesSampleRate: 1,
  debug: false,
});
