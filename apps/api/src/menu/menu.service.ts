import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggingService } from '../logging/logging.service';
import { Menu, Prisma } from '@ckm/db';

@Injectable()
export class MenuService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggingService,
  ) {
    this.logger.setContext('MenuService');
  }

  async createMenu(data: Prisma.MenuUncheckedCreateInput): Promise<Menu> {
    try {
      return await this.prisma.menu.create({ data });
    } catch (error) {
      this.logger.handleError(error, 'Failed to create menu');
    }
  }

  async getMenus(params: { skip?: number; take?: number; restaurantId?: number }): Promise<Menu[]> {
    const { skip, take, restaurantId } = params;
    try {
      return await this.prisma.menu.findMany({
        where: { restaurantId },
        skip,
        take,
        include: { menuItems: true },
      });
    } catch (error) {
      this.logger.handleError(error, 'Failed to fetch menus');
    }
  }

  async getMenu(id: number): Promise<Menu> {
    try {
      const menu = await this.prisma.menu.findUnique({
        where: { id },
        include: {
          menuItems: true,

        },
      });
      if (!menu) {
        throw new Error('Menu not found');
      }
      return menu;
    } catch (error) {
      this.logger.handleError(error, `Failed to fetch menu with ID ${id}`);
    }
  }

  async updateMenu(id: number, data: Prisma.MenuUpdateInput): Promise<Menu> {
    try {
      return await this.prisma.menu.update({
        where: { id },
        data,
        include: { menuItems: true },
      });
    } catch (error) {
      this.logger.handleError(error, `Failed to update menu with ID ${id}`);
    }
  }

  async deleteMenu(id: number): Promise<Menu> {
    try {
      return await this.prisma.menu.delete({
        where: { id },
        include: { menuItems: true },
      });
    } catch (error) {
      this.logger.handleError(error, `Failed to delete menu with ID ${id}`);
    }
  }
}
