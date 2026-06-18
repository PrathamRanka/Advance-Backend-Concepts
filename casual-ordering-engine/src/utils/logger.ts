type LogLevel = "info" | "warn" | "error" | "debug";

interface LogPayload {
  nodeId?: string;
  event?: string;
  message: string;
  meta?: Record<string, any>;
}

export class Logger {
  constructor(private readonly nodeId: string) {}

  private log(level: LogLevel, payload: LogPayload) {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      nodeId: this.nodeId,
      ...payload,
    };

    console.log(JSON.stringify(entry));
  }

  info(message: string, meta?: Record<string, any>) {
    this.log("info", { message, meta });
  }

  warn(message: string, meta?: Record<string, any>) {
    this.log("warn", { message, meta });
  }

  error(message: string, meta?: Record<string, any>) {
    this.log("error", { message, meta });
  }

  debug(message: string, meta?: Record<string, any>) {
    this.log("debug", { message, meta });
  }
}