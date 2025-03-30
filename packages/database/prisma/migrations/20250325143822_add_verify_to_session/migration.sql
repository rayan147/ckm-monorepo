/*
  Warnings:

  - You are about to drop the column `code` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[recipeId,ingredientId]` on the table `recipeIngredient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[verificationCode]` on the table `session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `verificationCode` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "recipeIngredient_ingredientId_idx";

-- DropIndex
DROP INDEX "session_code_key";

-- DropIndex
DROP INDEX "session_token_code_idx";

-- AlterTable
ALTER TABLE "session" DROP COLUMN "code",
ADD COLUMN     "verificationCode" TEXT NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "verified";

-- CreateIndex
CREATE INDEX "recipeIngredient_recipeVersionId_idx" ON "recipeIngredient"("recipeVersionId");

-- CreateIndex
CREATE UNIQUE INDEX "recipeIngredient_recipeId_ingredientId_key" ON "recipeIngredient"("recipeId", "ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "session_verificationCode_key" ON "session"("verificationCode");

-- CreateIndex
CREATE INDEX "session_token_verificationCode_idx" ON "session"("token", "verificationCode");
