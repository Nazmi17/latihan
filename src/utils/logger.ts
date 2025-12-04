import { createLogger, format, transports } from "winston";
import path from "path";

const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.File({
      filename: path.join(__dirname, "../../logs/app.log"),
      maxFiles: 5,
      maxsize: 500000,
    }),
  ],
});

export const logInfo = (message: string) => logger.info(message);
export const logError = (message: string, error?: Error) =>
  logger.error(message, error);
export const logDebug = (message: string) => logger.debug(message);

export const requestLogger = (req: any, res: any, next: any) => {
  logInfo(`${req.method} ${req.url}`), next();
};

export default logger;
