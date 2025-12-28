/*
  Warnings:

  - A unique constraint covering the columns `[id,user_id]` on the table `address` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "address" ADD COLUMN     "is_default" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "address_id_user_id_key" ON "address"("id", "user_id");
