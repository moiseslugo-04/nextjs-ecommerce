/*
  Warnings:

  - The `access_token_expires_at` column on the `account` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `refresh_token_expires_at` column on the `account` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "account" DROP COLUMN "access_token_expires_at",
ADD COLUMN     "access_token_expires_at" INTEGER,
DROP COLUMN "refresh_token_expires_at",
ADD COLUMN     "refresh_token_expires_at" INTEGER;
