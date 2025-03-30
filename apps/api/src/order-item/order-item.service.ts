import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderItem, Prisma } from '@ckm/db';

@Injectable()
export class OrderItemService {
  constructor(private prisma: PrismaService) { }

  async createOrderItem(data: Prisma.OrderItemCreateInput): Promise<OrderItem> {
    try {
      return await this.prisma.orderItem.create({ data });
    } catch (error) {
      throw new BadRequestException('Failed to create order item');
    }
  }

  async getOrderItems(params: {
    skip?: number;
    take?: number;
    orderId?: number;
  }): Promise<OrderItem[]> {
    const { skip, take, orderId } = params;
    try {
      return await this.prisma.orderItem.findMany({
        where: { orderId },
        skip,
        take,
      });
    } catch (error) {
      throw new BadRequestException('Failed to fetch order items');
    }
  }

  async getOrderItem(id: number): Promise<OrderItem> {
    try {
      const orderItem = await this.prisma.orderItem.findUnique({
        where: { id },
      });
      if (!orderItem) throw new NotFoundException('Order item not found');
      return orderItem;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Failed to fetch order item');
    }
  }

  async updateOrderItem(id: number, data: Prisma.OrderItemUpdateInput): Promise<OrderItem> {
    try {
      return await this.prisma.orderItem.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Order item not found');
      }
      throw new BadRequestException('Failed to update order item');
    }
  }

  async deleteOrderItem(id: number): Promise<OrderItem> {
    try {
      return await this.prisma.orderItem.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Order item not found');
      }
      throw new BadRequestException('Failed to delete order item');
    }
  }
}
