/*
  Warnings:

  - You are about to alter the column `jta` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Person` MODIFY `jta` BOOLEAN NOT NULL;
