export type LogLevel = "info" | "warn" | "error" | "debug";

export class Logger {
  constructor(private nodeId: string) {}

  log(level: LogLevel, message: string, meta?: any) {
    console.log(
      JSON.stringify({
        ts: Date.now(),
        level,
        nodeId: this.nodeId,
        message,
        meta,
      })
    );
  }

  info(msg: string, meta?: any) {
    this.log("info", msg, meta);
  }

  warn(msg: string, meta?: any) {
    this.log("warn", msg, meta);
  }

  error(msg: string, meta?: any) {
    this.log("error", msg, meta);
  }

  debug(msg: string, meta?: any) {
    this.log("debug", msg, meta);
  }
}