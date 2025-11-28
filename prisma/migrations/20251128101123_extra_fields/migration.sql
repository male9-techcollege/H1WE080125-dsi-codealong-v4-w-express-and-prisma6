/*
  Warnings:

  - You are about to drop the column `createdAt` on the `brand` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `brand` DROP COLUMN `createdAt`,
    ADD COLUMN `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `car` DROP COLUMN `createdAt`,
    ADD COLUMN `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `category` DROP COLUMN `createdAt`,
    ADD COLUMN `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`,
    ADD COLUMN `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
