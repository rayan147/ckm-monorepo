/*
  Warnings:

  - You are about to drop the `menu_item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DietaryRestrictionToMenuItem" DROP CONSTRAINT "_DietaryRestrictionToMenuItem_B_fkey";

-- DropForeignKey
ALTER TABLE "_MenuItemToRecipe" DROP CONSTRAINT "_MenuItemToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "customerFeedback" DROP CONSTRAINT "customerFeedback_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "foodCostHistory" DROP CONSTRAINT "foodCostHistory_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "leftoverItem" DROP CONSTRAINT "leftoverItem_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "menu" DROP CONSTRAINT "menu_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "menuItemRecipe" DROP CONSTRAINT "menuItemRecipe_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "menu_item" DROP CONSTRAINT "menu_item_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "menu_item" DROP CONSTRAINT "menu_item_menuId_fkey";

-- DropForeignKey
ALTER TABLE "nutritionalInfo" DROP CONSTRAINT "nutritionalInfo_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "nutritionalRecommendation" DROP CONSTRAINT "nutritionalRecommendation_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "prepHistory" DROP CONSTRAINT "prepHistory_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "prepItem" DROP CONSTRAINT "prepItem_assignedToId_fkey";

-- DropForeignKey
ALTER TABLE "prepItem" DROP CONSTRAINT "prepItem_prepBoardId_fkey";

-- DropForeignKey
ALTER TABLE "salesTransactions" DROP CONSTRAINT "salesTransactions_menuItemId_fkey";

-- DropTable
DROP TABLE "menu_item";

-- CreateTable
CREATE TABLE "menuItem" (
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

    CONSTRAINT "menuItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "menuItem_menuId_isActive_idx" ON "menuItem"("menuId", "isActive");

-- CreateIndex
CREATE INDEX "menuItem_categoryId_idx" ON "menuItem"("categoryId");

-- CreateIndex
CREATE INDEX "menuItem_name_idx" ON "menuItem"("name");

-- AddForeignKey
ALTER TABLE "salesTransactions" ADD CONSTRAINT "salesTransactions_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerFeedback" ADD CONSTRAINT "customerFeedback_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leftoverItem" ADD CONSTRAINT "leftoverItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutritionalRecommendation" ADD CONSTRAINT "nutritionalRecommendation_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prepItem" ADD CONSTRAINT "prepItem_prepBoardId_fkey" FOREIGN KEY ("prepBoardId") REFERENCES "prepBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prepItem" ADD CONSTRAINT "prepItem_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menuItemRecipe" ADD CONSTRAINT "menuItemRecipe_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menuItem" ADD CONSTRAINT "menuItem_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menuItem" ADD CONSTRAINT "menuItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "menuCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutritionalInfo" ADD CONSTRAINT "nutritionalInfo_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foodCostHistory" ADD CONSTRAINT "foodCostHistory_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prepHistory" ADD CONSTRAINT "prepHistory_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietaryRestrictionToMenuItem" ADD CONSTRAINT "_DietaryRestrictionToMenuItem_B_fkey" FOREIGN KEY ("B") REFERENCES "menuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuItemToRecipe" ADD CONSTRAINT "_MenuItemToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "menuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
