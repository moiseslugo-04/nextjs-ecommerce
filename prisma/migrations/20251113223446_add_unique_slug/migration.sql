/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `department` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "department_slug_key" ON "department"("slug");
