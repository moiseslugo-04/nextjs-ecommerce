-- DropIndex
DROP INDEX "public"."user_username_key";

-- AlterTable
ALTER TABLE "account" ADD COLUMN     "expires_at" INTEGER,
ADD COLUMN     "id_token" TEXT,
ADD COLUMN     "scope" TEXT,
ADD COLUMN     "session_state" TEXT,
ADD COLUMN     "token_type" TEXT;
