-- CreateEnum
CREATE TYPE "NutritionSource" AS ENUM ('MANUAL', 'USDA', 'CUSTOM', 'ESTIMATED');

-- AlterTable
ALTER TABLE "ingredient" ADD COLUMN     "calories" DOUBLE PRECISION,
ADD COLUMN     "carbohydrates" DOUBLE PRECISION,
ADD COLUMN     "fat" DOUBLE PRECISION,
ADD COLUMN     "fiber" DOUBLE PRECISION,
ADD COLUMN     "nutritionSource" "NutritionSource" DEFAULT 'MANUAL',
ADD COLUMN     "nutritionUpdatedAt" TIMESTAMP(3),
ADD COLUMN     "protein" DOUBLE PRECISION,
ADD COLUMN     "sodium" DOUBLE PRECISION,
ADD COLUMN     "sugar" DOUBLE PRECISION,
ADD COLUMN     "usdaFoodId" TEXT;
