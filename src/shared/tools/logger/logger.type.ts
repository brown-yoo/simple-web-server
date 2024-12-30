const LOGGER_TYPES = {
  LOG: "LOG",
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
  DEBUG: "DEBUG",
} as const;

export type LoggerType = (typeof LOGGER_TYPES)[keyof typeof LOGGER_TYPES];
