CREATE TABLE `timed_training` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`triples` integer NOT NULL,
	`outers` integer NOT NULL,
	`bullseyes` integer NOT NULL,
	`doubles` integer NOT NULL,
	`completed_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
DROP TABLE `timed_training_table`;