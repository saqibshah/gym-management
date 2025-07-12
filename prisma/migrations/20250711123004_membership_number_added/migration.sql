/*
  Warnings:

  - A unique constraint covering the columns `[membershipNumber]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "membershipNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Client_membershipNumber_key" ON "Client"("membershipNumber");
