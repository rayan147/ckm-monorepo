import { z } from 'zod';
import { initContract } from '@ts-rest/core';

import {
  zodSchemas
} from '@ckm/db';

const c = initContract();

export const analyticsContract = c.router({
  getFoodCostHistory: {
    method: 'GET',
    path: '/analytics/food-cost-history',
    responses: {
      200: z.array(zodSchemas.FoodCostHistorySchema),
    },
    query: z.object({
      recipeId: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    }),
    summary: 'Get food cost history for a recipe',
  },
  getPrepHistory: {
    method: 'GET',
    path: '/analytics/prep-history',
    responses: {
      200: z.array(zodSchemas.PrepHistorySchema),
    },
    query: z.object({
      recipeId: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    }),
    summary: 'Get prep history for a recipe',
  },
  getMenuAnalytics: {
    method: 'GET',
    path: '/analytics/menu',
    responses: {
      200: z.object({
        lowestCostItem: zodSchemas.MenuItemSchema,
        highestCostItem: zodSchemas.MenuItemSchema,
        averageFoodCost: z.number(),
      }),
    },
    query: z.object({
      menuId: z.string(),
    }),
    summary: 'Get menu analytics',
  },
  getRecipeAnalytics: {
    method: 'GET',
    path: '/analytics/recipe',
    responses: {
      200: z.object({
        averagePrepsPerWeek: z.number(),
        totalPrepCount: z.number(),
        averageFoodCost: z.number(),
        foodCostTrend: z.array(z.object({
          date: z.string(),
          cost: z.number(),
        })),
      }),
    },
    query: z.object({
      recipeId: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    }),
    summary: 'Get recipe analytics',
  },
  getRestaurantAnalytics: {
    method: 'GET',
    path: '/analytics/restaurant',
    responses: {
      200: z.object({
        totalRecipes: z.number(),
        totalMenuItems: z.number(),
        averageFoodCost: z.number(),
        mostPreparedRecipes: z.array(z.object({
          recipe: zodSchemas.RecipeSchema,
          prepCount: z.number(),
        })),
        foodCostTrend: z.array(z.object({
          date: z.string(),
          cost: z.number(),
        })),
      }),
    },
    query: z.object({
      restaurantId: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    }),
    summary: 'Get restaurant analytics',
  },
});
