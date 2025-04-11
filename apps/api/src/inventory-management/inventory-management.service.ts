import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggingService } from '../logging/logging.service';
import { Inventory, InventoryItem } from '@ckm/db';

@Injectable()
export class InventoryManagementService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggingService,
  ) {
    this.logger.setContext('InventoryManagementService');
  }

  async createInventory(restaurantId: number): Promise<Inventory> {
    this.logger.log(`Creating inventory for restaurant ${restaurantId}`);
    try {
      const inventory = await this.prisma.inventory.create({
        data: { restaurantId },
      });
      this.logger.log(`Inventory created successfully with ID ${inventory.id}`);
      return inventory;
    } catch (error) {
      this.logger.handleError(error, `Failed to create inventory for restaurant ${restaurantId}`);
    }
  }

  async addInventoryItem(data: Omit<InventoryItem, 'id' | 'lastUpdated'>): Promise<InventoryItem> {
    this.logger.log(`Adding inventory item for ingredient ${data.ingredientId}`);
    try {
      const item = await this.prisma.inventoryItem.create({ data });
      this.logger.log(`Inventory item added successfully with ID ${item.id}`);
      return item;
    } catch (error) {
      this.logger.handleError(error, 'Failed to add inventory item');
    }
  }

  async updateInventoryItemQuantity(
    id: number,
    quantity: number,
    updatedById: number,
  ): Promise<InventoryItem> {
    this.logger.log(`Updating quantity for inventory item ${id}`);
    try {
      const item = await this.prisma.inventoryItem.update({
        where: { id },
        data: {
          quantity,
          lastUpdatedById: updatedById,
        },
      });
      this.logger.log(`Quantity updated successfully for inventory item ${id}`);
      return item;
    } catch (error) {
      this.logger.handleError(error, `Failed to update quantity for inventory item ${id}`);
    }
  }

  async getInventoryForRestaurant(restaurantId: number): Promise<InventoryItem[]> {
    this.logger.log(`Fetching inventory for restaurant ${restaurantId}`);
    try {
      const inventory = await this.prisma.inventory.findUnique({
        where: { restaurantId },
        include: { items: true },
      });

      if (!inventory) {
        this.logger.log(`No inventory found for restaurant ${restaurantId}`);
        return [];
      }

      return inventory.items;
    } catch (error) {
      this.logger.handleError(error, `Failed to fetch inventory for restaurant ${restaurantId}`);
    }
  }
}
