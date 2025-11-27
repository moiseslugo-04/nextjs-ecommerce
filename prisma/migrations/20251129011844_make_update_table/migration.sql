-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "revoked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "address" TEXT,
ADD COLUMN     "birthdate" TIMESTAMP(3),
ADD COLUMN     "country" TEXT,
ADD COLUMN     "phone_number" TEXT;
