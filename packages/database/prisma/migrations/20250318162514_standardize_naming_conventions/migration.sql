/*
  Warnings:

  - A unique constraint covering the columns `[recipeId,stepNumber,recipeVersionId]` on the table `recipeInstruction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[recipeId,ingredientId,recipeVersionId]` on the table `recipe_ingredient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ingredient" DROP CONSTRAINT "ingredient_dietaryRestrictionId_fkey";

-- DropForeignKey
ALTER TABLE "recipeInstruction" DROP CONSTRAINT "recipeInstruction_recipeVersionId_fkey";

-- DropIndex
DROP INDEX "recipeInstruction_recipeId_stepNumber_key";

-- DropIndex
DROP INDEX "recipe_ingredient_recipeId_ingredientId_key";

-- CreateTable
CREATE TABLE "_DietaryRestrictionToIngredient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DietaryRestrictionToIngredient_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DietaryRestrictionToIngredient_B_index" ON "_DietaryRestrictionToIngredient"("B");

-- CreateIndex
CREATE UNIQUE INDEX "recipeInstruction_recipeId_stepNumber_recipeVersionId_key" ON "recipeInstruction"("recipeId", "stepNumber", "recipeVersionId");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_ingredient_recipeId_ingredientId_recipeVersionId_key" ON "recipe_ingredient"("recipeId", "ingredientId", "recipeVersionId");

-- AddForeignKey
ALTER TABLE "recipeInstruction" ADD CONSTRAINT "recipeInstruction_recipeVersionId_fkey" FOREIGN KEY ("recipeVersionId") REFERENCES "recipeVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietaryRestrictionToIngredient" ADD CONSTRAINT "_DietaryRestrictionToIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "dietaryRestriction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietaryRestrictionToIngredient" ADD CONSTRAINT "_DietaryRestrictionToIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
