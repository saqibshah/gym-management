/*
  Warnings:

  - You are about to drop the column `membershipNumber` on the `Client` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Client_membershipNumber_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "membershipNumber";
