-- CreateEnum
CREATE TYPE "ChecklistItemType" AS ENUM ('BOOLEAN', 'NUMERIC', 'TEXT', 'TEMPERATURE', 'PHOTO');

-- CreateEnum
CREATE TYPE "EquipmentStatus" AS ENUM ('ACTIVE', 'MAINTENANCE', 'REPAIR', 'RETIRED');

-- CreateEnum
CREATE TYPE "MaintenanceType" AS ENUM ('ROUTINE', 'REPAIR', 'INSPECTION', 'CLEANING', 'CALIBRATION');

-- CreateEnum
CREATE TYPE "ChecklistFrequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'CUSTOM');

-- CreateEnum
CREATE TYPE "ChecklistStatus" AS ENUM ('COMPLETED', 'FAILED', 'SKIPPED', 'NEEDS_ATTENTION');

-- CreateEnum
CREATE TYPE "FeedbackSource" AS ENUM ('IN_PERSON', 'ONLINE', 'MOBILE_APP', 'THIRD_PARTY');

-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'RESPONDED', 'CLOSED', 'FLAGGED');

-- CreateEnum
CREATE TYPE "ProductionStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'HAS_NOT_START');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('PREP', 'COOKING', 'CLEANING', 'INVENTORY', 'OTHER');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "ConstraintType" AS ENUM ('UNAVAILABLE', 'PREFERRED');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('APPETIZER', 'SOUP', 'SALAD', 'MAIN_COURSE', 'SIDE_DISH', 'DESSERT', 'BEVERAGE', 'BREAKFAST', 'BRUNCH', 'LUNCH', 'DINNER', 'SNACK', 'BAKED_GOOD', 'SAUCE', 'CONDIMENT', 'SPECIAL');

-- CreateEnum
CREATE TYPE "InventoryType" AS ENUM ('MAIN', 'BAR', 'PREP', 'STORAGE', 'WALK_IN', 'FREEZER');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('PURCHASE', 'WITHDRAWAL', 'ADJUSTMENT', 'WASTE', 'TRANSFER_IN', 'TRANSFER_OUT', 'COUNT_ADJUSTMENT', 'PRODUCTION', 'RETURN');

-- CreateEnum
CREATE TYPE "CountStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MANAGER', 'CHEF', 'STAFF', 'VENDOR');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'APPROVED', 'ORDERED', 'RECEIVED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ShiftStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PrepStatus" AS ENUM ('COMPLETED', 'CANCELLED', 'MISSING_ITEM', 'PENDING', 'ON_PROGRESS', 'POSTPONE');

-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "PhotoType" AS ENUM ('MAIN', 'STEP', 'PLATING', 'TECHNIQUE', 'EQUIPMENT_SETUP');

-- CreateEnum
CREATE TYPE "NutritionSource" AS ENUM ('MANUAL', 'USDA', 'CUSTOM', 'ESTIMATED');

-- CreateTable
CREATE TABLE "recipeNutrition" (
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
    "containsGluten" BOOLEAN NOT NULL DEFAULT false,
    "containsDairy" BOOLEAN NOT NULL DEFAULT false,
    "containsNuts" BOOLEAN NOT NULL DEFAULT false,
    "containsEggs" BOOLEAN NOT NULL DEFAULT false,
    "containsSoy" BOOLEAN NOT NULL DEFAULT false,
    "containsFish" BOOLEAN NOT NULL DEFAULT false,
    "containsShellfish" BOOLEAN NOT NULL DEFAULT false,
    "containsSesame" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "recipeNutrition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipeCriticalPoint" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "threshold" DOUBLE PRECISION,
    "unit" TEXT,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipeCriticalPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipeStorage" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "temperature" DOUBLE PRECISION,
    "method" TEXT NOT NULL,
    "shelfLife" INTEGER NOT NULL,
    "containerType" TEXT,
    "specialNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipeStorage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipePhoto" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "type" "PhotoType" NOT NULL,
    "stepNumber" INTEGER,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipePhoto_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "salesTransactions" (
    "id" SERIAL NOT NULL,
    "posTransactionID" TEXT,
    "restaurantId" INTEGER NOT NULL,
    "menuItemId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "salesTransactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menuCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "displayOrder" INTEGER NOT NULL,
    "menuId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menuCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipeVersion" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "description" TEXT,
    "changes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdById" INTEGER NOT NULL,
    "approvedById" INTEGER,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipeVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "model" TEXT,
    "serialNumber" TEXT,
    "purchaseDate" TIMESTAMP(3),
    "lastMaintenance" TIMESTAMP(3),
    "nextMaintenance" TIMESTAMP(3),
    "status" "EquipmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "location" TEXT,
    "restaurantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipeEquipment" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "notes" TEXT,
    "recipeInstructionId" INTEGER,

    CONSTRAINT "recipeEquipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenanceLog" (
    "id" SERIAL NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "MaintenanceType" NOT NULL,
    "description" TEXT NOT NULL,
    "cost" DOUBLE PRECISION,
    "performedBy" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "maintenanceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qualityChecklist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "restaurantId" INTEGER NOT NULL,
    "frequency" "ChecklistFrequency" NOT NULL DEFAULT 'DAILY',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qualityChecklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checklistItem" (
    "id" SERIAL NOT NULL,
    "checklistId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "type" "ChecklistItemType" NOT NULL,
    "requiredPhotos" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checklistComplete" (
    "id" SERIAL NOT NULL,
    "checklistId" INTEGER NOT NULL,
    "completedById" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checklistComplete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checklistItemComplete" (
    "id" SERIAL NOT NULL,
    "checklistCompleteId" INTEGER NOT NULL,
    "checklistItemId" INTEGER NOT NULL,
    "status" "ChecklistStatus" NOT NULL,
    "notes" TEXT,
    "photoUrls" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checklistItemComplete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplierPriceHistory" (
    "id" SERIAL NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplierPriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customerFeedback" (
    "id" SERIAL NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "menuItemId" INTEGER,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "source" "FeedbackSource" NOT NULL,
    "tags" TEXT[],
    "status" "FeedbackStatus" NOT NULL DEFAULT 'NEW',
    "responseText" TEXT,
    "respondedAt" TIMESTAMP(3),
    "respondedById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customerFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dietaryRestriction" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dietaryRestriction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipeTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipeTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leftoverItem" (
    "id" SERIAL NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "menuItemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "recordedById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leftoverItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wasteRecord" (
    "id" SERIAL NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "recordedById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wasteRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productionPlan" (
    "id" SERIAL NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productionPlanItem" (
    "id" SERIAL NOT NULL,
    "productionPlanId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "assignedToId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productionPlanItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shiftTask" (
    "id" SERIAL NOT NULL,
    "shiftId" INTEGER NOT NULL,
    "taskType" "TaskType" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shiftTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "availability" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedulingConstraint" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "constraintsType" "ConstraintType" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedulingConstraint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventoryWithdrawal" (
    "id" SERIAL NOT NULL,
    "inventoryItemId" INTEGER NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "recipeId" INTEGER,
    "createdById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventoryWithdrawal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allergen" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "allergen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredientAllergen" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "allergenId" INTEGER NOT NULL,

    CONSTRAINT "ingredientAllergen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutritionalRecommendation" (
    "id" SERIAL NOT NULL,
    "menuItemId" INTEGER NOT NULL,
    "recommendation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nutritionalRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "earlyAccess" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "isEmailSent" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "earlyAccess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" SERIAL NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "name" TEXT,
    "type" "InventoryType" NOT NULL DEFAULT 'MAIN',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "organizationId" INTEGER,
    "foodCost" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "sub" INTEGER,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profileImage" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "role" "UserRole" NOT NULL,
    "organizationId" INTEGER,
    "restaurantId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cookbook" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "category" TEXT NOT NULL,
    "restaurantId" INTEGER,

    CONSTRAINT "cookbook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "description" TEXT,
    "servings" INTEGER NOT NULL,
    "cookTime" INTEGER NOT NULL,
    "prepTime" INTEGER NOT NULL,
    "frequency" INTEGER,
    "restaurantId" INTEGER NOT NULL,
    "cookBookId" INTEGER NOT NULL,
    "foodCost" DOUBLE PRECISION,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "language" TEXT NOT NULL DEFAULT 'en',
    "skillLevel" "SkillLevel" NOT NULL DEFAULT 'INTERMEDIATE',
    "category" "Category" NOT NULL DEFAULT 'MAIN_COURSE',

    CONSTRAINT "recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "density" DOUBLE PRECISION,
    "dietaryRestrictionId" INTEGER,
    "calories" DOUBLE PRECISION,
    "protein" DOUBLE PRECISION,
    "carbohydrates" DOUBLE PRECISION,
    "fat" DOUBLE PRECISION,
    "fiber" DOUBLE PRECISION,
    "sugar" DOUBLE PRECISION,
    "sodium" DOUBLE PRECISION,
    "usdaFoodId" TEXT,
    "nutritionSource" "NutritionSource" DEFAULT 'MANUAL',
    "nutritionUpdatedAt" TIMESTAMP(3),

    CONSTRAINT "ingredient_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "recipeInstruction" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "instruction" TEXT NOT NULL,
    "imageUrl" TEXT,
    "recipeVersionId" INTEGER,
    "timeInMinutes" INTEGER,
    "temperature" DOUBLE PRECISION,
    "temperatureUnit" TEXT DEFAULT 'C',
    "isCritical" BOOLEAN NOT NULL DEFAULT false,
    "techniqueTips" TEXT,
    "warningNotes" TEXT,

    CONSTRAINT "recipeInstruction_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "orderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shift" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" "ShiftStatus" NOT NULL,

    CONSTRAINT "shift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prepBoard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "PrepStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prepBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prepItem" (
    "id" SERIAL NOT NULL,
    "prepBoardId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "PrepStatus" NOT NULL,
    "assignedToId" INTEGER NOT NULL,

    CONSTRAINT "prepItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passwordReset" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "passwordReset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menuItemRecipe" (
    "id" SERIAL NOT NULL,
    "menuItemId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "joinAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menuItemRecipe_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "nutritionalInfo" (
    "id" SERIAL NOT NULL,
    "menuItemId" INTEGER,
    "calories" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "saturatedFat" DOUBLE PRECISION NOT NULL,
    "transFat" DOUBLE PRECISION NOT NULL,
    "cholesterol" DOUBLE PRECISION NOT NULL,
    "sodium" DOUBLE PRECISION NOT NULL,
    "carbohydrates" DOUBLE PRECISION NOT NULL,
    "fiber" DOUBLE PRECISION NOT NULL,
    "sugar" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nutritionalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foodCostHistory" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "foodCostHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prepHistory" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prepHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DietaryRestrictionToMenuItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DietaryRestrictionToMenuItem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DietaryRestrictionToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DietaryRestrictionToRecipe_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_RecipeToRecipeTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_RecipeToRecipeTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_IngredientToVendor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_IngredientToVendor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PrepBoardToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PrepBoardToRecipe_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MenuItemToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MenuItemToRecipe_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipeNutrition_recipeId_key" ON "recipeNutrition"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "recipeStorage_recipeId_key" ON "recipeStorage"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "salesTransactions_posTransactionID_key" ON "salesTransactions"("posTransactionID");

-- CreateIndex
CREATE UNIQUE INDEX "menuCategory_menuId_name_key" ON "menuCategory"("menuId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "recipeVersion_recipeId_versionNumber_key" ON "recipeVersion"("recipeId", "versionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "recipeEquipment_recipeId_equipmentId_key" ON "recipeEquipment"("recipeId", "equipmentId");

-- CreateIndex
CREATE UNIQUE INDEX "dietaryRestriction_name_key" ON "dietaryRestriction"("name");

-- CreateIndex
CREATE UNIQUE INDEX "recipeTag_name_key" ON "recipeTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "allergen_name_key" ON "allergen"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ingredientAllergen_ingredientId_allergenId_key" ON "ingredientAllergen"("ingredientId", "allergenId");

-- CreateIndex
CREATE UNIQUE INDEX "earlyAccess_email_key" ON "earlyAccess"("email");

-- CreateIndex
CREATE UNIQUE INDEX "organization_name_key" ON "organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_restaurantId_key" ON "inventory"("restaurantId");

-- CreateIndex
CREATE INDEX "inventory_restaurantId_isActive_idx" ON "inventory"("restaurantId", "isActive");

-- CreateIndex
CREATE INDEX "restaurant_name_idx" ON "restaurant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_sub_key" ON "user"("sub");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_firstName_lastName_idx" ON "user"("firstName", "lastName");

-- CreateIndex
CREATE UNIQUE INDEX "session_code_key" ON "session"("code");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "session_token_code_idx" ON "session"("token", "code");

-- CreateIndex
CREATE INDEX "cookbook_name_idx" ON "cookbook"("name");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_name_key" ON "recipe"("name");

-- CreateIndex
CREATE INDEX "recipe_restaurantId_isDeleted_idx" ON "recipe"("restaurantId", "isDeleted");

-- CreateIndex
CREATE INDEX "recipe_cookBookId_isDeleted_idx" ON "recipe"("cookBookId", "isDeleted");

-- CreateIndex
CREATE INDEX "recipe_name_isDeleted_idx" ON "recipe"("name", "isDeleted");

-- CreateIndex
CREATE INDEX "recipe_isPublished_language_idx" ON "recipe"("isPublished", "language");

-- CreateIndex
CREATE UNIQUE INDEX "ingredient_name_key" ON "ingredient"("name");

-- CreateIndex
CREATE INDEX "recipe_ingredient_ingredientId_idx" ON "recipe_ingredient"("ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_ingredient_recipeId_ingredientId_key" ON "recipe_ingredient"("recipeId", "ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "recipeInstruction_recipeId_stepNumber_key" ON "recipeInstruction"("recipeId", "stepNumber");

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
CREATE UNIQUE INDEX "vendor_name_key" ON "vendor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_email_key" ON "vendor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "passwordReset_token_key" ON "passwordReset"("token");

-- CreateIndex
CREATE UNIQUE INDEX "menuItemRecipe_menuItemId_recipeId_key" ON "menuItemRecipe"("menuItemId", "recipeId");

-- CreateIndex
CREATE INDEX "menu_item_menuId_isActive_idx" ON "menu_item"("menuId", "isActive");

-- CreateIndex
CREATE INDEX "menu_item_categoryId_idx" ON "menu_item"("categoryId");

-- CreateIndex
CREATE INDEX "menu_item_name_idx" ON "menu_item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "nutritionalInfo_menuItemId_key" ON "nutritionalInfo"("menuItemId");

-- CreateIndex
CREATE INDEX "_DietaryRestrictionToMenuItem_B_index" ON "_DietaryRestrictionToMenuItem"("B");

-- CreateIndex
CREATE INDEX "_DietaryRestrictionToRecipe_B_index" ON "_DietaryRestrictionToRecipe"("B");

-- CreateIndex
CREATE INDEX "_RecipeToRecipeTag_B_index" ON "_RecipeToRecipeTag"("B");

-- CreateIndex
CREATE INDEX "_IngredientToVendor_B_index" ON "_IngredientToVendor"("B");

-- CreateIndex
CREATE INDEX "_PrepBoardToRecipe_B_index" ON "_PrepBoardToRecipe"("B");

-- CreateIndex
CREATE INDEX "_MenuItemToRecipe_B_index" ON "_MenuItemToRecipe"("B");

-- AddForeignKey
ALTER TABLE "recipeNutrition" ADD CONSTRAINT "recipeNutrition_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeCriticalPoint" ADD CONSTRAINT "recipeCriticalPoint_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeStorage" ADD CONSTRAINT "recipeStorage_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipePhoto" ADD CONSTRAINT "recipePhoto_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeTemperature" ADD CONSTRAINT "recipeTemperature_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeYield" ADD CONSTRAINT "recipeYield_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeLaborCost" ADD CONSTRAINT "recipeLaborCost_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salesTransactions" ADD CONSTRAINT "salesTransactions_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salesTransactions" ADD CONSTRAINT "salesTransactions_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menu_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menuCategory" ADD CONSTRAINT "menuCategory_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeVersion" ADD CONSTRAINT "recipeVersion_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeVersion" ADD CONSTRAINT "recipeVersion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeVersion" ADD CONSTRAINT "recipeVersion_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipment" ADD CONSTRAINT "equipment_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeEquipment" ADD CONSTRAINT "recipeEquipment_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeEquipment" ADD CONSTRAINT "recipeEquipment_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeEquipment" ADD CONSTRAINT "recipeEquipment_recipeInstructionId_fkey" FOREIGN KEY ("recipeInstructionId") REFERENCES "recipeInstruction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenanceLog" ADD CONSTRAINT "maintenanceLog_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qualityChecklist" ADD CONSTRAINT "qualityChecklist_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklistItem" ADD CONSTRAINT "checklistItem_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "qualityChecklist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklistComplete" ADD CONSTRAINT "checklistComplete_checklistId_fkey" FOREIGN KEY ("checklistId") REFERENCES "qualityChecklist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklistComplete" ADD CONSTRAINT "checklistComplete_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklistItemComplete" ADD CONSTRAINT "checklistItemComplete_checklistCompleteId_fkey" FOREIGN KEY ("checklistCompleteId") REFERENCES "checklistComplete"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklistItemComplete" ADD CONSTRAINT "checklistItemComplete_checklistItemId_fkey" FOREIGN KEY ("checklistItemId") REFERENCES "checklistItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplierPriceHistory" ADD CONSTRAINT "supplierPriceHistory_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplierPriceHistory" ADD CONSTRAINT "supplierPriceHistory_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerFeedback" ADD CONSTRAINT "customerFeedback_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerFeedback" ADD CONSTRAINT "customerFeedback_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menu_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerFeedback" ADD CONSTRAINT "customerFeedback_respondedById_fkey" FOREIGN KEY ("respondedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leftoverItem" ADD CONSTRAINT "leftoverItem_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leftoverItem" ADD CONSTRAINT "leftoverItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menu_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leftoverItem" ADD CONSTRAINT "leftoverItem_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wasteRecord" ADD CONSTRAINT "wasteRecord_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wasteRecord" ADD CONSTRAINT "wasteRecord_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wasteRecord" ADD CONSTRAINT "wasteRecord_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productionPlan" ADD CONSTRAINT "productionPlan_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productionPlan" ADD CONSTRAINT "productionPlan_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productionPlanItem" ADD CONSTRAINT "productionPlanItem_productionPlanId_fkey" FOREIGN KEY ("productionPlanId") REFERENCES "productionPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productionPlanItem" ADD CONSTRAINT "productionPlanItem_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productionPlanItem" ADD CONSTRAINT "productionPlanItem_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shiftTask" ADD CONSTRAINT "shiftTask_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "shift"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availability" ADD CONSTRAINT "availability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedulingConstraint" ADD CONSTRAINT "schedulingConstraint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventoryWithdrawal" ADD CONSTRAINT "inventoryWithdrawal_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "inventory_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventoryWithdrawal" ADD CONSTRAINT "inventoryWithdrawal_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventoryWithdrawal" ADD CONSTRAINT "inventoryWithdrawal_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredientAllergen" ADD CONSTRAINT "ingredientAllergen_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredientAllergen" ADD CONSTRAINT "ingredientAllergen_allergenId_fkey" FOREIGN KEY ("allergenId") REFERENCES "allergen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutritionalRecommendation" ADD CONSTRAINT "nutritionalRecommendation_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menu_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cookbook" ADD CONSTRAINT "cookbook_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_cookBookId_fkey" FOREIGN KEY ("cookBookId") REFERENCES "cookbook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredient" ADD CONSTRAINT "ingredient_dietaryRestrictionId_fkey" FOREIGN KEY ("dietaryRestrictionId") REFERENCES "dietaryRestriction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_recipeVersionId_fkey" FOREIGN KEY ("recipeVersionId") REFERENCES "recipeVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeInstruction" ADD CONSTRAINT "recipeInstruction_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeInstruction" ADD CONSTRAINT "recipeInstruction_recipeVersionId_fkey" FOREIGN KEY ("recipeVersionId") REFERENCES "recipeVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "order" ADD CONSTRAINT "order_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift" ADD CONSTRAINT "shift_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prepItem" ADD CONSTRAINT "prepItem_prepBoardId_fkey" FOREIGN KEY ("prepBoardId") REFERENCES "prepBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prepItem" ADD CONSTRAINT "prepItem_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prepItem" ADD CONSTRAINT "prepItem_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "passwordReset" ADD CONSTRAINT "passwordReset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menuItemRecipe" ADD CONSTRAINT "menuItemRecipe_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menu_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menuItemRecipe" ADD CONSTRAINT "menuItemRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "menuCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutritionalInfo" ADD CONSTRAINT "nutritionalInfo_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menu_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foodCostHistory" ADD CONSTRAINT "foodCostHistory_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prepHistory" ADD CONSTRAINT "prepHistory_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietaryRestrictionToMenuItem" ADD CONSTRAINT "_DietaryRestrictionToMenuItem_A_fkey" FOREIGN KEY ("A") REFERENCES "dietaryRestriction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietaryRestrictionToMenuItem" ADD CONSTRAINT "_DietaryRestrictionToMenuItem_B_fkey" FOREIGN KEY ("B") REFERENCES "menu_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietaryRestrictionToRecipe" ADD CONSTRAINT "_DietaryRestrictionToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "dietaryRestriction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietaryRestrictionToRecipe" ADD CONSTRAINT "_DietaryRestrictionToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToRecipeTag" ADD CONSTRAINT "_RecipeToRecipeTag_A_fkey" FOREIGN KEY ("A") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToRecipeTag" ADD CONSTRAINT "_RecipeToRecipeTag_B_fkey" FOREIGN KEY ("B") REFERENCES "recipeTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToVendor" ADD CONSTRAINT "_IngredientToVendor_A_fkey" FOREIGN KEY ("A") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToVendor" ADD CONSTRAINT "_IngredientToVendor_B_fkey" FOREIGN KEY ("B") REFERENCES "vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrepBoardToRecipe" ADD CONSTRAINT "_PrepBoardToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "prepBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrepBoardToRecipe" ADD CONSTRAINT "_PrepBoardToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuItemToRecipe" ADD CONSTRAINT "_MenuItemToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "menu_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuItemToRecipe" ADD CONSTRAINT "_MenuItemToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
