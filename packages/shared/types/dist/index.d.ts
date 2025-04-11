import * as zod from 'zod';
import { z } from 'zod';
import * as _ckm_db from '@ckm/db';
import { zodSchemas, Recipe as Recipe$1, Restaurant as Restaurant$1 } from '@ckm/db';
export { Shift, User } from '@ckm/db';

declare const UserRoleEnum: z.ZodEnum<["ADMIN", "MANAGER", "CHEF", "STAFF"]>;
declare const UserSchema: z.ZodObject<{
    id: z.ZodNumber;
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    passwordHash: z.ZodString;
    role: z.ZodEnum<["ADMIN", "MANAGER", "CHEF", "STAFF"]>;
    restaurantId: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
    role: "ADMIN" | "MANAGER" | "CHEF" | "STAFF";
    restaurantId: number;
    createdAt: Date;
    updatedAt: Date;
}, {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
    role: "ADMIN" | "MANAGER" | "CHEF" | "STAFF";
    restaurantId: number;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const UserCreateSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    email: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    passwordHash: z.ZodString;
    role: z.ZodEnum<["ADMIN", "MANAGER", "CHEF", "STAFF"]>;
    restaurantId: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    email: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
    role: "ADMIN" | "MANAGER" | "CHEF" | "STAFF";
    restaurantId: number;
}, {
    email: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
    role: "ADMIN" | "MANAGER" | "CHEF" | "STAFF";
    restaurantId: number;
}>;
type UserCreateInput = z.infer<typeof UserCreateSchema>;
declare const UserUpdateSchema: z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    passwordHash: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<["ADMIN", "MANAGER", "CHEF", "STAFF"]>>;
    restaurantId: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    passwordHash?: string | undefined;
    role?: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | undefined;
    restaurantId?: number | undefined;
}, {
    email?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    passwordHash?: string | undefined;
    role?: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | undefined;
    restaurantId?: number | undefined;
}>;

type Restaurant = z.infer<typeof zodSchemas.RestaurantSchema>;
type RestaurantCreate = z.infer<typeof zodSchemas.RestaurantCreateInputSchema>;
type RestaurantUpdate = z.infer<typeof zodSchemas.RestaurantUpdateInputSchema>;

declare const ShiftStatus: zod.ZodEnum<["SCHEDULED", "COMPLETED", "CANCELLED"]>;
declare const ShiftCreateInput: zod.ZodType<_ckm_db.Prisma.ShiftCreateInput, zod.ZodTypeDef, _ckm_db.Prisma.ShiftCreateInput>;

declare const InventorySchema: z.ZodObject<{
    id: z.ZodNumber;
    restaurantId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
    restaurantId: number;
}, {
    id: number;
    restaurantId: number;
}>;
declare const InventoryItemSchema: z.ZodObject<{
    id: z.ZodNumber;
    inventoryId: z.ZodNumber;
    ingredientId: z.ZodNumber;
    quantity: z.ZodNumber;
    unit: z.ZodString;
    minQuantity: z.ZodNumber;
    lastUpdated: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: number;
    inventoryId: number;
    ingredientId: number;
    quantity: number;
    unit: string;
    minQuantity: number;
    lastUpdated: Date;
}, {
    id: number;
    inventoryId: number;
    ingredientId: number;
    quantity: number;
    unit: string;
    minQuantity: number;
    lastUpdated: Date;
}>;

declare const RecipeIngredientCreateSchema: z.ZodObject<{
    ingredientId: z.ZodNumber;
    quantity: z.ZodString;
    unit: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ingredientId: number;
    quantity: string;
    unit: string;
}, {
    ingredientId: number;
    quantity: string;
    unit: string;
}>;
declare const RecipeInstructionSchema: z.ZodObject<{
    id: z.ZodNumber;
    stepNumber: z.ZodNumber;
    instruction: z.ZodString;
    imageUrl: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    updatedAt: z.ZodNullable<z.ZodOptional<z.ZodDate>>;
    isDeleted: z.ZodBoolean;
    deleted: z.ZodNullable<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    id: number;
    stepNumber: number;
    instruction: string;
    imageUrl: string | null;
    isDeleted: boolean;
    deleted: Date | null;
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
}, {
    id: number;
    stepNumber: number;
    instruction: string;
    imageUrl: string | null;
    isDeleted: boolean;
    deleted: Date | null;
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
}>;
declare const RecipeInstructionCreateSchema: z.ZodObject<{
    stepNumber: z.ZodNumber;
    instruction: z.ZodString;
    imageUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    stepNumber: number;
    instruction: string;
    imageUrl?: string | undefined;
}, {
    stepNumber: number;
    instruction: string;
    imageUrl?: string | undefined;
}>;
declare const RecipeCreateSchema: z.ZodObject<{
    name: z.ZodString;
    imageUrl: z.ZodArray<z.ZodString, "many">;
    description: z.ZodOptional<z.ZodString>;
    servings: z.ZodNumber;
    cookTime: z.ZodNumber;
    restaurantId: z.ZodNumber;
    cookBookId: z.ZodNumber;
    ingredients: z.ZodArray<z.ZodObject<{
        ingredientId: z.ZodNumber;
        quantity: z.ZodString;
        unit: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        ingredientId: number;
        quantity: string;
        unit: string;
    }, {
        ingredientId: number;
        quantity: string;
        unit: string;
    }>, "many">;
    instructions: z.ZodArray<z.ZodObject<{
        stepNumber: z.ZodNumber;
        instruction: z.ZodString;
        imageUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        stepNumber: number;
        instruction: string;
        imageUrl?: string | undefined;
    }, {
        stepNumber: number;
        instruction: string;
        imageUrl?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    restaurantId: number;
    imageUrl: string[];
    name: string;
    servings: number;
    cookTime: number;
    cookBookId: number;
    ingredients: {
        ingredientId: number;
        quantity: string;
        unit: string;
    }[];
    instructions: {
        stepNumber: number;
        instruction: string;
        imageUrl?: string | undefined;
    }[];
    description?: string | undefined;
}, {
    restaurantId: number;
    imageUrl: string[];
    name: string;
    servings: number;
    cookTime: number;
    cookBookId: number;
    ingredients: {
        ingredientId: number;
        quantity: string;
        unit: string;
    }[];
    instructions: {
        stepNumber: number;
        instruction: string;
        imageUrl?: string | undefined;
    }[];
    description?: string | undefined;
}>;
declare const RecipeFormDataSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    servings: z.ZodNumber;
    cookTime: z.ZodNumber;
    prepTime: z.ZodNumber;
    frequency: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    foodCost: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    restaurantId: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    cookBookId: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    isDeleted: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    ingredients: z.ZodArray<z.ZodObject<{
        ingredientId: z.ZodNumber;
        quantity: z.ZodString;
        unit: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        ingredientId: number;
        quantity: string;
        unit: string;
    }, {
        ingredientId: number;
        quantity: string;
        unit: string;
    }>, "many">;
    instructions: z.ZodArray<z.ZodObject<{
        stepNumber: z.ZodNumber;
        instruction: z.ZodString;
        imageUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        stepNumber: number;
        instruction: string;
        imageUrl?: string | undefined;
    }, {
        stepNumber: number;
        instruction: string;
        imageUrl?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    servings: number;
    cookTime: number;
    ingredients: {
        ingredientId: number;
        quantity: string;
        unit: string;
    }[];
    instructions: {
        stepNumber: number;
        instruction: string;
        imageUrl?: string | undefined;
    }[];
    prepTime: number;
    id?: number | undefined;
    restaurantId?: number | null | undefined;
    imageUrl?: string | undefined;
    isDeleted?: boolean | undefined;
    name?: string | undefined;
    description?: string | null | undefined;
    cookBookId?: number | null | undefined;
    frequency?: number | null | undefined;
    foodCost?: number | null | undefined;
}, {
    servings: number;
    cookTime: number;
    ingredients: {
        ingredientId: number;
        quantity: string;
        unit: string;
    }[];
    instructions: {
        stepNumber: number;
        instruction: string;
        imageUrl?: string | undefined;
    }[];
    prepTime: number;
    id?: number | undefined;
    restaurantId?: number | null | undefined;
    imageUrl?: string | undefined;
    isDeleted?: boolean | undefined;
    name?: string | undefined;
    description?: string | null | undefined;
    cookBookId?: number | null | undefined;
    frequency?: number | null | undefined;
    foodCost?: number | null | undefined;
}>;
interface Recipe extends Recipe$1 {
    instructions: Array<{
        id: number;
        stepNumber: number;
        instruction: string;
        imageUrl?: string;
    }>;
    ingredients: Array<{
        quantity: number;
        unit: string;
        ingredientId: number;
    }>;
}
declare const usdaFoodItemSchema: z.ZodObject<{
    fdcId: z.ZodNumber;
    description: z.ZodString;
    dataType: z.ZodEnum<["Branded", "Survey (FNDDS)", "Foundation", "SR Legacy"]>;
    brandName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    brandOwner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    dataSource: z.ZodOptional<z.ZodString>;
    allHighlightFields: z.ZodOptional<z.ZodString>;
    finalFoodInputFoods: z.ZodOptional<z.ZodArray<z.ZodObject<{
        foodDescription: z.ZodString;
        gramWeight: z.ZodNumber;
        id: z.ZodNumber;
        portionCode: z.ZodOptional<z.ZodString>;
        portionDescription: z.ZodOptional<z.ZodString>;
        unit: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        gramWeight: number;
        foodDescription: string;
        unit?: string | undefined;
        portionCode?: string | undefined;
        portionDescription?: string | undefined;
    }, {
        id: number;
        gramWeight: number;
        foodDescription: string;
        unit?: string | undefined;
        portionCode?: string | undefined;
        portionDescription?: string | undefined;
    }>, "many">>;
    foodAttributeTypes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    foodAttributes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        name: z.ZodString;
        sequenceNumber: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        value: string | number;
        name: string;
        sequenceNumber?: number | undefined;
    }, {
        id: number;
        value: string | number;
        name: string;
        sequenceNumber?: number | undefined;
    }>, "many">>;
    foodCategory: z.ZodString;
    foodMeasures: z.ZodOptional<z.ZodArray<z.ZodObject<{
        disseminationText: z.ZodOptional<z.ZodString>;
        gramWeight: z.ZodOptional<z.ZodNumber>;
        id: z.ZodOptional<z.ZodNumber>;
        modifier: z.ZodOptional<z.ZodString>;
        rank: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        id?: number | undefined;
        disseminationText?: string | undefined;
        gramWeight?: number | undefined;
        modifier?: string | undefined;
        rank?: number | undefined;
    }, {
        id?: number | undefined;
        disseminationText?: string | undefined;
        gramWeight?: number | undefined;
        modifier?: string | undefined;
        rank?: number | undefined;
    }>, "many">>;
    foodNutrients: z.ZodArray<z.ZodObject<{
        nutrientId: z.ZodNumber;
        nutrientName: z.ZodString;
        nutrientNumber: z.ZodString;
        value: z.ZodOptional<z.ZodNumber>;
        unitName: z.ZodOptional<z.ZodString>;
        derivationCode: z.ZodOptional<z.ZodString>;
        derivationDescription: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        nutrientId: number;
        nutrientName: string;
        nutrientNumber: string;
        value?: number | undefined;
        unitName?: string | undefined;
        derivationCode?: string | undefined;
        derivationDescription?: string | undefined;
    }, {
        nutrientId: number;
        nutrientName: string;
        nutrientNumber: string;
        value?: number | undefined;
        unitName?: string | undefined;
        derivationCode?: string | undefined;
        derivationDescription?: string | undefined;
    }>, "many">;
    foodVersionIds: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    gtinUpc: z.ZodOptional<z.ZodString>;
    householdServingFullText: z.ZodOptional<z.ZodString>;
    ingredients: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    marketCountry: z.ZodOptional<z.ZodString>;
    microbes: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    modifiedDate: z.ZodOptional<z.ZodString>;
    packageWeight: z.ZodOptional<z.ZodString>;
    publishedDate: z.ZodOptional<z.ZodString>;
    score: z.ZodOptional<z.ZodNumber>;
    servingSize: z.ZodOptional<z.ZodNumber>;
    servingSizeUnit: z.ZodOptional<z.ZodString>;
    subbrandName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    tradeChannels: z.ZodOptional<z.ZodArray<z.ZodEnum<["NO_TRADE_CHANNEL", "CHILD_NUTRITION_FOOD_PROGRAMS", "GROCERY", "MASS_MERCHANDISING"]>, "many">>;
    additionalDescriptions: z.ZodOptional<z.ZodString>;
    foodCode: z.ZodOptional<z.ZodNumber>;
    foodClass: z.ZodOptional<z.ZodString>;
    scientificName: z.ZodOptional<z.ZodString>;
    ndbNumber: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    description: string;
    fdcId: number;
    dataType: "Branded" | "Survey (FNDDS)" | "Foundation" | "SR Legacy";
    foodCategory: string;
    foodNutrients: {
        nutrientId: number;
        nutrientName: string;
        nutrientNumber: string;
        value?: number | undefined;
        unitName?: string | undefined;
        derivationCode?: string | undefined;
        derivationDescription?: string | undefined;
    }[];
    ingredients?: string | null | undefined;
    brandName?: string | null | undefined;
    brandOwner?: string | null | undefined;
    dataSource?: string | undefined;
    allHighlightFields?: string | undefined;
    finalFoodInputFoods?: {
        id: number;
        gramWeight: number;
        foodDescription: string;
        unit?: string | undefined;
        portionCode?: string | undefined;
        portionDescription?: string | undefined;
    }[] | undefined;
    foodAttributeTypes?: string[] | undefined;
    foodAttributes?: {
        id: number;
        value: string | number;
        name: string;
        sequenceNumber?: number | undefined;
    }[] | undefined;
    foodMeasures?: {
        id?: number | undefined;
        disseminationText?: string | undefined;
        gramWeight?: number | undefined;
        modifier?: string | undefined;
        rank?: number | undefined;
    }[] | undefined;
    foodVersionIds?: number[] | undefined;
    gtinUpc?: string | undefined;
    householdServingFullText?: string | undefined;
    marketCountry?: string | undefined;
    microbes?: unknown[] | undefined;
    modifiedDate?: string | undefined;
    packageWeight?: string | undefined;
    publishedDate?: string | undefined;
    score?: number | undefined;
    servingSize?: number | undefined;
    servingSizeUnit?: string | undefined;
    subbrandName?: string | null | undefined;
    tradeChannels?: ("NO_TRADE_CHANNEL" | "CHILD_NUTRITION_FOOD_PROGRAMS" | "GROCERY" | "MASS_MERCHANDISING")[] | undefined;
    additionalDescriptions?: string | undefined;
    foodCode?: number | undefined;
    foodClass?: string | undefined;
    scientificName?: string | undefined;
    ndbNumber?: number | undefined;
}, {
    description: string;
    fdcId: number;
    dataType: "Branded" | "Survey (FNDDS)" | "Foundation" | "SR Legacy";
    foodCategory: string;
    foodNutrients: {
        nutrientId: number;
        nutrientName: string;
        nutrientNumber: string;
        value?: number | undefined;
        unitName?: string | undefined;
        derivationCode?: string | undefined;
        derivationDescription?: string | undefined;
    }[];
    ingredients?: string | null | undefined;
    brandName?: string | null | undefined;
    brandOwner?: string | null | undefined;
    dataSource?: string | undefined;
    allHighlightFields?: string | undefined;
    finalFoodInputFoods?: {
        id: number;
        gramWeight: number;
        foodDescription: string;
        unit?: string | undefined;
        portionCode?: string | undefined;
        portionDescription?: string | undefined;
    }[] | undefined;
    foodAttributeTypes?: string[] | undefined;
    foodAttributes?: {
        id: number;
        value: string | number;
        name: string;
        sequenceNumber?: number | undefined;
    }[] | undefined;
    foodMeasures?: {
        id?: number | undefined;
        disseminationText?: string | undefined;
        gramWeight?: number | undefined;
        modifier?: string | undefined;
        rank?: number | undefined;
    }[] | undefined;
    foodVersionIds?: number[] | undefined;
    gtinUpc?: string | undefined;
    householdServingFullText?: string | undefined;
    marketCountry?: string | undefined;
    microbes?: unknown[] | undefined;
    modifiedDate?: string | undefined;
    packageWeight?: string | undefined;
    publishedDate?: string | undefined;
    score?: number | undefined;
    servingSize?: number | undefined;
    servingSizeUnit?: string | undefined;
    subbrandName?: string | null | undefined;
    tradeChannels?: ("NO_TRADE_CHANNEL" | "CHILD_NUTRITION_FOOD_PROGRAMS" | "GROCERY" | "MASS_MERCHANDISING")[] | undefined;
    additionalDescriptions?: string | undefined;
    foodCode?: number | undefined;
    foodClass?: string | undefined;
    scientificName?: string | undefined;
    ndbNumber?: number | undefined;
}>;
declare const usdaMatchesSchema: z.ZodArray<z.ZodObject<{
    fdcId: z.ZodNumber;
    description: z.ZodString;
    dataType: z.ZodEnum<["Branded", "Survey (FNDDS)", "Foundation", "SR Legacy"]>;
    brandName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    brandOwner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    dataSource: z.ZodOptional<z.ZodString>;
    allHighlightFields: z.ZodOptional<z.ZodString>;
    finalFoodInputFoods: z.ZodOptional<z.ZodArray<z.ZodObject<{
        foodDescription: z.ZodString;
        gramWeight: z.ZodNumber;
        id: z.ZodNumber;
        portionCode: z.ZodOptional<z.ZodString>;
        portionDescription: z.ZodOptional<z.ZodString>;
        unit: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        gramWeight: number;
        foodDescription: string;
        unit?: string | undefined;
        portionCode?: string | undefined;
        portionDescription?: string | undefined;
    }, {
        id: number;
        gramWeight: number;
        foodDescription: string;
        unit?: string | undefined;
        portionCode?: string | undefined;
        portionDescription?: string | undefined;
    }>, "many">>;
    foodAttributeTypes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    foodAttributes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        name: z.ZodString;
        sequenceNumber: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        value: string | number;
        name: string;
        sequenceNumber?: number | undefined;
    }, {
        id: number;
        value: string | number;
        name: string;
        sequenceNumber?: number | undefined;
    }>, "many">>;
    foodCategory: z.ZodString;
    foodMeasures: z.ZodOptional<z.ZodArray<z.ZodObject<{
        disseminationText: z.ZodOptional<z.ZodString>;
        gramWeight: z.ZodOptional<z.ZodNumber>;
        id: z.ZodOptional<z.ZodNumber>;
        modifier: z.ZodOptional<z.ZodString>;
        rank: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        id?: number | undefined;
        disseminationText?: string | undefined;
        gramWeight?: number | undefined;
        modifier?: string | undefined;
        rank?: number | undefined;
    }, {
        id?: number | undefined;
        disseminationText?: string | undefined;
        gramWeight?: number | undefined;
        modifier?: string | undefined;
        rank?: number | undefined;
    }>, "many">>;
    foodNutrients: z.ZodArray<z.ZodObject<{
        nutrientId: z.ZodNumber;
        nutrientName: z.ZodString;
        nutrientNumber: z.ZodString;
        value: z.ZodOptional<z.ZodNumber>;
        unitName: z.ZodOptional<z.ZodString>;
        derivationCode: z.ZodOptional<z.ZodString>;
        derivationDescription: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        nutrientId: number;
        nutrientName: string;
        nutrientNumber: string;
        value?: number | undefined;
        unitName?: string | undefined;
        derivationCode?: string | undefined;
        derivationDescription?: string | undefined;
    }, {
        nutrientId: number;
        nutrientName: string;
        nutrientNumber: string;
        value?: number | undefined;
        unitName?: string | undefined;
        derivationCode?: string | undefined;
        derivationDescription?: string | undefined;
    }>, "many">;
    foodVersionIds: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
    gtinUpc: z.ZodOptional<z.ZodString>;
    householdServingFullText: z.ZodOptional<z.ZodString>;
    ingredients: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    marketCountry: z.ZodOptional<z.ZodString>;
    microbes: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
    modifiedDate: z.ZodOptional<z.ZodString>;
    packageWeight: z.ZodOptional<z.ZodString>;
    publishedDate: z.ZodOptional<z.ZodString>;
    score: z.ZodOptional<z.ZodNumber>;
    servingSize: z.ZodOptional<z.ZodNumber>;
    servingSizeUnit: z.ZodOptional<z.ZodString>;
    subbrandName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    tradeChannels: z.ZodOptional<z.ZodArray<z.ZodEnum<["NO_TRADE_CHANNEL", "CHILD_NUTRITION_FOOD_PROGRAMS", "GROCERY", "MASS_MERCHANDISING"]>, "many">>;
    additionalDescriptions: z.ZodOptional<z.ZodString>;
    foodCode: z.ZodOptional<z.ZodNumber>;
    foodClass: z.ZodOptional<z.ZodString>;
    scientificName: z.ZodOptional<z.ZodString>;
    ndbNumber: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    description: string;
    fdcId: number;
    dataType: "Branded" | "Survey (FNDDS)" | "Foundation" | "SR Legacy";
    foodCategory: string;
    foodNutrients: {
        nutrientId: number;
        nutrientName: string;
        nutrientNumber: string;
        value?: number | undefined;
        unitName?: string | undefined;
        derivationCode?: string | undefined;
        derivationDescription?: string | undefined;
    }[];
    ingredients?: string | null | undefined;
    brandName?: string | null | undefined;
    brandOwner?: string | null | undefined;
    dataSource?: string | undefined;
    allHighlightFields?: string | undefined;
    finalFoodInputFoods?: {
        id: number;
        gramWeight: number;
        foodDescription: string;
        unit?: string | undefined;
        portionCode?: string | undefined;
        portionDescription?: string | undefined;
    }[] | undefined;
    foodAttributeTypes?: string[] | undefined;
    foodAttributes?: {
        id: number;
        value: string | number;
        name: string;
        sequenceNumber?: number | undefined;
    }[] | undefined;
    foodMeasures?: {
        id?: number | undefined;
        disseminationText?: string | undefined;
        gramWeight?: number | undefined;
        modifier?: string | undefined;
        rank?: number | undefined;
    }[] | undefined;
    foodVersionIds?: number[] | undefined;
    gtinUpc?: string | undefined;
    householdServingFullText?: string | undefined;
    marketCountry?: string | undefined;
    microbes?: unknown[] | undefined;
    modifiedDate?: string | undefined;
    packageWeight?: string | undefined;
    publishedDate?: string | undefined;
    score?: number | undefined;
    servingSize?: number | undefined;
    servingSizeUnit?: string | undefined;
    subbrandName?: string | null | undefined;
    tradeChannels?: ("NO_TRADE_CHANNEL" | "CHILD_NUTRITION_FOOD_PROGRAMS" | "GROCERY" | "MASS_MERCHANDISING")[] | undefined;
    additionalDescriptions?: string | undefined;
    foodCode?: number | undefined;
    foodClass?: string | undefined;
    scientificName?: string | undefined;
    ndbNumber?: number | undefined;
}, {
    description: string;
    fdcId: number;
    dataType: "Branded" | "Survey (FNDDS)" | "Foundation" | "SR Legacy";
    foodCategory: string;
    foodNutrients: {
        nutrientId: number;
        nutrientName: string;
        nutrientNumber: string;
        value?: number | undefined;
        unitName?: string | undefined;
        derivationCode?: string | undefined;
        derivationDescription?: string | undefined;
    }[];
    ingredients?: string | null | undefined;
    brandName?: string | null | undefined;
    brandOwner?: string | null | undefined;
    dataSource?: string | undefined;
    allHighlightFields?: string | undefined;
    finalFoodInputFoods?: {
        id: number;
        gramWeight: number;
        foodDescription: string;
        unit?: string | undefined;
        portionCode?: string | undefined;
        portionDescription?: string | undefined;
    }[] | undefined;
    foodAttributeTypes?: string[] | undefined;
    foodAttributes?: {
        id: number;
        value: string | number;
        name: string;
        sequenceNumber?: number | undefined;
    }[] | undefined;
    foodMeasures?: {
        id?: number | undefined;
        disseminationText?: string | undefined;
        gramWeight?: number | undefined;
        modifier?: string | undefined;
        rank?: number | undefined;
    }[] | undefined;
    foodVersionIds?: number[] | undefined;
    gtinUpc?: string | undefined;
    householdServingFullText?: string | undefined;
    marketCountry?: string | undefined;
    microbes?: unknown[] | undefined;
    modifiedDate?: string | undefined;
    packageWeight?: string | undefined;
    publishedDate?: string | undefined;
    score?: number | undefined;
    servingSize?: number | undefined;
    servingSizeUnit?: string | undefined;
    subbrandName?: string | null | undefined;
    tradeChannels?: ("NO_TRADE_CHANNEL" | "CHILD_NUTRITION_FOOD_PROGRAMS" | "GROCERY" | "MASS_MERCHANDISING")[] | undefined;
    additionalDescriptions?: string | undefined;
    foodCode?: number | undefined;
    foodClass?: string | undefined;
    scientificName?: string | undefined;
    ndbNumber?: number | undefined;
}>, "many">;
type USDAFoodItem = z.infer<typeof usdaFoodItemSchema>;
type USDAMatches = z.infer<typeof usdaMatchesSchema>;
declare const RecipeUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    servings: z.ZodOptional<z.ZodNumber>;
    cookTime: z.ZodOptional<z.ZodNumber>;
    restaurantId: z.ZodOptional<z.ZodNumber>;
    cookBookId: z.ZodOptional<z.ZodNumber>;
    ingredients: z.ZodOptional<z.ZodArray<z.ZodObject<{
        ingredientId: z.ZodNumber;
        quantity: z.ZodString;
        unit: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        ingredientId: number;
        quantity: string;
        unit: string;
    }, {
        ingredientId: number;
        quantity: string;
        unit: string;
    }>, "many">>;
    instructions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        stepNumber: z.ZodNumber;
        instruction: z.ZodString;
        imageUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        stepNumber: number;
        instruction: string;
        imageUrl?: string | undefined;
    }, {
        stepNumber: number;
        instruction: string;
        imageUrl?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    restaurantId?: number | undefined;
    imageUrl?: string[] | undefined;
    name?: string | undefined;
    description?: string | undefined;
    servings?: number | undefined;
    cookTime?: number | undefined;
    cookBookId?: number | undefined;
    ingredients?: {
        ingredientId: number;
        quantity: string;
        unit: string;
    }[] | undefined;
    instructions?: {
        stepNumber: number;
        instruction: string;
        imageUrl?: string | undefined;
    }[] | undefined;
}, {
    restaurantId?: number | undefined;
    imageUrl?: string[] | undefined;
    name?: string | undefined;
    description?: string | undefined;
    servings?: number | undefined;
    cookTime?: number | undefined;
    cookBookId?: number | undefined;
    ingredients?: {
        ingredientId: number;
        quantity: string;
        unit: string;
    }[] | undefined;
    instructions?: {
        stepNumber: number;
        instruction: string;
        imageUrl?: string | undefined;
    }[] | undefined;
}>;
type RecipeFormData = z.infer<typeof RecipeFormDataSchema>;
type RecipeCreate = z.infer<typeof zodSchemas.RecipeCreateInputSchema>;
type RecipeUpdate = z.infer<typeof RecipeUpdateSchema>;

declare const OrderStatusEnum: z.ZodEnum<["PENDING", "APPROVED", "ORDERED", "RECEIVED", "CANCELLED"]>;
declare const OrderSchema: z.ZodObject<{
    id: z.ZodNumber;
    restaurantId: z.ZodNumber;
    vendorId: z.ZodNumber;
    vendor: z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
    }, {
        id: number;
        name: string;
    }>;
    status: z.ZodEnum<["PENDING", "APPROVED", "ORDERED", "RECEIVED", "CANCELLED"]>;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        orderId: z.ZodNumber;
        ingredientId: z.ZodNumber;
        quantity: z.ZodNumber;
        unit: z.ZodString;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
        ingredientId: number;
        quantity: number;
        unit: string;
        orderId: number;
        price: number;
    }, {
        id: number;
        ingredientId: number;
        quantity: number;
        unit: string;
        orderId: number;
        price: number;
    }>, "many">;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: number;
    restaurantId: number;
    createdAt: Date;
    updatedAt: Date;
    status: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED";
    vendorId: number;
    vendor: {
        id: number;
        name: string;
    };
    items: {
        id: number;
        ingredientId: number;
        quantity: number;
        unit: string;
        orderId: number;
        price: number;
    }[];
}, {
    id: number;
    restaurantId: number;
    createdAt: Date;
    updatedAt: Date;
    status: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED";
    vendorId: number;
    vendor: {
        id: number;
        name: string;
    };
    items: {
        id: number;
        ingredientId: number;
        quantity: number;
        unit: string;
        orderId: number;
        price: number;
    }[];
}>;
declare const OrderCreateSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    restaurantId: z.ZodNumber;
    vendorId: z.ZodNumber;
    vendor: z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
    }, {
        id: number;
        name: string;
    }>;
    status: z.ZodEnum<["PENDING", "APPROVED", "ORDERED", "RECEIVED", "CANCELLED"]>;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        orderId: z.ZodNumber;
        ingredientId: z.ZodNumber;
        quantity: z.ZodNumber;
        unit: z.ZodString;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
        ingredientId: number;
        quantity: number;
        unit: string;
        orderId: number;
        price: number;
    }, {
        id: number;
        ingredientId: number;
        quantity: number;
        unit: string;
        orderId: number;
        price: number;
    }>, "many">;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    restaurantId: number;
    status: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED";
    vendorId: number;
    vendor: {
        id: number;
        name: string;
    };
    items: {
        id: number;
        ingredientId: number;
        quantity: number;
        unit: string;
        orderId: number;
        price: number;
    }[];
}, {
    restaurantId: number;
    status: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED";
    vendorId: number;
    vendor: {
        id: number;
        name: string;
    };
    items: {
        id: number;
        ingredientId: number;
        quantity: number;
        unit: string;
        orderId: number;
        price: number;
    }[];
}>;
declare const OrderUpdateSchema: z.ZodObject<{
    restaurantId: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["PENDING", "APPROVED", "ORDERED", "RECEIVED", "CANCELLED"]>>;
    vendorId: z.ZodOptional<z.ZodNumber>;
    vendor: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
    }, {
        id: number;
        name: string;
    }>>;
    items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        orderId: z.ZodNumber;
        ingredientId: z.ZodNumber;
        quantity: z.ZodNumber;
        unit: z.ZodString;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
        ingredientId: number;
        quantity: number;
        unit: string;
        orderId: number;
        price: number;
    }, {
        id: number;
        ingredientId: number;
        quantity: number;
        unit: string;
        orderId: number;
        price: number;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    restaurantId?: number | undefined;
    status?: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | undefined;
    vendorId?: number | undefined;
    vendor?: {
        id: number;
        name: string;
    } | undefined;
    items?: {
        id: number;
        ingredientId: number;
        quantity: number;
        unit: string;
        orderId: number;
        price: number;
    }[] | undefined;
}, {
    restaurantId?: number | undefined;
    status?: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | undefined;
    vendorId?: number | undefined;
    vendor?: {
        id: number;
        name: string;
    } | undefined;
    items?: {
        id: number;
        ingredientId: number;
        quantity: number;
        unit: string;
        orderId: number;
        price: number;
    }[] | undefined;
}>;
type Order = z.infer<typeof OrderSchema>;
type OrderCreate = z.infer<typeof OrderCreateSchema>;
type OrderUpdate = z.infer<typeof OrderUpdateSchema>;
type OrderCreateInput = z.infer<typeof zodSchemas.OrderUncheckedCreateInputSchema>;
type OrderUpdateInput = z.infer<typeof zodSchemas.OrderUncheckedUpdateInputSchema>;

declare const IngredientSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    category: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    category: string;
}, {
    id: number;
    name: string;
    category: string;
}>;

type OrganizationCreateInput = z.infer<typeof zodSchemas.OrganizationCreateInputSchema>;
type OrganizationUpdateInput = z.infer<typeof zodSchemas.OrganizationUpdateInputSchema>;

type Prettify<T> = {
    [K in keyof T]: Prettify<T[K]>;
} & {};

declare const VendorSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    contact: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    orders: z.ZodArray<z.ZodObject<{
        restaurantId: z.ZodOptional<z.ZodNumber>;
        status: z.ZodOptional<z.ZodEnum<["PENDING", "APPROVED", "ORDERED", "RECEIVED", "CANCELLED"]>>;
        vendorId: z.ZodOptional<z.ZodNumber>;
        vendor: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
        }, {
            id: number;
            name: string;
        }>>;
        items: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            orderId: z.ZodNumber;
            ingredientId: z.ZodNumber;
            quantity: z.ZodNumber;
            unit: z.ZodString;
            price: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: number;
            ingredientId: number;
            quantity: number;
            unit: string;
            orderId: number;
            price: number;
        }, {
            id: number;
            ingredientId: number;
            quantity: number;
            unit: string;
            orderId: number;
            price: number;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        restaurantId?: number | undefined;
        status?: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | undefined;
        vendorId?: number | undefined;
        vendor?: {
            id: number;
            name: string;
        } | undefined;
        items?: {
            id: number;
            ingredientId: number;
            quantity: number;
            unit: string;
            orderId: number;
            price: number;
        }[] | undefined;
    }, {
        restaurantId?: number | undefined;
        status?: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | undefined;
        vendorId?: number | undefined;
        vendor?: {
            id: number;
            name: string;
        } | undefined;
        items?: {
            id: number;
            ingredientId: number;
            quantity: number;
            unit: string;
            orderId: number;
            price: number;
        }[] | undefined;
    }>, "many">;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: number;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    contact: string;
    phone: string;
    orders: {
        restaurantId?: number | undefined;
        status?: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | undefined;
        vendorId?: number | undefined;
        vendor?: {
            id: number;
            name: string;
        } | undefined;
        items?: {
            id: number;
            ingredientId: number;
            quantity: number;
            unit: string;
            orderId: number;
            price: number;
        }[] | undefined;
    }[];
}, {
    id: number;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    contact: string;
    phone: string;
    orders: {
        restaurantId?: number | undefined;
        status?: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | undefined;
        vendorId?: number | undefined;
        vendor?: {
            id: number;
            name: string;
        } | undefined;
        items?: {
            id: number;
            ingredientId: number;
            quantity: number;
            unit: string;
            orderId: number;
            price: number;
        }[] | undefined;
    }[];
}>;
declare const VendorCreateSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    name: z.ZodString;
    contact: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    orders: z.ZodArray<z.ZodObject<{
        restaurantId: z.ZodOptional<z.ZodNumber>;
        status: z.ZodOptional<z.ZodEnum<["PENDING", "APPROVED", "ORDERED", "RECEIVED", "CANCELLED"]>>;
        vendorId: z.ZodOptional<z.ZodNumber>;
        vendor: z.ZodOptional<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: number;
            name: string;
        }, {
            id: number;
            name: string;
        }>>;
        items: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            orderId: z.ZodNumber;
            ingredientId: z.ZodNumber;
            quantity: z.ZodNumber;
            unit: z.ZodString;
            price: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: number;
            ingredientId: number;
            quantity: number;
            unit: string;
            orderId: number;
            price: number;
        }, {
            id: number;
            ingredientId: number;
            quantity: number;
            unit: string;
            orderId: number;
            price: number;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        restaurantId?: number | undefined;
        status?: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | undefined;
        vendorId?: number | undefined;
        vendor?: {
            id: number;
            name: string;
        } | undefined;
        items?: {
            id: number;
            ingredientId: number;
            quantity: number;
            unit: string;
            orderId: number;
            price: number;
        }[] | undefined;
    }, {
        restaurantId?: number | undefined;
        status?: "CANCELLED" | "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | undefined;
        vendorId?: number | undefined;
        vendor?: {
            id: number;
            name: string;
        } | undefined;
        items?: {
            id: number;
            ingredientId: number;
            quantity: number;
            unit: string;
            orderId: number;
            price: number;
        }[] | undefined;
    }>, "many">;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "id" | "createdAt" | "updatedAt" | "orders">, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    contact: string;
    phone: string;
}, {
    email: string;
    name: string;
    contact: string;
    phone: string;
}>;
declare const VendorUpdateSchema: z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    contact: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    name?: string | undefined;
    contact?: string | undefined;
    phone?: string | undefined;
}, {
    email?: string | undefined;
    name?: string | undefined;
    contact?: string | undefined;
    phone?: string | undefined;
}>;
type Vendor = z.infer<typeof VendorSchema>;
type VendorCreate = z.infer<typeof VendorCreateSchema>;
type VendorUpdate = z.infer<typeof VendorUpdateSchema>;

declare const OrderItemSchema: z.ZodObject<{
    id: z.ZodNumber;
    orderId: z.ZodNumber;
    ingredientId: z.ZodNumber;
    quantity: z.ZodNumber;
    unit: z.ZodString;
    price: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
    ingredientId: number;
    quantity: number;
    unit: string;
    orderId: number;
    price: number;
}, {
    id: number;
    ingredientId: number;
    quantity: number;
    unit: string;
    orderId: number;
    price: number;
}>;
declare const OrderItemCreateSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    orderId: z.ZodNumber;
    ingredientId: z.ZodNumber;
    quantity: z.ZodNumber;
    unit: z.ZodString;
    price: z.ZodNumber;
}, "id">, "strip", z.ZodTypeAny, {
    ingredientId: number;
    quantity: number;
    unit: string;
    orderId: number;
    price: number;
}, {
    ingredientId: number;
    quantity: number;
    unit: string;
    orderId: number;
    price: number;
}>;
declare const OrderItemUpdateSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodNumber>;
    orderId: z.ZodOptional<z.ZodNumber>;
    ingredientId: z.ZodOptional<z.ZodNumber>;
    quantity: z.ZodOptional<z.ZodNumber>;
    unit: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
}, "id" | "orderId">, "strip", z.ZodTypeAny, {
    ingredientId?: number | undefined;
    quantity?: number | undefined;
    unit?: string | undefined;
    price?: number | undefined;
}, {
    ingredientId?: number | undefined;
    quantity?: number | undefined;
    unit?: string | undefined;
    price?: number | undefined;
}>;
type OrderItem = z.infer<typeof OrderItemSchema>;
type OrderItemCreate = z.infer<typeof OrderItemCreateSchema>;
type OrderItemUpdate = z.infer<typeof OrderItemUpdateSchema>;

type PrepBoardCreate = z.infer<typeof zodSchemas.PrepBoardCreateInputSchema>;
type PrepBoardUpdate = z.infer<typeof zodSchemas.PrepBoardUpdateInputSchema>;

type RegistrationData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isOrganization?: boolean;
    organizationName?: string;
    restaurants: Restaurant$1 | Restaurant$1[];
};

export { IngredientSchema, InventoryItemSchema, InventorySchema, type Order, type OrderCreate, type OrderCreateInput, OrderCreateSchema, type OrderItem, type OrderItemCreate, OrderItemCreateSchema, OrderItemSchema, type OrderItemUpdate, OrderItemUpdateSchema, OrderSchema, OrderStatusEnum, type OrderUpdate, type OrderUpdateInput, OrderUpdateSchema, type OrganizationCreateInput, type OrganizationUpdateInput, type PrepBoardCreate, type PrepBoardUpdate, type Prettify, type Recipe, type RecipeCreate, RecipeCreateSchema, type RecipeFormData, RecipeFormDataSchema, RecipeIngredientCreateSchema, RecipeInstructionCreateSchema, RecipeInstructionSchema, type RecipeUpdate, RecipeUpdateSchema, type RegistrationData, type Restaurant, type RestaurantCreate, type RestaurantUpdate, ShiftCreateInput, ShiftStatus, type USDAFoodItem, type USDAMatches, type UserCreateInput, UserCreateSchema, UserRoleEnum, UserSchema, UserUpdateSchema, type Vendor, type VendorCreate, VendorCreateSchema, VendorSchema, type VendorUpdate, VendorUpdateSchema, usdaMatchesSchema };
