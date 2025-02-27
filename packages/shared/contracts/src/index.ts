import { initContract, type AppRouter } from '@ts-rest/core';


import { userContract } from "./users"
import { organizationContract } from './organization';
import { orderContract } from './order';
import { orderItemContract } from './orderItem';
import { restaurantContract } from './restaurant';
import { shiftContract } from './shifts';
import { recipeContract } from './recipe';
import { vendorContract } from './vendor/vendor.web';
import { prepBoardContract } from "./prep-board";
import { authContract } from './auth';
import { earlyAccessContract } from './early-access';
import { menuContract } from './menu';
import { menuItemContract } from './menu-item';
import { analyticsContract } from './analytic';
import { cookbookContract } from './cook-book';
import { ingredientContract } from './ingredient';
import { prepItemContract } from './prep-item';

const c = initContract();

export const contract = c.router({
  orgs: organizationContract,
  users: userContract,
  orders: orderContract,
  orderItem: orderItemContract,
  restaurant: restaurantContract,
  shifts: shiftContract,
  recipe: recipeContract,
  vendor: vendorContract,
  prepBoard: prepBoardContract,
  auth: authContract,
  earlyAccess: earlyAccessContract,
  menu: menuContract,
  menuItem: menuItemContract,
  analytics: analyticsContract,
  cookbook: cookbookContract,
  ingredient: ingredientContract,
  prepItem: prepItemContract

}, {
  pathPrefix: "/api/v1"
}) satisfies AppRouter
