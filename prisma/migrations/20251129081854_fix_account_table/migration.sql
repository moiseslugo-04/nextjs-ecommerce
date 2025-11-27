/*
  Warnings:

  - You are about to drop the column `access_token_expires_at` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token_expires_at` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "account" DROP COLUMN "access_token_expires_at",
DROP COLUMN "refresh_token_expires_at";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "emailVerified",
ADD COLUMN     "email_verified" BOOLEAN DEFAULT false;
