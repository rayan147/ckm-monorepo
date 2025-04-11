import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggingService } from '../logging/logging.service';
import { CookBook, Prisma } from '@ckm/db';

@Injectable()
export class CookBookService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggingService,
  ) {
    this.logger.setContext('CookBookService');
  }

  async createCookBook(data: Prisma.CookBookUncheckedCreateInput): Promise<CookBook> {
    try {
      return await this.prisma.cookBook.create({ data });
    } catch (error) {
      this.logger.handleError(error, 'Failed to create cookbook');
    }
  }

  async getCookBooks(params: {
    skip?: number;
    take?: number;
    restaurantId?: number;
  }): Promise<CookBook[]> {
    const { skip, take, restaurantId } = params;
    try {
      return await this.prisma.cookBook.findMany({
        where: { restaurantId },
        skip,
        take,
        include: { recipes: true },
      });
    } catch (error) {
      this.logger.handleError(error, 'Failed to fetch cookbooks');
    }
  }

  async getCookBook(id: number): Promise<CookBook> {
    try {
      const cookbook = await this.prisma.cookBook.findUnique({
        where: { id },
        include: { recipes: true },
      });
      if (!cookbook) {
        throw new Error('Cookbook not found');
      }
      return cookbook;
    } catch (error) {
      this.logger.handleError(error, `Failed to fetch cookbook with ID ${id}`);
    }
  }

  async updateCookBook(id: number, data: Prisma.CookBookUpdateInput): Promise<CookBook> {
    try {
      return await this.prisma.cookBook.update({
        where: { id },
        data,
        include: { recipes: true },
      });
    } catch (error) {
      this.logger.handleError(error, `Failed to update cookbook with ID ${id}`);
    }
  }

  async deleteCookBook(id: number): Promise<CookBook> {
    try {
      return await this.prisma.cookBook.delete({
        where: { id },
        include: { recipes: true },
      });
    } catch (error) {
      this.logger.handleError(error, `Failed to delete cookbook with ID ${id}`);
    }
  }
}
