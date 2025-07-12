/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `GroupClass` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GroupClass_name_key" ON "GroupClass"("name");
