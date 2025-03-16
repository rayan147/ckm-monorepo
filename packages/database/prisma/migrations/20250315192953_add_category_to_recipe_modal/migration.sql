-- AlterTable
ALTER TABLE "RecipeNutrition" ADD COLUMN     "containsDairy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "containsEggs" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "containsFish" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "containsGluten" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "containsNuts" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "containsSesame" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "containsShellfish" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "containsSoy" BOOLEAN NOT NULL DEFAULT false;
