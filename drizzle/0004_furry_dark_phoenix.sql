CREATE TABLE `doubles_training` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`scores` text NOT NULL,
	`completed_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
