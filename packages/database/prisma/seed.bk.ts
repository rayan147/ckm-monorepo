import { faker } from '@faker-js/faker';
import { ChecklistFrequency, ChecklistItemType, ChecklistStatus, ConstraintType, DayOfWeek, EquipmentStatus, FeedbackSource, FeedbackStatus, MaintenanceType, OrderStatus, PhotoType, PrepStatus, PrismaClient, ShiftStatus, TaskType, UserRole } from '@prisma/client'


const prisma = new PrismaClient();

// Helper function to get random enum value
function getRandomEnumValue<T extends object>(enumObject: T): T[keyof T] {
  const enumValues = Object.values(enumObject);
  return enumValues[Math.floor(Math.random() * enumValues.length)] as T[keyof T];
}

// Organization factory
async function createOrganization() {
  return prisma.organization.create({
    data: {
      name: faker.company.name(),
      imageUrl: faker.image.url(),
    },
  });
}

// Restaurant factory
async function createRestaurant(organizationId: number) {
  return prisma.restaurant.create({
    data: {
      name: faker.company.name(),
      imageUrl: faker.image.url(),
      address: faker.location.streetAddress(true),
      city: faker.location.city(),
      zipCode: faker.location.zipCode(),
      state: faker.location.state(),
      owner: faker.person.firstName(),
      organizationId: organizationId,
    },
  });
}

// User factory
async function createUser(restaurantId: number, role?: UserRole) {
  return prisma.user.create({
    data: {
      email: faker.internet.email(),
      passwordHash: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: role || getRandomEnumValue(UserRole),
      restaurantId,
    },
  });
}

// Vendor factory
async function createVendor() {
  return prisma.vendor.create({
    data: {
      name: faker.company.name(),
      contact: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    },
  });
}

async function createIngredient(vendorId: number) {
  const ingredientName = faker.food.ingredient();
  const cat = faker.food.ethnicCategory();

  return prisma.ingredient.upsert({
    where: {
      name: ingredientName,
    },
    update: {
      category: cat,
      price: faker.number.float(),
    },
    create: {
      name: ingredientName,
      category: cat,
      price: faker.number.float(),
    },
  });
}

// CookBook factory
async function createCookBook() {
  return prisma.cookBook.create({
    data: {
      name: faker.commerce.productName(),
      imageUrl: faker.image.url(),
      category: faker.food.ethnicCategory(),
    },
  });
}

// Recipe factory
async function createRecipe(restaurantId: number, cookBookId: number) {
  return prisma.recipe.create({
    data: {
      name: faker.food.dish(),
      imageUrls: Array(7).fill(faker.image.urlLoremFlickr({ category: 'pizza' })),
      description: faker.food.description(),
      servings: faker.number.int({ min: 1, max: 10 }),
      cookTime: faker.number.int({ min: 10, max: 120 }),
      prepTime: faker.number.int({ min: 10, max: 120 }),
      restaurantId,
      cookBookId,
    },
  });
}

// Inventory factory
async function createInventory(restaurantId: number) {
  return prisma.inventory.create({
    data: {
      restaurantId,
    },
  });
}

// InventoryItem factory
async function createInventoryItem(inventoryId: number, ingredientId: number, userId: number) {
  const quantity = faker.number.float({ min: 0, max: 1000 });
  const minQuantity = faker.number.float({ min: 0, max: 100 });
  const restockThreshold = faker.number.float({ min: minQuantity, max: 500 });
  const par = faker.number.float({ min: minQuantity, max: restockThreshold });
  const reorderPoint = faker.number.float({ min: minQuantity, max: restockThreshold });
  const maxQuantity = faker.number.float({ min: restockThreshold, max: 1000 });
  const currentPrice = faker.number.float({ min: 0.1, max: 100 });
  const averageCost = faker.number.float({ min: 0.1, max: currentPrice });
  const lastPurchasePrice = faker.number.float({ min: 0.1, max: currentPrice });

  return prisma.inventoryItem.create({
    data: {
      inventoryId,
      ingredientId,
      quantity,
      unit: faker.science.unit().name,
      minQuantity,
      restockThreshold,
      lastCountDate: faker.date.past(),
      lastOrderDate: faker.date.past(),
      lastUpdatedById: userId,
      par,
      reorderPoint,
      maxQuantity,
      location: faker.location.streetAddress(),
      barcode: faker.string.numeric(12),
      notes: faker.lorem.sentence(),
      currentPrice,
      averageCost,
      lastPurchasePrice,
    },
  });
}

// Order factory
async function createOrder(restaurantId: number, vendorId: number) {
  return prisma.order.create({
    data: {
      restaurantId,
      vendorId,
      status: getRandomEnumValue(OrderStatus),
    },
  });
}

// OrderItem factory
async function createOrderItem(orderId: number, ingredientId: number) {
  return prisma.orderItem.create({
    data: {
      orderId,
      ingredientId,
      quantity: faker.number.float({ min: 1, max: 100, precision: 0.01 }),
      unit: faker.science.unit().name,
      price: faker.number.float({ min: 0.1, max: 100, precision: 0.01 }),
    },
  });
}

// PrepBoard factory
async function createPrepBoard() {
  return prisma.prepBoard.create({
    data: {
      status: getRandomEnumValue(PrepStatus),
      name: faker.system.fileName(),
    },
  });
}

// PrepItem factory
async function createPrepItem(prepBoardId: number, recipeId: number, userId: number) {
  return prisma.prepItem.create({
    data: {
      prepBoardId,
      recipeId,
      quantity: faker.number.int({ min: 1, max: 20 }),
      status: getRandomEnumValue(PrepStatus),
      assignedToId: userId,
    },
  });
}

async function createRecipeIngredient(recipeId: number, ingredientId: number) {
  const unit = faker.helpers.arrayElement(['teaspoon', 'tablespoon', 'cup', 'pint', 'quart', 'gallon', 'fluidOunce', 'ounce', 'pound', 'kilogram', 'gram', 'milligram', 'milliliter', 'liter']);
  const quantity = faker.number.float({ min: 0.1, max: 10, precision: 0.1 });

  return prisma.recipeIngredient.upsert({
    where: {
      recipeId_ingredientId: {
        recipeId,
        ingredientId,
      },
    },
    update: {
      quantity,
      unit,
    },
    create: {
      recipeId,
      ingredientId,
      quantity,
      unit,
    },
  });
}

// RecipeInstruction factory
async function createRecipeInstruction(recipeId: number, stepNumber: number) {
  return prisma.recipeInstruction.create({
    data: {
      recipeId,
      stepNumber,
      instruction: faker.lorem.sentence(),
      imageUrl: faker.image.urlLoremFlickr({ category: 'food' }),
    },
  });
}

// Session factory
async function createSession(userId: number) {
  return prisma.session.create({
    data: {
      userId,
      token: faker.string.uuid(),
      expiresAt: faker.date.future(),
      code: faker.string.nanoid(),
    },
  });
}

// Shift factory
async function createShift(userId: number) {
  const startTime = faker.date.future();
  return prisma.shift.create({
    data: {
      userId,
      startTime,
      endTime: faker.date.between({ from: startTime, to: faker.date.future({ refDate: startTime }) }),
      status: getRandomEnumValue(ShiftStatus),
    },
  });
}

// Menu factory
async function createMenu(restaurantId: number) {
  return prisma.menu.create({
    data: {
      name: faker.commerce.department(),
      restaurantId,
    },
  });
}

// MenuItem factory
async function createMenuItem(menuId: number, recipeId: number) {
  const price = faker.number.float({ min: 1, max: 100, precision: 0.01 });
  const name = faker.commerce.productName();
  const foodCost = faker.number.float({ min: 0.1, max: price, precision: 0.01 });

  return prisma.menuItem.create({
    data: {
      menuId,
      price,
      name,
      foodCost,
    },
  });
}

// MenuItemRecipe factory
async function createMenuItemRecipe(menuItemId: number, recipeId: number) {
  return prisma.menuItemRecipe.create({
    data: {
      menuItemId,
      recipeId,
    },
  });
}

// RecipeNutrition factory
async function createRecipeNutrition(recipeId: number) {
  return prisma.recipeNutrition.create({
    data: {
      recipeId,
      servingSize: faker.number.float({ min: 1, max: 10 }),
      servingUnit: faker.science.unit().name,
      calories: faker.number.float({ min: 100, max: 1000 }),
      protein: faker.number.float({ min: 10, max: 100 }),
      carbohydrates: faker.number.float({ min: 10, max: 100 }),
      fat: faker.number.float({ min: 10, max: 100 }),
      fiber: faker.number.float({ min: 1, max: 10 }),
      sugar: faker.number.float({ min: 1, max: 10 }),
      sodium: faker.number.float({ min: 1, max: 10 }),
    },
  });
}

// RecipeCriticalPoint factory
async function createRecipeCriticalPoint(recipeId: number) {
  return prisma.recipeCriticalPoint.create({
    data: {
      recipeId,
      stepNumber: faker.number.int({ min: 1, max: 10 }),
      description: faker.lorem.sentence(),
      threshold: faker.number.float({ min: 1, max: 100 }),
      unit: faker.science.unit().name,
      action: faker.lorem.sentence(),
    },
  });
}

// RecipeStorage factory
async function createRecipeStorage(recipeId: number) {
  return prisma.recipeStorage.create({
    data: {
      recipeId,
      temperature: faker.number.float({ min: -20, max: 20 }),
      method: faker.lorem.word(),
      shelfLife: faker.number.int({ min: 1, max: 100 }),
      containerType: faker.lorem.word(),
      specialNotes: faker.lorem.sentence(),
    },
  });
}

// RecipePhoto factory
async function createRecipePhoto(recipeId: number) {
  return prisma.recipePhoto.create({
    data: {
      recipeId,
      url: faker.image.urlLoremFlickr({ category: 'food' }),
      type: getRandomEnumValue(PhotoType),
      stepNumber: faker.number.int({ min: 1, max: 10 }),
      description: faker.lorem.sentence(),
    },
  });
}

// RecipeTemperature factory
async function createRecipeTemperature(recipeId: number) {
  return prisma.recipeTemperature.create({
    data: {
      recipeId,
      stepNumber: faker.number.int({ min: 1, max: 10 }),
      minTemp: faker.number.float({ min: 0, max: 100 }),
      maxTemp: faker.number.float({ min: 100, max: 200 }),
      isCritical: faker.datatype.boolean(),
      holdTime: faker.number.int({ min: 1, max: 60 }),
      description: faker.lorem.sentence(),
    },
  });
}

// RecipeYield factory
async function createRecipeYield(recipeId: number) {
  return prisma.recipeYield.create({
    data: {
      recipeId,
      expectedYield: faker.number.float({ min: 1, max: 10 }),
      actualYield: faker.number.float({ min: 1, max: 10 }),
      unit: faker.science.unit().name,
      wastagePercent: faker.number.float({ min: 0, max: 10 }),
      notes: faker.lorem.sentence(),
    },
  });
}

// RecipeLaborCost factory
async function createRecipeLaborCost(recipeId: number) {
  return prisma.recipeLaborCost.create({
    data: {
      recipeId,
      prepTime: faker.number.int({ min: 10, max: 120 }),
      cookTime: faker.number.int({ min: 10, max: 120 }),
      laborRate: faker.number.float({ min: 10, max: 50 }),
      totalLaborCost: faker.number.float({ min: 10, max: 100 }),
    },
  });
}

// SalesTransactions factory
async function createSalesTransaction(restaurantId: number, menuItemId: number) {
  return prisma.salesTransactions.create({
    data: {
      restaurantId,
      menuItemId,
      price: faker.number.float({ min: 1, max: 100 }),
      total: faker.number.float({ min: 1, max: 100 }),
      transactionDate: faker.date.past(),
    },
  });
}

// MenuCategory factory
async function createMenuCategory(menuId: number) {
  return prisma.menuCategory.create({
    data: {
      name: faker.commerce.department(),
      description: faker.lorem.sentence(),
      displayOrder: faker.number.int({ min: 1, max: 10 }),
      menuId,
    },
  });
}

// RecipeVersion factory
async function createRecipeVersion(recipeId: number, createdById: number) {
  return prisma.recipeVersion.create({
    data: {
      recipeId,
      versionNumber: faker.number.int({ min: 1, max: 10 }),
      description: faker.lorem.sentence(),
      changes: faker.lorem.sentence(),
      isActive: faker.datatype.boolean(),
      createdById,
    },
  });
}

// Equipment factory
async function createEquipment(restaurantId: number) {
  return prisma.equipment.create({
    data: {
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      model: faker.commerce.productName(),
      serialNumber: faker.string.uuid(),
      purchaseDate: faker.date.past(),
      lastMaintenance: faker.date.past(),
      nextMaintenance: faker.date.future(),
      status: getRandomEnumValue(EquipmentStatus),
      location: faker.location.streetAddress(),
      restaurantId,
    },
  });
}

// RecipeEquipment factory
async function createRecipeEquipment(recipeId: number, equipmentId: number) {
  return prisma.recipeEquipment.create({
    data: {
      recipeId,
      equipmentId,
      notes: faker.lorem.sentence(),
    },
  });
}

// MaintenanceLog factory
async function createMaintenanceLog(equipmentId: number) {
  return prisma.maintenanceLog.create({
    data: {
      equipmentId,
      date: faker.date.past(),
      type: getRandomEnumValue(MaintenanceType),
      description: faker.lorem.sentence(),
      cost: faker.number.float({ min: 10, max: 1000 }),
      performedBy: faker.person.fullName(),
      notes: faker.lorem.sentence(),
    },
  });
}

// QualityChecklist factory
async function createQualityChecklist(restaurantId: number) {
  return prisma.qualityChecklist.create({
    data: {
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      restaurantId,
      frequency: getRandomEnumValue(ChecklistFrequency),
      isActive: faker.datatype.boolean(),
    },
  });
}

// ChecklistItem factory
async function createChecklistItem(checklistId: number) {
  return prisma.checklistItem.create({
    data: {
      checklistId,
      description: faker.lorem.sentence(),
      order: faker.number.int({ min: 1, max: 10 }),
      type: getRandomEnumValue(ChecklistItemType),
      requiredPhotos: faker.datatype.boolean(),
    },
  });
}

// ChecklistComplete factory
async function createChecklistComplete(checklistId: number, completedById: number) {
  return prisma.checklistComplete.create({
    data: {
      checklistId,
      completedById,
      date: faker.date.past(),
      notes: faker.lorem.sentence(),
    },
  });
}


// ChecklistItemComplete factory
async function createChecklistItemComplete(checklistCompleteId: number, checklistItemId: number) {
  return prisma.checklistItemComplete.create({
    data: {
      checklistCompleteId,
      checklistItemId,
      status: getRandomEnumValue(ChecklistStatus),
      notes: faker.lorem.sentence(),
      photoUrls: [faker.image.urlLoremFlickr({ category: 'food' })],
    },
  });
}

// SupplierPriceHistory factory
async function createSupplierPriceHistory(vendorId: number, ingredientId: number) {
  return prisma.supplierPriceHistory.create({
    data: {
      vendorId,
      ingredientId,
      price: faker.number.float({ min: 1, max: 100 }),
      unit: faker.science.unit().name,
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      notes: faker.lorem.sentence(),
    },
  });
}

async function createCustomerFeedback(restaurantId: number, menuItemId?: number) {
  const users = await prisma.user.findMany();
  const respondedById = users.length > 0 ? users[Math.floor(Math.random() * users.length)].id : null;

  return prisma.customerFeedback.create({
    data: {
      restaurantId,
      menuItemId,
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentence(),
      source: getRandomEnumValue(FeedbackSource),
      tags: [faker.lorem.word(), faker.lorem.word()],
      status: getRandomEnumValue(FeedbackStatus),
      responseText: faker.lorem.sentence(),
      respondedAt: faker.date.past(),
      respondedById, // Ensure this is a valid user ID or null
    },
  });
}

// DietaryRestriction factory
async function createDietaryRestriction() {
  return prisma.dietaryRestriction.create({
    data: {
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      icon: faker.image.urlLoremFlickr({ category: 'nature' }),
    },
  });
}

// Allergen factory
async function createAllergen() {
  return prisma.allergen.create({
    data: {
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
    },
  });
}

// IngredientAllergen factory
async function createIngredientAllergen(ingredientId: number, allergenId: number) {
  return prisma.ingredientAllergen.create({
    data: {
      ingredientId,
      allergenId,
    },
  });
}

// NutritionalRecommendation factory
async function createNutritionalRecommendation(menuItemId: number) {
  return prisma.nutritionalRecommendation.create({
    data: {
      menuItemId,
      recommendation: faker.lorem.sentence(),
    },
  });
}

// LeftoverItem factory
async function createLeftoverItem(restaurantId: number, menuItemId: number, recordedById: number) {
  return prisma.leftoverItem.create({
    data: {
      restaurantId,
      menuItemId,
      date: faker.date.past(),
      quantity: faker.number.int({ min: 1, max: 10 }),
      reason: faker.lorem.sentence(),
      recordedById,
    },
  });
}

// WasteRecord factory
async function createWasteRecord(restaurantId: number, ingredientId: number, recordedById: number) {
  return prisma.wasteRecord.create({
    data: {
      restaurantId,
      ingredientId,
      date: faker.date.past(),
      quantity: faker.number.float({ min: 1, max: 10 }),
      unit: faker.science.unit().name,
      reason: faker.lorem.sentence(),
      recordedById,
    },
  });
}

// ProductionPlan factory
async function createProductionPlan(restaurantId: number, createdById: number) {
  return prisma.productionPlan.create({
    data: {
      restaurantId,
      date: faker.date.future(),
      createdById,
    },
  });
}

// ProductionPlanItem factory
async function createProductionPlanItem(productionPlanId: number, recipeId: number, assignedToId?: number) {
  return prisma.productionPlanItem.create({
    data: {
      productionPlanId,
      recipeId,
      quantity: faker.number.int({ min: 1, max: 10 }),
      unit: faker.science.unit().name,
      assignedToId,
    },
  });
}

// ShiftTask factory
async function createShiftTask(shiftId: number) {
  const startTime = faker.date.past();
  return prisma.shiftTask.create({
    data: {
      shiftId,
      taskType: getRandomEnumValue(TaskType),
      startTime,
      endTime: faker.date.between({ from: startTime, to: faker.date.future({ refDate: startTime }) }),
      duration: faker.number.int({ min: 10, max: 120 }),
      notes: faker.lorem.sentence(),
    },
  });
}

// Availability factory
async function createAvailability(userId: number) {
  return prisma.availability.create({
    data: {
      userId,
      dayOfWeek: getRandomEnumValue(DayOfWeek),
      startTime: faker.date.past(),
      endTime: faker.date.future(),
    },
  });
}

// SchedulingConstraint factory
async function createSchedulingConstraint(userId: number) {
  return prisma.schedulingConstraint.create({
    data: {
      userId,
      date: faker.date.future(),
      constraintsType: getRandomEnumValue(ConstraintType),
      startTime: faker.date.past(),
      endTime: faker.date.future(),
      notes: faker.lorem.sentence(),
    },
  });
}

// InventoryWithdrawal factory
async function createInventoryWithdrawal(inventoryItemId: number, createdById: number, recipeId?: number) {
  return prisma.inventoryWithdrawal.create({
    data: {
      inventoryItemId,
      dateTime: faker.date.past(),
      quantity: faker.number.float({ min: 1, max: 10 }),
      unit: faker.science.unit().name,
      recipeId,
      createdById,
    },
  });
}

// NutritionalInfo factory
async function createNutritionalInfo(menuItemId: number) {
  return prisma.nutritionalInfo.create({
    data: {
      menuItemId,
      calories: faker.number.float({ min: 100, max: 1000 }),
      fat: faker.number.float({ min: 10, max: 100 }),
      saturatedFat: faker.number.float({ min: 1, max: 10 }),
      transFat: faker.number.float({ min: 0, max: 5 }),
      cholesterol: faker.number.float({ min: 0, max: 100 }),
      sodium: faker.number.float({ min: 0, max: 1000 }),
      carbohydrates: faker.number.float({ min: 10, max: 100 }),
      fiber: faker.number.float({ min: 1, max: 10 }),
      sugar: faker.number.float({ min: 1, max: 10 }),
      protein: faker.number.float({ min: 10, max: 100 }),
    },
  });
}

// Cleanup database function
async function cleanupDatabase() {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ');

  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
    console.log('Database cleaned up');
  } catch (error) {
    console.log('Error during cleanup:', { error });
  }
}

// Main seeding function
async function main() {
  // Cleanup database
  await cleanupDatabase();

  // Create an organization
  const organization = await createOrganization();

  // Create restaurants
  const restaurants = await Promise.all(
    Array.from({ length: 3 }, () => createRestaurant(organization.id))
  );

  // Create users for each restaurant
  const users = await Promise.all(
    restaurants.flatMap(restaurant => [
      createUser(restaurant.id, UserRole.ADMIN),
      createUser(restaurant.id, UserRole.MANAGER),
      createUser(restaurant.id, UserRole.CHEF),
      createUser(restaurant.id, UserRole.STAFF),
      ...Array.from({ length: 3 }, () => createUser(restaurant.id))
    ])
  );

  // Create vendors
  const vendors = await Promise.all(Array.from({ length: 5 }, createVendor));

  // Create ingredients
  const ingredients = await Promise.all(
    vendors.flatMap(vendor =>
      Array.from({ length: 10 }, () => createIngredient(vendor.id))
    )
  );

  // Create cookbooks
  const cookBooks = await Promise.all(Array.from({ length: 3 }, createCookBook));

  // Create recipes
  const recipes = await Promise.all(
    restaurants.flatMap(restaurant =>
      cookBooks.flatMap(cookbook =>
        Array.from({ length: 5 }, () => createRecipe(restaurant.id, cookbook.id))
      )
    )
  );

  // Create inventories and inventory items
  for (const restaurant of restaurants) {
    const inventory = await createInventory(restaurant.id);
    await Promise.all(
      ingredients.map(ingredient =>
        createInventoryItem(inventory.id, ingredient.id, users[0].id)
      )
    );
  }

  // Create orders and order items
  for (const restaurant of restaurants) {
    for (const vendor of vendors) {
      const order = await createOrder(restaurant.id, vendor.id);
      if (order) {
        await Promise.all(
          ingredients.slice(0, 5).map(ingredient =>
            createOrderItem(order.id, ingredient.id)
          )
        );
      } else {
        console.error('Failed to create order');
      }
    }
  }

  // Create prep boards and prep items
  const prepBoards = await Promise.all(
    restaurants.map(() => createPrepBoard())
  );

  for (const prepBoard of prepBoards) {
    if (prepBoard) {
      await Promise.all(
        Array.from({ length: 5 }, () =>
          createPrepItem(
            prepBoard.id,
            recipes[Math.floor(Math.random() * recipes.length)].id,
            users[Math.floor(Math.random() * users.length)].id
          )
        )
      );
    } else {
      console.error('Failed to create prep board');
    }
  }

  // Create recipe ingredients and instructions
  for (const recipe of recipes) {
    await Promise.all(
      Array.from({ length: 5 }, () =>
        createRecipeIngredient(
          recipe.id,
          ingredients[Math.floor(Math.random() * ingredients.length)].id
        ),
      )
    );

    await Promise.all(
      Array.from({ length: 5 }, (_, index) =>
        createRecipeInstruction(recipe.id, index + 1)
      )
    );
  }

  // Create shifts
  await Promise.all(
    users.flatMap(user =>
      Array.from({ length: 5 }, () => createShift(user.id))
    )
  );

  // Create sessions
  await Promise.all(
    users.flatMap(user =>
      Array.from({ length: 2 }, () => createSession(user.id))
    )
  );

  // Create menus
  const menus = await Promise.all(
    restaurants.map(restaurant => createMenu(restaurant.id))
  );

  // Create menu items
  for (const menu of menus) {
    if (menu) {
      await Promise.all(
        recipes.slice(0, 5).map(recipe =>
          createMenuItem(menu.id, recipe.id)
        )
      );
    } else {
      console.error('Failed to create menu item');
    }
  }

  // Create menuItemRecipes
  const menuItems = await prisma.menuItem.findMany();
  await Promise.all(
    menuItems.map(menuItem =>
      createMenuItemRecipe(menuItem.id, recipes[Math.floor(Math.random() * recipes.length)].id)
    )
  );

  // Create RecipeNutrition
  await Promise.all(
    recipes.map(recipe => createRecipeNutrition(recipe.id))
  );

  // Create RecipeCriticalPoint
  await Promise.all(
    recipes.map(recipe => createRecipeCriticalPoint(recipe.id))
  );

  // Create RecipeStorage
  await Promise.all(
    recipes.map(recipe => createRecipeStorage(recipe.id))
  );

  // Create RecipePhoto
  await Promise.all(
    recipes.map(recipe => createRecipePhoto(recipe.id))
  );

  // Create RecipeTemperature
  await Promise.all(
    recipes.map(recipe => createRecipeTemperature(recipe.id))
  );

  // Create RecipeYield
  await Promise.all(
    recipes.map(recipe => createRecipeYield(recipe.id))
  );

  // Create RecipeLaborCost
  await Promise.all(
    recipes.map(recipe => createRecipeLaborCost(recipe.id))
  );

  // Create SalesTransactions
  await Promise.all(
    restaurants.flatMap(restaurant =>
      menuItems.slice(0, 5).map(menuItem =>
        createSalesTransaction(restaurant.id, menuItem.id)
      )
    )
  );

  // Create MenuCategory
  await Promise.all(
    menus.map(menu => createMenuCategory(menu.id))
  );

  // Create RecipeVersion
  await Promise.all(
    recipes.map(recipe =>
      createRecipeVersion(recipe.id, users[Math.floor(Math.random() * users.length)].id)
    )
  );

  // Create Equipment
  await Promise.all(
    restaurants.map(restaurant => createEquipment(restaurant.id))
  );

  // Create RecipeEquipment
  const equipments = await prisma.equipment.findMany();
  await Promise.all(
    recipes.map(recipe =>
      createRecipeEquipment(recipe.id, equipments[Math.floor(Math.random() * equipments.length)].id)
    )
  );

  // Create MaintenanceLog
  await Promise.all(
    equipments.map(equipment => createMaintenanceLog(equipment.id))
  );

  // Create QualityChecklist
  await Promise.all(
    restaurants.map(restaurant => createQualityChecklist(restaurant.id))
  );

  // Create ChecklistItem
  const qualityChecklists = await prisma.qualityChecklist.findMany();
  await Promise.all(
    qualityChecklists.map(checklist => createChecklistItem(checklist.id))
  );

  // Create ChecklistComplete
  await Promise.all(
    qualityChecklists.map(checklist =>
      createChecklistComplete(checklist.id, users[Math.floor(Math.random() * users.length)].id)
    )
  );

  // Create ChecklistItemComplete
  const checklistCompletes = await prisma.checklistComplete.findMany();
  const checklistItems = await prisma.checklistItem.findMany();
  await Promise.all(
    checklistCompletes.map(complete =>
      createChecklistItemComplete(complete.id, checklistItems[Math.floor(Math.random() * checklistItems.length)].id)
    )
  );

  // Create SupplierPriceHistory
  await Promise.all(
    vendors.flatMap(vendor =>
      ingredients.slice(0, 5).map(ingredient =>
        createSupplierPriceHistory(vendor.id, ingredient.id)
      )
    )
  );

  // Create CustomerFeedback
  await Promise.all(
    restaurants.flatMap(restaurant =>
      menuItems.slice(0, 5).map(menuItem =>
        createCustomerFeedback(restaurant.id, menuItem.id)
      )
    )
  );

  // Create DietaryRestriction
  await Promise.all(
    Array.from({ length: 5 }, createDietaryRestriction)
  );

  // Create Allergen
  await Promise.all(
    Array.from({ length: 5 }, createAllergen)
  );

  // Create IngredientAllergen
  const allergens = await prisma.allergen.findMany();
  await Promise.all(
    ingredients.slice(0, 10).map(ingredient =>
      createIngredientAllergen(ingredient.id, allergens[Math.floor(Math.random() * allergens.length)].id)
    )
  );

  // Create NutritionalRecommendation
  await Promise.all(
    menuItems.slice(0, 10).map(menuItem =>
      createNutritionalRecommendation(menuItem.id)
    )
  );

  // Create LeftoverItem
  await Promise.all(
    restaurants.flatMap(restaurant =>
      menuItems.slice(0, 5).map(menuItem =>
        createLeftoverItem(restaurant.id, menuItem.id, users[Math.floor(Math.random() * users.length)].id)
      )
    )
  );

  // Create WasteRecord
  await Promise.all(
    restaurants.flatMap(restaurant =>
      ingredients.slice(0, 5).map(ingredient =>
        createWasteRecord(restaurant.id, ingredient.id, users[Math.floor(Math.random() * users.length)].id)
      )
    )
  );

  // Create ProductionPlan
  await Promise.all(
    restaurants.map(restaurant =>
      createProductionPlan(restaurant.id, users[Math.floor(Math.random() * users.length)].id)
    )
  );

  // Create ProductionPlanItem
  const productionPlans = await prisma.productionPlan.findMany();
  await Promise.all(
    productionPlans.map(productionPlan =>
      createProductionPlanItem(
        productionPlan.id,
        recipes[Math.floor(Math.random() * recipes.length)].id,
        users[Math.floor(Math.random() * users.length)].id
      )
    )
  );

  // Create ShiftTask
  const shifts = await prisma.shift.findMany();
  await Promise.all(
    shifts.map(shift => createShiftTask(shift.id))
  );

  // Create Availability
  await Promise.all(
    users.map(user => createAvailability(user.id))
  );

  // Create SchedulingConstraint
  await Promise.all(
    users.map(user => createSchedulingConstraint(user.id))
  );

  // Create InventoryWithdrawal
  const inventoryItems = await prisma.inventoryItem.findMany();
  await Promise.all(
    inventoryItems.slice(0, 10).map(inventoryItem =>
      createInventoryWithdrawal(
        inventoryItem.id,
        users[Math.floor(Math.random() * users.length)].id,
        recipes[Math.floor(Math.random() * recipes.length)].id
      )
    )
  );

  // Create NutritionalInfo
  await Promise.all(
    menuItems.slice(0, 10).map(menuItem =>
      createNutritionalInfo(menuItem.id)
    )
  );

  console.log('Seed data created successfully!');
}

main()
  .catch(e => {
    console.error('Error in main function:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })
