import { Controller } from '@nestjs/common';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { MenuService } from './menu.service';
import { UserRole } from '@ckm/db';
import { Auth } from '../decorators/auth.decorator';
import { LoggingService } from '../logging/logging.service';

@TsRest({ jsonQuery: true })
@Controller()
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly logger: LoggingService,
  ) {
    this.logger.setContext('MenuController');
  }

  @Auth(UserRole.ADMIN, UserRole.MANAGER)
  @TsRestHandler(contract.menu.createMenu)
  async createMenu() {
    return tsRestHandler(contract.menu.createMenu, async ({ body }) => {
      this.logger.log('Received request to create menu');
      const menu = await this.menuService.createMenu(body);
      return { status: 201, body: menu };
    });
  }

  @Auth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CHEF, UserRole.STAFF)
  @TsRestHandler(contract.menu.getMenus)
  async getMenus() {
    return tsRestHandler(contract.menu.getMenus, async ({ query }) => {
      this.logger.log('Received request to get menus');
      const menus = await this.menuService.getMenus({
        skip: query.skip,
        take: query.take,
        restaurantId: query.restaurantId,
      });
      return { status: 200, body: menus };
    });
  }

  @Auth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CHEF, UserRole.STAFF)
  @TsRestHandler(contract.menu.getMenu)
  async getMenu() {
    return tsRestHandler(contract.menu.getMenu, async ({ params }) => {
      this.logger.log(`Received request to get menu with ID ${params.id}`);
      const menu = await this.menuService.getMenu(params.id);
      return { status: 200, body: menu };
    });
  }

  @Auth(UserRole.ADMIN, UserRole.MANAGER)
  @TsRestHandler(contract.menu.updateMenu)
  async updateMenu() {
    return tsRestHandler(contract.menu.updateMenu, async ({ params, body }) => {
      this.logger.log(`Received request to update menu with ID ${params.id}`);
      const menu = await this.menuService.updateMenu(params.id, body);
      return { status: 200, body: menu };
    });
  }

  @Auth(UserRole.ADMIN, UserRole.MANAGER)
  @TsRestHandler(contract.menu.deleteMenu)
  async deleteMenu() {
    return tsRestHandler(contract.menu.deleteMenu, async ({ params }) => {
      this.logger.log(`Received request to delete menu with ID ${params.id}`);
      const menu = await this.menuService.deleteMenu(params.id);
      return { status: 200, body: { message: 'Menu deleted successfully' } };
    });
  }
}
