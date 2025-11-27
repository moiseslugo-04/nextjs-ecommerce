/*
  Warnings:

  - You are about to drop the column `value` on the `verification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `verification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `verification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `verification` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."verification_value_key";

-- AlterTable
ALTER TABLE "verification" DROP COLUMN "value",
ADD COLUMN     "token" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "identifier" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_key" ON "verification"("token");

-- AddForeignKey
ALTER TABLE "verification" ADD CONSTRAINT "verification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
