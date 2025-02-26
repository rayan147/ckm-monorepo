
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.3.0
 * Query Engine version: acc0b9dd43eb689cbd20c9470515d719db10d0b0
 */
Prisma.prismaVersion = {
  client: "6.3.0",
  engine: "acc0b9dd43eb689cbd20c9470515d719db10d0b0"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.RecipeNutritionScalarFieldEnum = {
  id: 'id',
  recipeId: 'recipeId',
  servingSize: 'servingSize',
  servingUnit: 'servingUnit',
  calories: 'calories',
  protein: 'protein',
  carbohydrates: 'carbohydrates',
  fat: 'fat',
  fiber: 'fiber',
  sugar: 'sugar',
  sodium: 'sodium'
};

exports.Prisma.RecipeCriticalPointScalarFieldEnum = {
  id: 'id',
  recipeId: 'recipeId',
  stepNumber: 'stepNumber',
  description: 'description',
  threshold: 'threshold',
  unit: 'unit',
  action: 'action',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RecipeStorageScalarFieldEnum = {
  id: 'id',
  recipeId: 'recipeId',
  temperature: 'temperature',
  method: 'method',
  shelfLife: 'shelfLife',
  containerType: 'containerType',
  specialNotes: 'specialNotes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RecipePhotoScalarFieldEnum = {
  id: 'id',
  recipeId: 'recipeId',
  url: 'url',
  type: 'type',
  stepNumber: 'stepNumber',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RecipeTemperatureScalarFieldEnum = {
  id: 'id',
  recipeId: 'recipeId',
  stepNumber: 'stepNumber',
  minTemp: 'minTemp',
  maxTemp: 'maxTemp',
  isCritical: 'isCritical',
  holdTime: 'holdTime',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RecipeYieldScalarFieldEnum = {
  id: 'id',
  recipeId: 'recipeId',
  expectedYield: 'expectedYield',
  actualYield: 'actualYield',
  unit: 'unit',
  wastagePercent: 'wastagePercent',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RecipeLaborCostScalarFieldEnum = {
  id: 'id',
  recipeId: 'recipeId',
  prepTime: 'prepTime',
  cookTime: 'cookTime',
  laborRate: 'laborRate',
  totalLaborCost: 'totalLaborCost',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SalesTransactionsScalarFieldEnum = {
  id: 'id',
  posTransactionID: 'posTransactionID',
  restaurantId: 'restaurantId',
  menuItemId: 'menuItemId',
  price: 'price',
  total: 'total',
  transactionDate: 'transactionDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MenuCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  displayOrder: 'displayOrder',
  menuId: 'menuId',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RecipeVersionScalarFieldEnum = {
  id: 'id',
  recipeId: 'recipeId',
  versionNumber: 'versionNumber',
  description: 'description',
  changes: 'changes',
  isActive: 'isActive',
  createdById: 'createdById',
  approvedById: 'approvedById',
  approvedAt: 'approvedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EquipmentScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  model: 'model',
  serialNumber: 'serialNumber',
  purchaseDate: 'purchaseDate',
  lastMaintenance: 'lastMaintenance',
  nextMaintenance: 'nextMaintenance',
  status: 'status',
  location: 'location',
  restaurantId: 'restaurantId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RecipeEquipmentScalarFieldEnum = {
  id: 'id',
  recipeId: 'recipeId',
  equipmentId: 'equipmentId',
  notes: 'notes',
  recipeInstructionId: 'recipeInstructionId'
};

exports.Prisma.MaintenanceLogScalarFieldEnum = {
  id: 'id',
  equipmentId: 'equipmentId',
  date: 'date',
  type: 'type',
  description: 'description',
  cost: 'cost',
  performedBy: 'performedBy',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.QualityChecklistScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  restaurantId: 'restaurantId',
  frequency: 'frequency',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ChecklistItemScalarFieldEnum = {
  id: 'id',
  checklistId: 'checklistId',
  description: 'description',
  order: 'order',
  type: 'type',
  requiredPhotos: 'requiredPhotos',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ChecklistCompleteScalarFieldEnum = {
  id: 'id',
  checklistId: 'checklistId',
  completedById: 'completedById',
  date: 'date',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ChecklistItemCompleteScalarFieldEnum = {
  id: 'id',
  checklistCompleteId: 'checklistCompleteId',
  checklistItemId: 'checklistItemId',
  status: 'status',
  notes: 'notes',
  photoUrls: 'photoUrls',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SupplierPriceHistoryScalarFieldEnum = {
  id: 'id',
  vendorId: 'vendorId',
  ingredientId: 'ingredientId',
  price: 'price',
  unit: 'unit',
  startDate: 'startDate',
  endDate: 'endDate',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CustomerFeedbackScalarFieldEnum = {
  id: 'id',
  restaurantId: 'restaurantId',
  menuItemId: 'menuItemId',
  rating: 'rating',
  comment: 'comment',
  source: 'source',
  tags: 'tags',
  status: 'status',
  responseText: 'responseText',
  respondedAt: 'respondedAt',
  respondedById: 'respondedById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DietaryRestrictionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  icon: 'icon',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RecipeTagScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LeftoverItemScalarFieldEnum = {
  id: 'id',
  restaurantId: 'restaurantId',
  date: 'date',
  menuItemId: 'menuItemId',
  quantity: 'quantity',
  reason: 'reason',
  recordedById: 'recordedById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WasteRecordScalarFieldEnum = {
  id: 'id',
  restaurantId: 'restaurantId',
  date: 'date',
  ingredientId: 'ingredientId',
  quantity: 'quantity',
  unit: 'unit',
  reason: 'reason',
  recordedById: 'recordedById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductionPlanScalarFieldEnum = {
  id: 'id',
  restaurantId: 'restaurantId',
  date: 'date',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductionPlanItemScalarFieldEnum = {
  id: 'id',
  productionPlanId: 'productionPlanId',
  recipeId: 'recipeId',
  quantity: 'quantity',
  unit: 'unit',
  assignedToId: 'assignedToId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ShiftTaskScalarFieldEnum = {
  id: 'id',
  shiftId: 'shiftId',
  taskType: 'taskType',
  startTime: 'startTime',
  endTime: 'endTime',
  duration: 'duration',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AvailabilityScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  dayOfWeek: 'dayOfWeek',
  startTime: 'startTime',
  endTime: 'endTime',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SchedulingConstraintScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  date: 'date',
  constraintsType: 'constraintsType',
  startTime: 'startTime',
  endTime: 'endTime',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InventoryWithdrawalScalarFieldEnum = {
  id: 'id',
  inventoryItemId: 'inventoryItemId',
  dateTime: 'dateTime',
  quantity: 'quantity',
  unit: 'unit',
  recipeId: 'recipeId',
  createdById: 'createdById',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AllergenScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.IngredientAllergenScalarFieldEnum = {
  id: 'id',
  ingredientId: 'ingredientId',
  allergenId: 'allergenId'
};

exports.Prisma.NutritionalRecommendationScalarFieldEnum = {
  id: 'id',
  menuItemId: 'menuItemId',
  recommendation: 'recommendation',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EarlyAccessScalarFieldEnum = {
  id: 'id',
  email: 'email',
  isEmailSent: 'isEmailSent',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrganizationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  imageUrl: 'imageUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InventoryScalarFieldEnum = {
  id: 'id',
  restaurantId: 'restaurantId',
  name: 'name',
  type: 'type',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RestaurantScalarFieldEnum = {
  id: 'id',
  name: 'name',
  imageUrl: 'imageUrl',
  address: 'address',
  city: 'city',
  zipCode: 'zipCode',
  state: 'state',
  owner: 'owner',
  organizationId: 'organizationId',
  foodCost: 'foodCost',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  deleted: 'deleted'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  sub: 'sub',
  passwordHash: 'passwordHash',
  firstName: 'firstName',
  lastName: 'lastName',
  profileImage: 'profileImage',
  verified: 'verified',
  role: 'role',
  organizationId: 'organizationId',
  restaurantId: 'restaurantId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  code: 'code',
  token: 'token',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt'
};

exports.Prisma.CookBookScalarFieldEnum = {
  id: 'id',
  name: 'name',
  imageUrl: 'imageUrl',
  category: 'category',
  restaurantId: 'restaurantId'
};

exports.Prisma.RecipeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  imageUrls: 'imageUrls',
  description: 'description',
  servings: 'servings',
  cookTime: 'cookTime',
  prepTime: 'prepTime',
  frequency: 'frequency',
  restaurantId: 'restaurantId',
  cookBookId: 'cookBookId',
  foodCost: 'foodCost',
  isDeleted: 'isDeleted',
  isPublished: 'isPublished',
  publishedAt: 'publishedAt',
  language: 'language',
  skillLevel: 'skillLevel'
};

exports.Prisma.IngredientScalarFieldEnum = {
  id: 'id',
  name: 'name',
  category: 'category',
  price: 'price',
  dietaryRestrictionId: 'dietaryRestrictionId'
};

exports.Prisma.RecipeIngredientScalarFieldEnum = {
  id: 'id',
  recipeId: 'recipeId',
  ingredientId: 'ingredientId',
  quantity: 'quantity',
  unit: 'unit',
  processingInstructions: 'processingInstructions',
  substituteIngredients: 'substituteIngredients',
  isOptional: 'isOptional',
  notes: 'notes',
  cost: 'cost',
  density: 'density',
  yield: 'yield',
  joinAt: 'joinAt',
  recipeVersionId: 'recipeVersionId'
};

exports.Prisma.RecipeInstructionScalarFieldEnum = {
  id: 'id',
  recipeId: 'recipeId',
  stepNumber: 'stepNumber',
  instruction: 'instruction',
  imageUrl: 'imageUrl',
  recipeVersionId: 'recipeVersionId',
  timeInMinutes: 'timeInMinutes',
  temperature: 'temperature',
  temperatureUnit: 'temperatureUnit',
  isCritical: 'isCritical',
  techniqueTips: 'techniqueTips',
  warningNotes: 'warningNotes'
};

exports.Prisma.InventoryItemScalarFieldEnum = {
  id: 'id',
  inventoryId: 'inventoryId',
  ingredientId: 'ingredientId',
  quantity: 'quantity',
  unit: 'unit',
  minQuantity: 'minQuantity',
  restockThreshold: 'restockThreshold',
  lastCountDate: 'lastCountDate',
  lastOrderDate: 'lastOrderDate',
  lastUpdatedById: 'lastUpdatedById',
  lastUpdated: 'lastUpdated',
  par: 'par',
  reorderPoint: 'reorderPoint',
  maxQuantity: 'maxQuantity',
  location: 'location',
  barcode: 'barcode',
  notes: 'notes',
  currentPrice: 'currentPrice',
  averageCost: 'averageCost',
  lastPurchasePrice: 'lastPurchasePrice'
};

exports.Prisma.InventoryTransactionScalarFieldEnum = {
  id: 'id',
  inventoryId: 'inventoryId',
  itemId: 'itemId',
  type: 'type',
  quantity: 'quantity',
  unit: 'unit',
  previousQty: 'previousQty',
  newQty: 'newQty',
  cost: 'cost',
  reference: 'reference',
  notes: 'notes',
  createdById: 'createdById',
  createdAt: 'createdAt'
};

exports.Prisma.StockCountScalarFieldEnum = {
  id: 'id',
  inventoryId: 'inventoryId',
  status: 'status',
  startedAt: 'startedAt',
  completedAt: 'completedAt',
  createdById: 'createdById',
  notes: 'notes'
};

exports.Prisma.StockCountItemScalarFieldEnum = {
  id: 'id',
  stockCountId: 'stockCountId',
  itemId: 'itemId',
  expectedQty: 'expectedQty',
  actualQty: 'actualQty',
  difference: 'difference',
  notes: 'notes'
};

exports.Prisma.RecipeStatsScalarFieldEnum = {
  id: 'id',
  recipeId: 'recipeId',
  totalCost: 'totalCost',
  profitMargin: 'profitMargin',
  averageRating: 'averageRating',
  preparationCount: 'preparationCount',
  lastPrepared: 'lastPrepared'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  restaurantId: 'restaurantId',
  vendorId: 'vendorId',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrderItemScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  ingredientId: 'ingredientId',
  quantity: 'quantity',
  unit: 'unit',
  price: 'price'
};

exports.Prisma.VendorScalarFieldEnum = {
  id: 'id',
  name: 'name',
  contact: 'contact',
  email: 'email',
  phone: 'phone',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ShiftScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  startTime: 'startTime',
  endTime: 'endTime',
  status: 'status'
};

exports.Prisma.PrepBoardScalarFieldEnum = {
  id: 'id',
  name: 'name',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PrepItemScalarFieldEnum = {
  id: 'id',
  prepBoardId: 'prepBoardId',
  recipeId: 'recipeId',
  quantity: 'quantity',
  status: 'status',
  assignedToId: 'assignedToId'
};

exports.Prisma.PasswordResetScalarFieldEnum = {
  id: 'id',
  token: 'token',
  userId: 'userId',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MenuScalarFieldEnum = {
  id: 'id',
  name: 'name',
  restaurantId: 'restaurantId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MenuItemRecipeScalarFieldEnum = {
  id: 'id',
  menuItemId: 'menuItemId',
  recipeId: 'recipeId',
  joinAt: 'joinAt'
};

exports.Prisma.MenuItemScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  price: 'price',
  foodCost: 'foodCost',
  isActive: 'isActive',
  recipeIds: 'recipeIds',
  recipeServingsAmount: 'recipeServingsAmount',
  recipeServingsCost: 'recipeServingsCost',
  allergens: 'allergens',
  menuId: 'menuId',
  categoryId: 'categoryId'
};

exports.Prisma.NutritionalInfoScalarFieldEnum = {
  id: 'id',
  menuItemId: 'menuItemId',
  calories: 'calories',
  fat: 'fat',
  saturatedFat: 'saturatedFat',
  transFat: 'transFat',
  cholesterol: 'cholesterol',
  sodium: 'sodium',
  carbohydrates: 'carbohydrates',
  fiber: 'fiber',
  sugar: 'sugar',
  protein: 'protein',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FoodCostHistoryScalarFieldEnum = {
  id: 'id',
  recipeId: 'recipeId',
  cost: 'cost',
  date: 'date',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PrepHistoryScalarFieldEnum = {
  id: 'id',
  recipeId: 'recipeId',
  quantity: 'quantity',
  date: 'date',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.PhotoType = exports.$Enums.PhotoType = {
  MAIN: 'MAIN',
  STEP: 'STEP',
  PLATING: 'PLATING',
  TECHNIQUE: 'TECHNIQUE',
  EQUIPMENT_SETUP: 'EQUIPMENT_SETUP'
};

exports.EquipmentStatus = exports.$Enums.EquipmentStatus = {
  ACTIVE: 'ACTIVE',
  MAINTENANCE: 'MAINTENANCE',
  REPAIR: 'REPAIR',
  RETIRED: 'RETIRED'
};

exports.MaintenanceType = exports.$Enums.MaintenanceType = {
  ROUTINE: 'ROUTINE',
  REPAIR: 'REPAIR',
  INSPECTION: 'INSPECTION',
  CLEANING: 'CLEANING',
  CALIBRATION: 'CALIBRATION'
};

exports.ChecklistFrequency = exports.$Enums.ChecklistFrequency = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  CUSTOM: 'CUSTOM'
};

exports.ChecklistItemType = exports.$Enums.ChecklistItemType = {
  BOOLEAN: 'BOOLEAN',
  NUMERIC: 'NUMERIC',
  TEXT: 'TEXT',
  TEMPERATURE: 'TEMPERATURE',
  PHOTO: 'PHOTO'
};

exports.ChecklistStatus = exports.$Enums.ChecklistStatus = {
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  SKIPPED: 'SKIPPED',
  NEEDS_ATTENTION: 'NEEDS_ATTENTION'
};

exports.FeedbackSource = exports.$Enums.FeedbackSource = {
  IN_PERSON: 'IN_PERSON',
  ONLINE: 'ONLINE',
  MOBILE_APP: 'MOBILE_APP',
  THIRD_PARTY: 'THIRD_PARTY'
};

exports.FeedbackStatus = exports.$Enums.FeedbackStatus = {
  NEW: 'NEW',
  IN_PROGRESS: 'IN_PROGRESS',
  RESPONDED: 'RESPONDED',
  CLOSED: 'CLOSED',
  FLAGGED: 'FLAGGED'
};

exports.TaskType = exports.$Enums.TaskType = {
  PREP: 'PREP',
  COOKING: 'COOKING',
  CLEANING: 'CLEANING',
  INVENTORY: 'INVENTORY',
  OTHER: 'OTHER'
};

exports.DayOfWeek = exports.$Enums.DayOfWeek = {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY'
};

exports.ConstraintType = exports.$Enums.ConstraintType = {
  UNAVAILABLE: 'UNAVAILABLE',
  PREFERRED: 'PREFERRED'
};

exports.InventoryType = exports.$Enums.InventoryType = {
  MAIN: 'MAIN',
  BAR: 'BAR',
  PREP: 'PREP',
  STORAGE: 'STORAGE',
  WALK_IN: 'WALK_IN',
  FREEZER: 'FREEZER'
};

exports.UserRole = exports.$Enums.UserRole = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  CHEF: 'CHEF',
  STAFF: 'STAFF',
  VENDOR: 'VENDOR'
};

exports.SkillLevel = exports.$Enums.SkillLevel = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
  EXPERT: 'EXPERT'
};

exports.TransactionType = exports.$Enums.TransactionType = {
  PURCHASE: 'PURCHASE',
  WITHDRAWAL: 'WITHDRAWAL',
  ADJUSTMENT: 'ADJUSTMENT',
  WASTE: 'WASTE',
  TRANSFER_IN: 'TRANSFER_IN',
  TRANSFER_OUT: 'TRANSFER_OUT',
  COUNT_ADJUSTMENT: 'COUNT_ADJUSTMENT',
  PRODUCTION: 'PRODUCTION',
  RETURN: 'RETURN'
};

exports.CountStatus = exports.$Enums.CountStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  ORDERED: 'ORDERED',
  RECEIVED: 'RECEIVED',
  CANCELLED: 'CANCELLED'
};

exports.ShiftStatus = exports.$Enums.ShiftStatus = {
  SCHEDULED: 'SCHEDULED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.PrepStatus = exports.$Enums.PrepStatus = {
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  MISSING_ITEM: 'MISSING_ITEM',
  PENDING: 'PENDING',
  ON_PROGRESS: 'ON_PROGRESS',
  POSTPONE: 'POSTPONE'
};

exports.Prisma.ModelName = {
  RecipeNutrition: 'RecipeNutrition',
  RecipeCriticalPoint: 'RecipeCriticalPoint',
  RecipeStorage: 'RecipeStorage',
  RecipePhoto: 'RecipePhoto',
  RecipeTemperature: 'RecipeTemperature',
  RecipeYield: 'RecipeYield',
  RecipeLaborCost: 'RecipeLaborCost',
  SalesTransactions: 'SalesTransactions',
  MenuCategory: 'MenuCategory',
  RecipeVersion: 'RecipeVersion',
  Equipment: 'Equipment',
  RecipeEquipment: 'RecipeEquipment',
  MaintenanceLog: 'MaintenanceLog',
  QualityChecklist: 'QualityChecklist',
  ChecklistItem: 'ChecklistItem',
  ChecklistComplete: 'ChecklistComplete',
  ChecklistItemComplete: 'ChecklistItemComplete',
  SupplierPriceHistory: 'SupplierPriceHistory',
  CustomerFeedback: 'CustomerFeedback',
  DietaryRestriction: 'DietaryRestriction',
  RecipeTag: 'RecipeTag',
  LeftoverItem: 'LeftoverItem',
  WasteRecord: 'WasteRecord',
  ProductionPlan: 'ProductionPlan',
  ProductionPlanItem: 'ProductionPlanItem',
  ShiftTask: 'ShiftTask',
  Availability: 'Availability',
  SchedulingConstraint: 'SchedulingConstraint',
  InventoryWithdrawal: 'InventoryWithdrawal',
  Allergen: 'Allergen',
  IngredientAllergen: 'IngredientAllergen',
  NutritionalRecommendation: 'NutritionalRecommendation',
  EarlyAccess: 'EarlyAccess',
  Organization: 'Organization',
  Inventory: 'Inventory',
  Restaurant: 'Restaurant',
  User: 'User',
  Session: 'Session',
  CookBook: 'CookBook',
  Recipe: 'Recipe',
  Ingredient: 'Ingredient',
  RecipeIngredient: 'RecipeIngredient',
  RecipeInstruction: 'RecipeInstruction',
  InventoryItem: 'InventoryItem',
  InventoryTransaction: 'InventoryTransaction',
  StockCount: 'StockCount',
  StockCountItem: 'StockCountItem',
  RecipeStats: 'RecipeStats',
  Order: 'Order',
  OrderItem: 'OrderItem',
  Vendor: 'Vendor',
  Shift: 'Shift',
  PrepBoard: 'PrepBoard',
  PrepItem: 'PrepItem',
  PasswordReset: 'PasswordReset',
  Menu: 'Menu',
  MenuItemRecipe: 'MenuItemRecipe',
  MenuItem: 'MenuItem',
  NutritionalInfo: 'NutritionalInfo',
  FoodCostHistory: 'FoodCostHistory',
  PrepHistory: 'PrepHistory'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
