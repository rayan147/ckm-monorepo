import { Controller, HttpStatus } from '@nestjs/common';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { RestaurantService } from './restaurant.service';
import { UserRole } from '@ckm/db';
import { Auth } from '../decorators/auth.decorator';

@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @Auth(UserRole.ADMIN)
  @TsRestHandler(contract.restaurant.createRestaurant)
  async createRestaurant() {
    return tsRestHandler(contract.restaurant.createRestaurant, async ({ body }) => {
      const restaurant = await this.restaurantService.createRestaurant(body);
      return { status: HttpStatus.CREATED, body: restaurant };
    });
  }

  @Auth(UserRole.ADMIN, UserRole.MANAGER)
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

  // TODO* add the restaurant with relationships
  @Auth(UserRole.ADMIN, UserRole.MANAGER)
  @TsRestHandler(contract.restaurant.getRestaurant, {
    validateResponses: false
  })
  async getRestaurant() {
    return tsRestHandler(contract.restaurant.getRestaurant, async ({ params }) => {
      const restaurant = await this.restaurantService.getRestaurant(params.id);
      console.log(JSON.stringify(restaurant, null, 2));
      return { status: HttpStatus.OK, body: restaurant };
    });
  }

  @Auth(UserRole.ADMIN, UserRole.MANAGER)
  @TsRestHandler(contract.restaurant.updateRestaurant)
  async updateRestaurant() {
    return tsRestHandler(contract.restaurant.updateRestaurant, async ({ params, body }) => {
      const restaurant = await this.restaurantService.updateRestaurant(params.id, body);
      return { status: HttpStatus.OK, body: restaurant };
    });
  }

  @Auth(UserRole.ADMIN)
  @TsRestHandler(contract.restaurant.deleteRestaurant)
  async deleteRestaurant() {
    return tsRestHandler(contract.restaurant.deleteRestaurant, async ({ params }) => {
      const restaurant = await this.restaurantService.deleteRestaurant(params.id);
      return { status: HttpStatus.OK, body: restaurant };
    });
  }
}
