import { sql } from "drizzle-orm";
import { integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const timedTrainingTable = sqliteTable("timed_training", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  triples: integer("triples").notNull(),
  outers: integer("outers").notNull(),
  bullseyes: integer("bullseyes").notNull(),
  doubles: integer("doubles").notNull(),
  completedAt: integer("completed_at", { mode: "timestamp_ms" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  timeInterval: integer("time_interval"),
});

export type TimedTraining = typeof timedTrainingTable.$inferSelect;
