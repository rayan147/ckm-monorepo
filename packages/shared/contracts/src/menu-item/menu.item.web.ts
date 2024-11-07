import { zodSchemas } from '@ckm/db';
import { getErrorMap, z } from 'zod';
import { initContract } from '@ts-rest/core';

const c = initContract();

// export const zodSchemas.MenuItemCreateInputSchema: z.ZodType<Prisma.MenuItemCreateInput> = z.object({
//   name: z.string(),
//   description: z.string().optional().nullable(),
//   price: z.number(),
//   foodCost: z.number(),
//   recipeIds: z.union([ z.lazy(() => MenuItemCreaterecipeIdsInputSchema),z.number().int().array() ]).optional(),
//   recipeServingsAmount: z.union([ z.lazy(() => MenuItemCreaterecipeServingsAmountInputSchema),z.number().array() ]).optional(),
//   recipeServingsCost: z.union([ z.lazy(() => MenuItemCreaterecipeServingsCostInputSchema),z.number().array() ]).optional(),
//   createdAt: z.coerce.date().optional(),
//   updatedAt: z.coerce.date().optional(),
//   menu: z.lazy(() => MenuCreateNestedOneWithoutMenuItemsInputSchema),
//   recipes: z.lazy(() => RecipeCreateNestedManyWithoutMenuItemsInputSchema).optional(),
//   menuItemRecipe: z.lazy(() => MenuItemRecipeCreateNestedManyWithoutMenuItemInputSchema).optional()
// }).strict();

// export const zodSchemas.MenuItemUpdateInputSchema: z.ZodType<Prisma.MenuItemUpdateInput> = z.object({
//   name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
//   description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
//   price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
//   foodCost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
//   recipeIds: z.union([ z.lazy(() => MenuItemUpdaterecipeIdsInputSchema),z.number().int().array() ]).optional(),
//   recipeServingsAmount: z.union([ z.lazy(() => MenuItemUpdaterecipeServingsAmountInputSchema),z.number().array() ]).optional(),
//   recipeServingsCost: z.union([ z.lazy(() => MenuItemUpdaterecipeServingsCostInputSchema),z.number().array() ]).optional(),
//   createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
//   updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
//   menu: z.lazy(() => MenuUpdateOneRequiredWithoutMenuItemsNestedInputSchema).optional(),
//   recipes: z.lazy(() => RecipeUpdateManyWithoutMenuItemsNestedInputSchema).optional(),
//   menuItemRecipe: z.lazy(() => MenuItemRecipeUpdateManyWithoutMenuItemNestedInputSchema).optional()
// }).strict();

export const menuItemContract = c.router({
  createMenuItem: {
    method: 'POST',
    path: '/menu-items',
    responses: {
      201: zodSchemas.MenuItemSchema,
      400: z.object({ message: z.string() }),
    },
    body: zodSchemas.MenuItemCreateInputSchema,
    summary: 'Create a new menu item',
  },
  getMenuItems: {
    method: 'GET',
    path: '/menu-items',
    responses: {
      200: z.array(zodSchemas.MenuItemSchema),
    },
    query: z.object({
      menuId: z.coerce.number().optional(),
      skip: z.coerce.number().optional(),
      take: z.coerce.number().optional()
    }),
    summary: 'Get all menu items',
  },
  getMenuItem: {
    method: 'GET',
    path: '/menu-items/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.MenuItemSchema,
      404: z.object({ message: z.string() }),
    },
    summary: 'Get a menu item by ID',
  },
  updateMenuItem: {
    method: 'PUT',
    path: '/menu-items/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: zodSchemas.MenuItemSchema,
      404: z.object({ message: z.string() }),
    },
    body: zodSchemas.MenuItemUpdateInputSchema,
    summary: 'Update a menu item',
  },
  deleteMenuItem: {
    method: 'DELETE',
    path: '/menu-items/:id',
    pathParams: z.object({
      id: z.coerce.number()
    }),
    responses: {
      200: z.object({ message: z.string() }),
      404: z.object({ message: z.string() }),
    },
    summary: 'Delete a menu item',
  },
  addRecipeToMenuItem: {
    method: 'POST',
    path: '/menu-items/recipes',
    responses: {
      200: zodSchemas.MenuItemSchema,
      404: z.object({ message: z.string() }),
    },

    body: z.object({
      menuItemId: z.coerce.number(),
      recipeId: z.coerce.number(),
    }),

    summary: 'Add a recipe to a menu item',

  },

  // getMenuItemByRecipeId
  getMenuItemByRecipeId: {
    method: 'GET',
    path: '/menu-items/recipes/:recipeId',
    pathParams: z.object({
      recipeId: z.coerce.number()
    }),

    responses: {
      200: zodSchemas.MenuItemSchema,
      404: z.object({ message: z.string() }),
    },

    summary: 'Get a menu item by recipe ID',
  },
  // calculateMenuItemPrice
  calculateMenuItemPrice: {
    method: 'GET',
    path: '/menu-items/:menuItemId/price',
    pathParams: z.object({
      menuItemId: z.coerce.number()
    }),

    responses: {
      200: z.number(),
      404: z.object({ message: z.string() }),
    },

    summary: 'Calculate a menu item price',

  },
  //calculateMenuItemFoodCostPercentage
  calculateMenuItemFoodCostPercentage: {
    method: 'GET',
    path: '/menu-items/:menuItemId/food-cost-percentage',
    pathParams: z.object({
      menuItemId: z.coerce.number()
    }),

    responses: {
      200: z.number(),
      404: z.object({ message: z.string() }),
    },

    summary: 'Calculate a menu item food cost percentage',

  },
  // calculateItemsFoodCostPercentage
  calculateItemsFoodCostPercentage: {
    method: 'GET',
    path: '/menu-items/food-cost-percentage',
    query: z.object({
      menuItemIds: z.array(z.coerce.number())
    }),

    responses: {
      200: z.number(),
      404: z.object({ message: z.string() }),
    },

    summary: 'Calculate items food cost percentage',

  },

});
