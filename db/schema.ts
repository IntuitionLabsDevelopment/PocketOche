import { int, sqliteTable } from "drizzle-orm/sqlite-core";

export const timedTrainingTable = sqliteTable("timed_training_table", {
  completionTime: int({ mode: "timestamp_ms" }),
  triples: int(),
  outers: int(),
  bullseyes: int(),
  doubles: int(),
});

export type TimedTraining = typeof timedTrainingTable.$inferSelect;
