import { Controller } from '@nestjs/common';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { MenuItemService } from './menu-item.service';
import { LoggingService } from '../logging/logging.service';

@TsRest({ jsonQuery: true })
@Controller()
export class MenuItemController {
  constructor(
    private readonly menuItemService: MenuItemService,
    private readonly logger: LoggingService,
  ) {
    this.logger.setContext('MenuItemController');
  }

  @TsRestHandler(contract.menuItem.createMenuItem)
  async createMenuItem() {
    return tsRestHandler(contract.menuItem.createMenuItem, async ({ body }) => {
      this.logger.log('Received request to create menu item');
      const menuItem = await this.menuItemService.createMenuItem(body);
      return { status: 201, body: menuItem };
    });
  }

  @TsRestHandler(contract.menuItem.getMenuItems)
  async getMenuItems() {
    return tsRestHandler(contract.menuItem.getMenuItems, async ({ query }) => {
      this.logger.log('Received request to get menu items');
      const menuItems = await this.menuItemService.getMenuItems({
        skip: query.skip,
        take: query.take,
        menuId: query.menuId,
      });
      return { status: 200, body: menuItems };
    });
  }

  @TsRestHandler(contract.menuItem.getMenuItem)
  async getMenuItem() {
    return tsRestHandler(contract.menuItem.getMenuItem, async ({ params }) => {
      this.logger.log(`Received request to get menu item with ID ${params.id}`);
      const menuItem = await this.menuItemService.getMenuItem(params.id);
      return { status: 200, body: menuItem };
    });
  }

  @TsRestHandler(contract.menuItem.updateMenuItem)
  async updateMenuItem() {
    return tsRestHandler(
      contract.menuItem.updateMenuItem,
      async ({ params, body }) => {
        this.logger.log(
          `Received request to update menu item with ID ${params.id}`,
        );
        const menuItem = await this.menuItemService.updateMenuItem(
          params.id,
          body,
        );
        return { status: 200, body: menuItem };
      },
    );
  }

  @TsRestHandler(contract.menuItem.deleteMenuItem)
  async deleteMenuItem() {
    return tsRestHandler(
      contract.menuItem.deleteMenuItem,
      async ({ params }) => {
        this.logger.log(
          `Received request to delete menu item with ID ${params.id}`,
        );
        const menuItem = await this.menuItemService.deleteMenuItem(params.id);
        return {
          status: 200,
          body: { message: 'Menu item deleted successfully' },
        };
      },
    );
  }

  @TsRestHandler(contract.menuItem.addRecipeToMenuItem)
  async addRecipeToMenuItem() {
    return tsRestHandler(
      contract.menuItem.addRecipeToMenuItem,
      async ({ body }) => {
        this.logger.log(
          `Received request to add recipe ${body.recipeId} to menu item ${body.menuItemId}`,
        );
        const recipe = await this.menuItemService.addRecipeToMenuItem(
          body.menuItemId,
          body.recipeId,
        );
        return { status: 201, body: recipe };
      },
    );
  }

  // getMenuItemByRecipeId
  @TsRestHandler(contract.menuItem.getMenuItemByRecipeId)
  async getMenuItemByRecipeId() {
    return tsRestHandler(
      contract.menuItem.getMenuItemByRecipeId,
      async ({ params }) => {
        this.logger.log(
          `Received request to get menu item by recipe ID ${params.recipeId}`,
        );
        const menuItem = await this.menuItemService.getMenuItemByRecipeId(
          params.recipeId,
        );
        return { status: 200, body: menuItem };
      },
    );
  }
  //calculateMenuItemPrice
  @TsRestHandler(contract.menuItem.calculateMenuItemPrice)
  async calculateMenuItemPrice() {
    return tsRestHandler(
      contract.menuItem.calculateMenuItemPrice,
      async ({ params }) => {
        this.logger.log(
          `Received request to calculate menu item price for menu item ${params.menuItemId}`,
        );
        const price = await this.menuItemService.calculateMenuItemPrice(
          params.menuItemId,
        );
        return { status: 200, body: price };
      },
    );
  }
  // calculateMenuItemFoodCostPercentage
  @TsRestHandler(contract.menuItem.calculateMenuItemFoodCostPercentage)
  async calculateMenuItemFoodCostPercentage() {
    return tsRestHandler(
      contract.menuItem.calculateMenuItemFoodCostPercentage,
      async ({ params }) => {
        this.logger.log(
          `Received request to calculate menu item food cost percentage for menu item ${params.menuItemId}`,
        );
        const foodCostPercentage =
          await this.menuItemService.calculateMenuItemFoodCostPercentage(
            params.menuItemId,
          );
        return { status: 200, body: foodCostPercentage };
      },
    );
  }
  // calculateItemsFoodCostPercentage
  @TsRestHandler(contract.menuItem.calculateItemsFoodCostPercentage)
  async calculateItemsFoodCostPercentage() {
    return tsRestHandler(
      contract.menuItem.calculateItemsFoodCostPercentage,
      async ({ query }) => {
        this.logger.log(
          `Received request to calculate items food cost percentage`,
        );
        const foodCostPercentage =
          await this.menuItemService.calculateItemsFoodCostPercentage(
            query.menuItemIds,
          );
        return { status: 200, body: foodCostPercentage };
      },
    );
  }
} // end of Controller
