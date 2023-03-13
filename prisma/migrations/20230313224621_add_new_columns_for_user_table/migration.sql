-- AlterTable
ALTER TABLE `users` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isConfirmed` BOOLEAN NOT NULL DEFAULT false;
