/*
  Warnings:

  - You are about to drop the `Bills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Bills` DROP FOREIGN KEY `Bills_cardId_fkey`;

-- DropForeignKey
ALTER TABLE `Bills` DROP FOREIGN KEY `Bills_categoriesId_fkey`;

-- DropForeignKey
ALTER TABLE `Bills` DROP FOREIGN KEY `Bills_ownerId_fkey`;

-- DropTable
DROP TABLE `Bills`;

-- CreateTable
CREATE TABLE `bills` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `ownerId` VARCHAR(191) NOT NULL,
    `cardId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isPaid` BOOLEAN NOT NULL DEFAULT false,
    `hasInstallments` BOOLEAN NOT NULL DEFAULT false,
    `categoriesId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bills` ADD CONSTRAINT `bills_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bills` ADD CONSTRAINT `bills_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `cards`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bills` ADD CONSTRAINT `bills_categoriesId_fkey` FOREIGN KEY (`categoriesId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
