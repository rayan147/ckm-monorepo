/*
  Warnings:

  - A unique constraint covering the columns `[recipeId,recipeVersionId]` on the table `recipeIngredient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "recipeIngredient_recipeId_ingredientId_recipeVersionId_key";

-- CreateIndex
CREATE UNIQUE INDEX "recipeIngredient_recipeId_recipeVersionId_key" ON "recipeIngredient"("recipeId", "recipeVersionId");
