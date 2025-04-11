import { Controller, HttpStatus } from '@nestjs/common';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { RestaurantService } from './restaurant.service';

@TsRest({ jsonQuery: true })
@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @TsRestHandler(contract.restaurant.createRestaurant)
  async createRestaurant() {
    return tsRestHandler(contract.restaurant.createRestaurant, async ({ body }) => {
      const restaurant = await this.restaurantService.createRestaurant(body);
      return { status: HttpStatus.CREATED, body: restaurant };
    });
  }

  @TsRestHandler(contract.restaurant.getRestaurants)
  async getRestaurants() {
    return tsRestHandler(contract.restaurant.getRestaurants, async ({ query }) => {
      const restaurants = await this.restaurantService.getRestaurants({
        skip: query.skip ? parseInt(query.skip) : undefined,
        take: query.take ? parseInt(query.take) : undefined,
        organizationId: query.organizationId ? parseInt(query.organizationId) : undefined,
      });
      return { status: HttpStatus.OK, body: restaurants };
    });
  }

  @TsRestHandler(contract.restaurant.getRestaurant)
  async getRestaurant() {
    return tsRestHandler(contract.restaurant.getRestaurant, async ({ params }) => {
      const restaurant = await this.restaurantService.getRestaurant(params.id);
      return { status: HttpStatus.OK, body: restaurant };
    });
  }

  @TsRestHandler(contract.restaurant.updateRestaurant)
  async updateRestaurant() {
    return tsRestHandler(contract.restaurant.updateRestaurant, async ({ params, body }) => {
      const restaurant = await this.restaurantService.updateRestaurant(params.id, body);
      return { status: HttpStatus.OK, body: restaurant };
    });
  }

  @TsRestHandler(contract.restaurant.deleteRestaurant)
  async deleteRestaurant() {
    return tsRestHandler(contract.restaurant.deleteRestaurant, async ({ params }) => {
      const restaurant = await this.restaurantService.deleteRestaurant(params.id);
      return { status: HttpStatus.OK, body: restaurant };
    });
  }
}
