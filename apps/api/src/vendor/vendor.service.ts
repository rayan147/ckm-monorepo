import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggingService } from '../logging/logging.service';
import { Vendor, VendorCreate, VendorUpdate } from '@ckm/types';
import { Prisma } from '@ckm/db';
import { zodSchemas } from '@ckm/db';

@Injectable()
export class VendorService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggingService,
  ) {
    this.logger.setContext('VendorService');
  }

  async createVendor(data: VendorCreate): Promise<Vendor> {
    this.logger.log(`Creating new vendor: ${data.name}`);
    try {
      return await this.prisma.vendor.create({
        data,
        include: { orders: true },
      });
    } catch (error) {
      this.logger.handleError(error, 'Failed to create vendor');
    }
  }

  async getVendors(params: {
    skip?: number;
    take?: number;
    name?: string;
  }): Promise<Vendor[]> {
    const { skip, take, name } = params;
    this.logger.log(`Fetching vendors with params: ${JSON.stringify(params)}`);
    try {
      return await this.prisma.vendor.findMany({
        where: name
          ? { name: { contains: name, mode: 'insensitive' } }
          : undefined,
        skip,
        take,
        include: {
          orders: true,
        },
      });
    } catch (error) {
      this.logger.handleError(error, 'Failed to fetch vendors');
    }
  }

  async getVendor(id: number): Promise<Vendor> {
    this.logger.log(`Fetching vendor with ID ${id}`);
    try {
      const vendor = await this.prisma.vendor.findUnique({
        where: { id },
        include: { orders: true },
      });
      if (!vendor) {
        this.logger.handleError(
          new Error('Vendor not found'),
          `Vendor with ID ${id} not found`,
        );
      }
      return vendor;
    } catch (error) {
      this.logger.handleError(error, `Failed to fetch vendor with ID ${id}`);
    }
  }

  async updateVendor(id: number, data: VendorUpdate): Promise<Vendor> {
    this.logger.log(`Updating vendor with ID ${id}`);
    try {
      return await this.prisma.vendor.update({
        where: { id },
        data,
        include: {
          orders: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        this.logger.handleError(
          error,
          `Vendor with ID ${id} not found for update`,
        );
      }
      this.logger.handleError(error, `Failed to update vendor with ID ${id}`);
    }
  }

  async deleteVendor(id: number): Promise<Vendor> {
    this.logger.log(`Deleting vendor with ID ${id}`);
    try {
      return await this.prisma.vendor.delete({
        where: { id },
        include: { orders: true },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        this.logger.handleError(
          error,
          `Vendor with ID ${id} not found for deletion`,
        );
      }
      this.logger.handleError(error, `Failed to delete vendor with ID ${id}`);
    }
  }

  async updateIngredientPrice(
    ingredientId: number,
    vendorId: number,
    newPrice: number,
  ): Promise<zodSchemas.Ingredient> {
    this.logger.log(
      `Updating price for ingredient ${ingredientId} from vendor ${vendorId}`,
    );
    try {
      const ingredient = await this.prisma.ingredient.update({
        where: { id: ingredientId },
        data: { price: newPrice },
      });
      this.logger.log(
        `Price updated successfully for ingredient ${ingredientId}`,
      );
      return ingredient;
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to update price for ingredient ${ingredientId}`,
      );
    }
  }
  async getVendorIngredients(vendorId: number): Promise<zodSchemas.Ingredient[]> {
    this.logger.log(`Fetching ingredients for vendor ${vendorId}`);
    try {
      const vendor = await this.prisma.vendor.findUnique({
        where: { id: vendorId },
        include: { ingredients: true },
      });

      if (!vendor) {
        this.logger.handleError(
          new Error('Vendor not found'),
          `Vendor with ID ${vendorId} not found`,
        );
      }

      return vendor.ingredients;
    } catch (error) {
      this.logger.handleError(
        error,
        `Failed to fetch ingredients for vendor ${vendorId}`,
      );
    }
  }
} // end of VendorService
