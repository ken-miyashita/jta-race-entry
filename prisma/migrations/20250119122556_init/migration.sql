-- CreateTable
CREATE TABLE `Person` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lastName` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastNameRomaji` VARCHAR(191) NOT NULL,
    `firstNameRomaji` VARCHAR(191) NOT NULL,
    `teamId` INTEGER NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `jsafId` VARCHAR(191) NOT NULL,
    `jta` BOOLEAN NOT NULL,
    `birthDay` DATETIME(3) NULL,
    `sex` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `eMail` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `fax` VARCHAR(191) NOT NULL,
    `miscInJson` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sailNumber` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `boatName` VARCHAR(191) NOT NULL,
    `boatWeight` DOUBLE NOT NULL,
    `fleet` VARCHAR(191) NOT NULL,
    `place` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `raceId` INTEGER NOT NULL,
    `miscInJson` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Race` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `mailFrom` VARCHAR(191) NOT NULL,
    `mailBcc` VARCHAR(191) NOT NULL,
    `dateOfRaceBegin` DATETIME(3) NOT NULL,
    `dateOfRaceEnd` DATETIME(3) NOT NULL,
    `miscInJson` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Person` ADD CONSTRAINT `Person_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_raceId_fkey` FOREIGN KEY (`raceId`) REFERENCES `Race`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
