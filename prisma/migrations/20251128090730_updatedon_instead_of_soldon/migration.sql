/*
  Warnings:

  - You are about to drop the column `soldOn` on the `car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `car` DROP COLUMN `soldOn`,
    ADD COLUMN `updatedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
