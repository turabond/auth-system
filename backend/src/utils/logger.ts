import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

const transport = new winston.transports.DailyRotateFile({
  filename: path.join('logs', 'app-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '14d',
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `[${info.timestamp}] [${info.level.toUpperCase()}]: ${info.message}`,
    ),
  ),
  transports: [transport],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}
