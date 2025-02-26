/*
  Warnings:

  - You are about to drop the column `createdAt` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the `inventoryItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menuItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recipeIngredient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `inventory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InventoryType" AS ENUM ('MAIN', 'BAR', 'PREP', 'STORAGE', 'WALK_IN', 'FREEZER');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('PURCHASE', 'WITHDRAWAL', 'ADJUSTMENT', 'WASTE', 'TRANSFER_IN', 'TRANSFER_OUT', 'COUNT_ADJUSTMENT', 'PRODUCTION', 'RETURN');

-- CreateEnum
CREATE TYPE "CountStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "PhotoType" AS ENUM ('MAIN', 'STEP', 'PLATING', 'TECHNIQUE', 'EQUIPMENT_SETUP');

-- DropForeignKey
ALTER TABLE "InventoryWithdrawal" DROP CONSTRAINT "InventoryWithdrawal_inventoryItemId_fkey";

-- DropForeignKey
ALTER TABLE "LeftoverItem" DROP CONSTRAINT "LeftoverItem_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "NutritionalRecommendation" DROP CONSTRAINT "NutritionalRecommendation_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "_DietaryRestrictionToMenuItem" DROP CONSTRAINT "_DietaryRestrictionToMenuItem_B_fkey";

-- DropForeignKey
ALTER TABLE "_MenuItemToRecipe" DROP CONSTRAINT "_MenuItemToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "customerFeedback" DROP CONSTRAINT "customerFeedback_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "inventoryItem" DROP CONSTRAINT "inventoryItem_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "inventoryItem" DROP CONSTRAINT "inventoryItem_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "inventoryItem" DROP CONSTRAINT "inventoryItem_lastUpdatedById_fkey";

-- DropForeignKey
ALTER TABLE "menuItem" DROP CONSTRAINT "menuItem_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "menuItem" DROP CONSTRAINT "menuItem_menuId_fkey";

-- DropForeignKey
ALTER TABLE "menuItemRecipe" DROP CONSTRAINT "menuItemRecipe_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "nutritionalInfo" DROP CONSTRAINT "nutritionalInfo_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "recipeIngredient" DROP CONSTRAINT "recipeIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "recipeIngredient" DROP CONSTRAINT "recipeIngredient_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "recipeIngredient" DROP CONSTRAINT "recipeIngredient_recipeVersionId_fkey";

-- DropForeignKey
ALTER TABLE "salesTransactions" DROP CONSTRAINT "salesTransactions_menuItemId_fkey";

-- DropIndex
DROP INDEX "recipe_name_idx";

-- AlterTable
ALTER TABLE "_DietaryRestrictionToMenuItem" ADD CONSTRAINT "_DietaryRestrictionToMenuItem_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_DietaryRestrictionToMenuItem_AB_unique";

-- AlterTable
ALTER TABLE "_DietaryRestrictionToRecipe" ADD CONSTRAINT "_DietaryRestrictionToRecipe_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_DietaryRestrictionToRecipe_AB_unique";

-- AlterTable
ALTER TABLE "_IngredientToVendor" ADD CONSTRAINT "_IngredientToVendor_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_IngredientToVendor_AB_unique";

-- AlterTable
ALTER TABLE "_MenuItemToRecipe" ADD CONSTRAINT "_MenuItemToRecipe_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_MenuItemToRecipe_AB_unique";

-- AlterTable
ALTER TABLE "_PrepBoardToRecipe" ADD CONSTRAINT "_PrepBoardToRecipe_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_PrepBoardToRecipe_AB_unique";

-- AlterTable
ALTER TABLE "_RecipeToRecipeTag" ADD CONSTRAINT "_RecipeToRecipeTag_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_RecipeToRecipeTag_AB_unique";

-- AlterTable
ALTER TABLE "inventory" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "type" "InventoryType" NOT NULL DEFAULT 'MAIN',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "recipe" DROP COLUMN "createdAt",
DROP COLUMN "imageUrl",
DROP COLUMN "updatedAt",
ADD COLUMN     "imageUrls" TEXT[],
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "skillLevel" "SkillLevel" NOT NULL DEFAULT 'INTERMEDIATE';

-- AlterTable
ALTER TABLE "recipeEquipment" ADD COLUMN     "recipeInstructionId" INTEGER;

-- AlterTable
ALTER TABLE "recipeInstruction" ADD COLUMN     "isCritical" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "techniqueTips" TEXT,
ADD COLUMN     "temperature" DOUBLE PRECISION,
ADD COLUMN     "temperatureUnit" TEXT DEFAULT 'C',
ADD COLUMN     "timeInMinutes" INTEGER,
ADD COLUMN     "warningNotes" TEXT;

-- DropTable
DROP TABLE "inventoryItem";

-- DropTable
DROP TABLE "menuItem";

-- DropTable
DROP TABLE "recipeIngredient";

-- CreateTable
CREATE TABLE "RecipeNutrition" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "servingSize" DOUBLE PRECISION NOT NULL,
    "servingUnit" TEXT NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "carbohydrates" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "fiber" DOUBLE PRECISION NOT NULL,
    "sugar" DOUBLE PRECISION NOT NULL,
    "sodium" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RecipeNutrition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeCriticalPoint" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "threshold" DOUBLE PRECISION,
    "unit" TEXT,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecipeCriticalPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeStorage" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "temperature" DOUBLE PRECISION,
    "method" TEXT NOT NULL,
    "shelfLife" INTEGER NOT NULL,
    "containerType" TEXT,
    "specialNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecipeStorage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipePhoto" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "type" "PhotoType" NOT NULL,
    "stepNumber" INTEGER,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecipePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipeTemperature" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "minTemp" DOUBLE PRECISION NOT NULL,
    "maxTemp" DOUBLE PRECISION NOT NULL,
    "isCritical" BOOLEAN NOT NULL DEFAULT false,
    "holdTime" INTEGER,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipeTemperature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipeYield" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "expectedYield" DOUBLE PRECISION NOT NULL,
    "actualYield" DOUBLE PRECISION,
    "unit" TEXT NOT NULL,
    "wastagePercent" DOUBLE PRECISION,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipeYield_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipeLaborCost" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "prepTime" INTEGER NOT NULL,
    "cookTime" INTEGER NOT NULL,
    "laborRate" DOUBLE PRECISION NOT NULL,
    "totalLaborCost" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipeLaborCost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_ingredient" (
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

    CONSTRAINT "recipe_ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_item" (
    "id" SERIAL NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "minQuantity" DOUBLE PRECISION NOT NULL,
    "restockThreshold" DOUBLE PRECISION NOT NULL,
    "lastCountDate" TIMESTAMP(3),
    "lastOrderDate" TIMESTAMP(3),
    "lastUpdatedById" INTEGER,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "par" DOUBLE PRECISION NOT NULL,
    "reorderPoint" DOUBLE PRECISION NOT NULL,
    "maxQuantity" DOUBLE PRECISION,
    "location" TEXT,
    "barcode" TEXT,
    "notes" TEXT,
    "currentPrice" DOUBLE PRECISION NOT NULL,
    "averageCost" DOUBLE PRECISION NOT NULL,
    "lastPurchasePrice" DOUBLE PRECISION,

    CONSTRAINT "inventory_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_transaction" (
    "id" SERIAL NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "type" "TransactionType" NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "previousQty" DOUBLE PRECISION NOT NULL,
    "newQty" DOUBLE PRECISION NOT NULL,
    "cost" DOUBLE PRECISION,
    "reference" TEXT,
    "notes" TEXT,
    "createdById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inventory_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_count" (
    "id" SERIAL NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "status" "CountStatus" NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "createdById" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "stock_count_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_count_item" (
    "id" SERIAL NOT NULL,
    "stockCountId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "expectedQty" DOUBLE PRECISION NOT NULL,
    "actualQty" DOUBLE PRECISION NOT NULL,
    "difference" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,

    CONSTRAINT "stock_count_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe_stats" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "totalCost" DOUBLE PRECISION NOT NULL,
    "profitMargin" DOUBLE PRECISION NOT NULL,
    "averageRating" DOUBLE PRECISION NOT NULL,
    "preparationCount" INTEGER NOT NULL,
    "lastPrepared" TIMESTAMP(3),

    CONSTRAINT "recipe_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "foodCost" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "recipeIds" INTEGER[],
    "recipeServingsAmount" DOUBLE PRECISION[],
    "recipeServingsCost" DOUBLE PRECISION[],
    "allergens" TEXT[],
    "menuId" INTEGER NOT NULL,
    "categoryId" INTEGER,

    CONSTRAINT "menu_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecipeNutrition_recipeId_key" ON "RecipeNutrition"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeStorage_recipeId_key" ON "RecipeStorage"("recipeId");

-- CreateIndex
CREATE INDEX "recipe_ingredient_ingredientId_idx" ON "recipe_ingredient"("ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_ingredient_recipeId_ingredientId_key" ON "recipe_ingredient"("recipeId", "ingredientId");

-- CreateIndex
CREATE INDEX "inventory_item_ingredientId_idx" ON "inventory_item"("ingredientId");

-- CreateIndex
CREATE INDEX "inventory_item_lastCountDate_idx" ON "inventory_item"("lastCountDate");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_item_inventoryId_ingredientId_key" ON "inventory_item"("inventoryId", "ingredientId");

-- CreateIndex
CREATE INDEX "inventory_transaction_inventoryId_type_createdAt_idx" ON "inventory_transaction"("inventoryId", "type", "createdAt");

-- CreateIndex
CREATE INDEX "inventory_transaction_itemId_createdAt_idx" ON "inventory_transaction"("itemId", "createdAt");

-- CreateIndex
CREATE INDEX "stock_count_inventoryId_status_idx" ON "stock_count"("inventoryId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "stock_count_item_stockCountId_itemId_key" ON "stock_count_item"("stockCountId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_stats_recipeId_key" ON "recipe_stats"("recipeId");

-- CreateIndex
CREATE INDEX "menu_item_menuId_isActive_idx" ON "menu_item"("menuId", "isActive");

-- CreateIndex
CREATE INDEX "menu_item_categoryId_idx" ON "menu_item"("categoryId");

-- CreateIndex
CREATE INDEX "menu_item_name_idx" ON "menu_item"("name");

-- CreateIndex
CREATE INDEX "inventory_restaurantId_isActive_idx" ON "inventory"("restaurantId", "isActive");

-- CreateIndex
CREATE INDEX "recipe_restaurantId_isDeleted_idx" ON "recipe"("restaurantId", "isDeleted");

-- CreateIndex
CREATE INDEX "recipe_cookBookId_isDeleted_idx" ON "recipe"("cookBookId", "isDeleted");

-- CreateIndex
CREATE INDEX "recipe_name_isDeleted_idx" ON "recipe"("name", "isDeleted");

-- CreateIndex
CREATE INDEX "recipe_isPublished_language_idx" ON "recipe"("isPublished", "language");

-- AddForeignKey
ALTER TABLE "RecipeNutrition" ADD CONSTRAINT "RecipeNutrition_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCriticalPoint" ADD CONSTRAINT "RecipeCriticalPoint_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeStorage" ADD CONSTRAINT "RecipeStorage_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipePhoto" ADD CONSTRAINT "RecipePhoto_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeTemperature" ADD CONSTRAINT "recipeTemperature_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeYield" ADD CONSTRAINT "recipeYield_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeLaborCost" ADD CONSTRAINT "recipeLaborCost_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salesTransactions" ADD CONSTRAINT "salesTransactions_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menu_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeEquipment" ADD CONSTRAINT "recipeEquipment_recipeInstructionId_fkey" FOREIGN KEY ("recipeInstructionId") REFERENCES "recipeInstruction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerFeedback" ADD CONSTRAINT "customerFeedback_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menu_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeftoverItem" ADD CONSTRAINT "LeftoverItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menu_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryWithdrawal" ADD CONSTRAINT "InventoryWithdrawal_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "inventory_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionalRecommendation" ADD CONSTRAINT "NutritionalRecommendation_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menu_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_recipeVersionId_fkey" FOREIGN KEY ("recipeVersionId") REFERENCES "recipeVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_item" ADD CONSTRAINT "inventory_item_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_item" ADD CONSTRAINT "inventory_item_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_item" ADD CONSTRAINT "inventory_item_lastUpdatedById_fkey" FOREIGN KEY ("lastUpdatedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_transaction" ADD CONSTRAINT "inventory_transaction_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_transaction" ADD CONSTRAINT "inventory_transaction_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "inventory_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_transaction" ADD CONSTRAINT "inventory_transaction_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_count" ADD CONSTRAINT "stock_count_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_count" ADD CONSTRAINT "stock_count_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_count_item" ADD CONSTRAINT "stock_count_item_stockCountId_fkey" FOREIGN KEY ("stockCountId") REFERENCES "stock_count"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_count_item" ADD CONSTRAINT "stock_count_item_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "inventory_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_stats" ADD CONSTRAINT "recipe_stats_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menuItemRecipe" ADD CONSTRAINT "menuItemRecipe_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menu_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "menuCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutritionalInfo" ADD CONSTRAINT "nutritionalInfo_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menu_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietaryRestrictionToMenuItem" ADD CONSTRAINT "_DietaryRestrictionToMenuItem_B_fkey" FOREIGN KEY ("B") REFERENCES "menu_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuItemToRecipe" ADD CONSTRAINT "_MenuItemToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "menu_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
