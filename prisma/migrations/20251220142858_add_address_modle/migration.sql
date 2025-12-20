/*
  Warnings:

  - You are about to drop the column `address` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "address";

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "address" TEXT,
    "postal_code" TEXT,
    "label" TEXT,
    "type" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
