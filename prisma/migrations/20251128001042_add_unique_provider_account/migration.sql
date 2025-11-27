/*
  Warnings:

  - A unique constraint covering the columns `[provider,provider_account_id]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."account_provider_account_id_key";

-- AlterTable
ALTER TABLE "account" ADD COLUMN     "type" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_provider_account_id_key" ON "account"("provider", "provider_account_id");
