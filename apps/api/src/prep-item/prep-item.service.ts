import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggingService } from '../logging/logging.service';
import { PrepItem, Prisma } from '@ckm/db';

@Injectable()
export class PrepItemService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggingService,
  ) {
    this.logger.setContext('PrepItemService');
  }

  async createPrepItem(data: Prisma.PrepItemCreateInput): Promise<PrepItem> {
    try {
      return await this.prisma.prepItem.create({
        data,
        include: { prepBoard: true, recipe: true, assignedTo: true },
      });
    } catch (error) {
      this.logger.handleError(error, 'Failed to create prep item');
    }
  }

  async getPrepItems(params: {
    skip?: number;
    take?: number;
    where?: Prisma.PrepItemWhereInput;
    orderBy?: Prisma.PrepItemOrderByWithRelationInput;
  }): Promise<PrepItem[]> {
    const { skip, take, where, orderBy } = params;
    try {
      return await this.prisma.prepItem.findMany({
        skip,
        take,
        where,
        orderBy,
        include: { prepBoard: true, recipe: true, assignedTo: true },
      });
    } catch (error) {
      this.logger.handleError(error, 'Failed to fetch prep items');
    }
  }

  async getPrepItem(id: number): Promise<PrepItem> {
    try {
      const prepItem = await this.prisma.prepItem.findUnique({
        where: { id },
        include: { prepBoard: true, recipe: true, assignedTo: true },
      });
      if (!prepItem) {
        throw new Error('PrepItem not found');
      }
      return prepItem;
    } catch (error) {
      this.logger.handleError(error, `Failed to fetch prep item with ID ${id}`);
    }
  }

  async updatePrepItem(id: number, data: Prisma.PrepItemUpdateInput): Promise<PrepItem> {
    try {
      return await this.prisma.prepItem.update({
        where: { id },
        data,
        include: { prepBoard: true, recipe: true, assignedTo: true },
      });
    } catch (error) {
      this.logger.handleError(error, `Failed to update prep item with ID ${id}`);
    }
  }

  async deletePrepItem(id: number): Promise<PrepItem> {
    try {
      return await this.prisma.prepItem.delete({
        where: { id },
        include: { prepBoard: true, recipe: true, assignedTo: true },
      });
    } catch (error) {
      this.logger.handleError(error, `Failed to delete prep item with ID ${id}`);
    }
  }
}
