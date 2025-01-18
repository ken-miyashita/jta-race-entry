-- CreateTable
CREATE TABLE `Person` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lastName` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastNameRomaji` VARCHAR(191) NOT NULL,
    `firstNameRomaji` VARCHAR(191) NOT NULL,
    `teamId` INTEGER NOT NULL,
    `role` INTEGER NOT NULL,
    `jsafId` VARCHAR(191) NULL,
    `jta` BOOLEAN NOT NULL,
    `birthDay` DATETIME(3) NOT NULL,
    `sex` BOOLEAN NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `eMail` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `fax` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sailNumber` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `boatName` VARCHAR(191) NULL,
    `boatWeight` DOUBLE NOT NULL,
    `fleet` VARCHAR(191) NULL,
    `place` VARCHAR(191) NULL,
    `message` VARCHAR(191) NULL,
    `raceId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Race` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `mailFrom` VARCHAR(191) NOT NULL,
    `mailBcc` VARCHAR(191) NULL,
    `dateOfRaceBegin` DATETIME(3) NOT NULL,
    `dateOfRaceEnd` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Person` ADD CONSTRAINT `Person_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_raceId_fkey` FOREIGN KEY (`raceId`) REFERENCES `Race`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
