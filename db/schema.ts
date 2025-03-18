import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

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

export const doublesTrainingTable = sqliteTable("doubles_training", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  scores: text({ mode: "json" }).$type<number[]>().notNull(),
  completedAt: integer("completed_at", { mode: "timestamp_ms" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export type DoublesTraining = typeof doublesTrainingTable.$inferSelect;
