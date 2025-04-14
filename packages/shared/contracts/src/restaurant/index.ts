import { restaurantBaseContract } from './restaurant.base.web';
import { restaurantDetailContract } from './restaurant.web';
import { initContract } from '@ts-rest/core';

const c = initContract();

export const restaurantContract = c.router({
  ...restaurantBaseContract,
  ...restaurantDetailContract,
});
