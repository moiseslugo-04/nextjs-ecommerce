/*
  Warnings:

  - The primary key for the `RefreshToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `verification` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_user_id_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_fkey";

-- DropForeignKey
ALTER TABLE "verification" DROP CONSTRAINT "verification_userId_fkey";

-- AlterTable
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RefreshToken_id_seq";

-- AlterTable
ALTER TABLE "account" DROP CONSTRAINT "account_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "account_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "account_id_seq";

-- AlterTable
ALTER TABLE "carts" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "session" DROP CONSTRAINT "session_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "session_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "session_id_seq";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_id_seq";

-- AlterTable
ALTER TABLE "verification" DROP CONSTRAINT "verification_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "verification_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "verification_id_seq";

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification" ADD CONSTRAINT "verification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
