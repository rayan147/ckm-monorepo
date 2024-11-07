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
    imageUrl: string | null;
    stepNumber: number;
    instruction: string;
    isDeleted: boolean;
    deleted: Date | null;
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
}, {
    id: number;
    imageUrl: string | null;
    stepNumber: number;
    instruction: string;
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
    name: string;
    imageUrl: string[];
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
    name: string;
    imageUrl: string[];
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
    name?: string | undefined;
    imageUrl?: string | undefined;
    isDeleted?: boolean | undefined;
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
    name?: string | undefined;
    imageUrl?: string | undefined;
    isDeleted?: boolean | undefined;
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
    name?: string | undefined;
    imageUrl?: string[] | undefined;
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
    name?: string | undefined;
    imageUrl?: string[] | undefined;
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
    status: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED";
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
    status: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED";
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
    status: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED";
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
    status: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED";
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
    status?: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED" | undefined;
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
    status?: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED" | undefined;
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

declare const OrganizationSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    imageUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    imageUrl?: string | null | undefined;
}, {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    imageUrl?: string | null | undefined;
}>;
declare const OrganizationCreateSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    name: z.ZodString;
    imageUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    name: string;
    imageUrl?: string | null | undefined;
}, {
    name: string;
    imageUrl?: string | null | undefined;
}>;
declare const OrganizationUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    imageUrl?: string | null | undefined;
}, {
    name?: string | undefined;
    imageUrl?: string | null | undefined;
}>;
type OrganizationCreateInput = z.infer<typeof OrganizationCreateSchema>;
type OrganizationUpdateInput = z.infer<typeof OrganizationUpdateSchema>;

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
        status?: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED" | undefined;
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
        status?: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED" | undefined;
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
        status?: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED" | undefined;
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
        status?: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED" | undefined;
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
        status?: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED" | undefined;
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
        status?: "PENDING" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED" | undefined;
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

declare const MessageSchema: z.ZodObject<{
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
}, {
    message: string;
}>;
declare const AuthError: z.ZodObject<{
    status: z.ZodLiteral<number>;
    body: z.ZodObject<{
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
    }, {
        message: string;
    }>;
}, "strip", z.ZodTypeAny, {
    status: number;
    body: {
        message: string;
    };
}, {
    status: number;
    body: {
        message: string;
    };
}>;
declare const LoginResponseSchema: z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
    status: z.ZodLiteral<number>;
    body: z.ZodObject<{
        access_token: z.ZodString;
        session_token: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        access_token: string;
        session_token: string;
    }, {
        access_token: string;
        session_token: string;
    }>;
}, "strip", z.ZodTypeAny, {
    status: number;
    body: {
        access_token: string;
        session_token: string;
    };
}, {
    status: number;
    body: {
        access_token: string;
        session_token: string;
    };
}>, z.ZodObject<{
    status: z.ZodLiteral<number>;
    body: z.ZodObject<{
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
    }, {
        message: string;
    }>;
}, "strip", z.ZodTypeAny, {
    status: number;
    body: {
        message: string;
    };
}, {
    status: number;
    body: {
        message: string;
    };
}>]>;
declare const RegisterResponseSchema: z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
    status: z.ZodLiteral<number>;
    body: z.ZodObject<Omit<{
        role: z.ZodEnum<["ADMIN", "MANAGER", "CHEF", "STAFF", "VENDOR"]>;
        id: z.ZodNumber;
        email: z.ZodString;
        sub: z.ZodNullable<z.ZodNumber>;
        passwordHash: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        profileImage: z.ZodNullable<z.ZodString>;
        verified: z.ZodBoolean;
        organizationId: z.ZodNullable<z.ZodNumber>;
        restaurantId: z.ZodNullable<z.ZodNumber>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, "passwordHash">, "strip", z.ZodTypeAny, {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        role: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | "VENDOR";
        restaurantId: number | null;
        createdAt: Date;
        updatedAt: Date;
        sub: number | null;
        profileImage: string | null;
        verified: boolean;
        organizationId: number | null;
    }, {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        role: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | "VENDOR";
        restaurantId: number | null;
        createdAt: Date;
        updatedAt: Date;
        sub: number | null;
        profileImage: string | null;
        verified: boolean;
        organizationId: number | null;
    }>;
}, "strip", z.ZodTypeAny, {
    status: number;
    body: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        role: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | "VENDOR";
        restaurantId: number | null;
        createdAt: Date;
        updatedAt: Date;
        sub: number | null;
        profileImage: string | null;
        verified: boolean;
        organizationId: number | null;
    };
}, {
    status: number;
    body: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        role: "ADMIN" | "MANAGER" | "CHEF" | "STAFF" | "VENDOR";
        restaurantId: number | null;
        createdAt: Date;
        updatedAt: Date;
        sub: number | null;
        profileImage: string | null;
        verified: boolean;
        organizationId: number | null;
    };
}>, z.ZodObject<{
    status: z.ZodLiteral<number>;
    body: z.ZodObject<{
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
    }, {
        message: string;
    }>;
}, "strip", z.ZodTypeAny, {
    status: number;
    body: {
        message: string;
    };
}, {
    status: number;
    body: {
        message: string;
    };
}>]>;
declare const ChangePasswordResponseSchema: z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
    status: z.ZodLiteral<number>;
    body: z.ZodObject<{
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
    }, {
        message: string;
    }>;
}, "strip", z.ZodTypeAny, {
    status: number;
    body: {
        message: string;
    };
}, {
    status: number;
    body: {
        message: string;
    };
}>, z.ZodObject<{
    status: z.ZodLiteral<number>;
    body: z.ZodObject<{
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
    }, {
        message: string;
    }>;
}, "strip", z.ZodTypeAny, {
    status: number;
    body: {
        message: string;
    };
}, {
    status: number;
    body: {
        message: string;
    };
}>]>;
declare const LogoutResponseSchema: z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
    status: z.ZodLiteral<number>;
    body: z.ZodObject<{
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
    }, {
        message: string;
    }>;
}, "strip", z.ZodTypeAny, {
    status: number;
    body: {
        message: string;
    };
}, {
    status: number;
    body: {
        message: string;
    };
}>, z.ZodObject<{
    status: z.ZodLiteral<number>;
    body: z.ZodObject<{
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
    }, {
        message: string;
    }>;
}, "strip", z.ZodTypeAny, {
    status: number;
    body: {
        message: string;
    };
}, {
    status: number;
    body: {
        message: string;
    };
}>]>;
type LoginResponse = z.infer<typeof LoginResponseSchema>;
type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
type ChangePasswordResponse = z.infer<typeof ChangePasswordResponseSchema>;
type LogoutResponse = z.infer<typeof LogoutResponseSchema>;

type RegistrationData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isOrganization?: boolean;
    organizationName?: string;
    restaurants: Restaurant$1 | Restaurant$1[];
};

export { AuthError, type ChangePasswordResponse, ChangePasswordResponseSchema, IngredientSchema, InventoryItemSchema, InventorySchema, type LoginResponse, LoginResponseSchema, type LogoutResponse, LogoutResponseSchema, MessageSchema, type Order, type OrderCreate, type OrderCreateInput, OrderCreateSchema, type OrderItem, type OrderItemCreate, OrderItemCreateSchema, OrderItemSchema, type OrderItemUpdate, OrderItemUpdateSchema, OrderSchema, OrderStatusEnum, type OrderUpdate, type OrderUpdateInput, OrderUpdateSchema, type OrganizationCreateInput, OrganizationCreateSchema, OrganizationSchema, type OrganizationUpdateInput, OrganizationUpdateSchema, type PrepBoardCreate, type PrepBoardUpdate, type Prettify, type Recipe, type RecipeCreate, RecipeCreateSchema, type RecipeFormData, RecipeFormDataSchema, RecipeIngredientCreateSchema, RecipeInstructionCreateSchema, RecipeInstructionSchema, type RecipeUpdate, RecipeUpdateSchema, type RegisterResponse, RegisterResponseSchema, type RegistrationData, type Restaurant, type RestaurantCreate, type RestaurantUpdate, ShiftCreateInput, ShiftStatus, type UserCreateInput, UserCreateSchema, UserRoleEnum, UserSchema, UserUpdateSchema, type Vendor, type VendorCreate, VendorCreateSchema, VendorSchema, type VendorUpdate, VendorUpdateSchema };
