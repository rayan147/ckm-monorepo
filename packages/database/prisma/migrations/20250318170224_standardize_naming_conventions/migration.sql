/*
  Warnings:

  - You are about to drop the `recipe_ingredient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "recipe_ingredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "recipe_ingredient_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "recipe_ingredient_recipeVersionId_fkey";

-- DropTable
DROP TABLE "recipe_ingredient";

-- CreateTable
CREATE TABLE "recipeIngredient" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "processingInstructions" TEXT,
    "substituteIngredients" INTEGER[],
    "isOptional" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "cost" DOUBLE PRECISION,
    "density" DOUBLE PRECISION,
    "yield" DOUBLE PRECISION,
    "joinAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recipeVersionId" INTEGER,

    CONSTRAINT "recipeIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "recipeIngredient_ingredientId_idx" ON "recipeIngredient"("ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "recipeIngredient_recipeId_ingredientId_recipeVersionId_key" ON "recipeIngredient"("recipeId", "ingredientId", "recipeVersionId");

-- AddForeignKey
ALTER TABLE "recipeIngredient" ADD CONSTRAINT "recipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeIngredient" ADD CONSTRAINT "recipeIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeIngredient" ADD CONSTRAINT "recipeIngredient_recipeVersionId_fkey" FOREIGN KEY ("recipeVersionId") REFERENCES "recipeVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
