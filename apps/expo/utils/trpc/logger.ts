import { AppRouter } from "@andescalada/api/src/routers/_app";
import { LoggerLinkOptions } from "@trpc/client";
import {
  configLoggerType,
  consoleTransport,
  logger as rnLogger,
} from "react-native-logs";

const defaultConfig: configLoggerType = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: "debug",
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright",
    },
    extensionColors: {
      trpc: "cyan",
    },
  },
  async: true,
  dateFormat: "time",
  printLevel: true,
  printDate: true,
  enabled: true,
  enabledExtensions: ["trpc"],
};

const l = rnLogger.createLogger(defaultConfig);

const log = l.extend("trpc");

type L = LoggerLinkOptions<AppRouter>["logger"];

const logger: L = (opts) => {
  if (!__DEV__) return;
  if (opts.direction === "down") {
    if (opts.result instanceof Error) {
      log.error(opts.path, opts.type, opts.result);
      return;
    }
    log.info(
      `${opts.path} ${opts.type} ${(opts.elapsedMs / 60).toFixed(2)} segs`,
    );
  }
};

export default logger;
