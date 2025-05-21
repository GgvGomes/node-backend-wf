type LogLevel = "info" | "warn" | "error" | "debug";

export class Logger {
  private static instance: Logger;
  private context: string;

  private constructor(context = "App") {
    this.context = context;
  }

  public static getInstance(context?: string): Logger {
    if (!Logger.instance) Logger.instance = new Logger(context);

    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` - ${JSON.stringify(meta)}` : "";
    return `[${timestamp}] [${level.toUpperCase()}] [${
      this.context
    }] ${message}${metaStr}`;
  }

  public info(message: string, meta?: any): void {
    console.info(this.formatMessage("info", message, meta));
  }

  public warn(message: string, meta?: any): void {
    console.warn(this.formatMessage("warn", message, meta));
  }

  public error(message: string, error?: Error, meta?: any): void {
    const errorMeta = error
      ? { ...meta, error: error.message, stack: error.stack }
      : meta;
    console.error(this.formatMessage("error", message, errorMeta));
  }

  public debug(message: string, meta?: any): void {
    if (process.env.NODE_ENV !== "production") {
      console.debug(this.formatMessage("debug", message, meta));
    }
  }
}

export const createLogger = (context: string): Logger => Logger.getInstance(context);
