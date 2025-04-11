/*
  Warnings:

  - You are about to drop the column `token` on the `session` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "session_token_key";

-- DropIndex
DROP INDEX "session_token_verificationCode_idx";

-- DropIndex
DROP INDEX "session_userId_key";

-- AlterTable
ALTER TABLE "session" DROP COLUMN "token";

-- CreateIndex
CREATE INDEX "session_id_verificationCode_idx" ON "session"("id", "verificationCode");
