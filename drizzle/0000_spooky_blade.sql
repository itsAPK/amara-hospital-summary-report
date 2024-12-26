CREATE TABLE `department` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`onDutyDoctor` text,
	`unavailableDoctor` text,
	FOREIGN KEY (`onDutyDoctor`) REFERENCES `doctor`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`unavailableDoctor`) REFERENCES `doctor`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `doctor` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`mobile` text(255)
);
--> statement-breakpoint
CREATE TABLE `emergency` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`doctor` text,
	`status` text(255) NOT NULL,
	`designation` text(255) NOT NULL,
	FOREIGN KEY (`doctor`) REFERENCES `doctor`(`id`) ON UPDATE no action ON DELETE no action
);
