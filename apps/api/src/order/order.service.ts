import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order, Prisma, zodSchemas } from '@ckm/db';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(data: Prisma.OrderCreateInput): Promise<zodSchemas.Order> {
    try {
      const order = await this.prisma.order.create({ data });

      if (!order) throw new BadRequestException('Could not create a new order');
      return order;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Could not create the order', error.message);
      }
      throw new InternalServerErrorException('An error occurred while creating the order');
    }
  }

  async getOrders(params: {
    skip?: number;
    take?: number;
    orderBy?: keyof Order;
    restaurantId?: number;
    vendorId?: number;
    status?: 'PENDING' | 'APPROVED' | 'ORDERED' | 'RECEIVED' | 'CANCELLED';
  }): Promise<Order[]> {
    const { skip, take, orderBy, restaurantId, vendorId, status } = params;
    try {
      const orders = await this.prisma.order.findMany({
        skip,
        take,
        orderBy: orderBy ? { [orderBy]: 'asc' } : undefined,
        where: {
          restaurantId,
          vendorId,
          status,
        },
        include: {
          restaurant: true,
          vendor: true,
          items: true,
        },
      });
      return orders;
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while fetching orders');
    }
  }

  async getOrder(id: number): Promise<Order | null> {
    try {
      return await this.prisma.order.findUnique({
        where: { id },
        include: {
          restaurant: true,
          vendor: true,
          items: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while fetching the order');
    }
  }

  async updateOrder(id: number, data: Prisma.OrderUpdateInput): Promise<Order> {
    try {
      // const prismaUpdateInput = transformOrderUpdate(data);
      const updatedOrder = await this.prisma.order.update({
        where: { id },
        data: data,
        include: {
          restaurant: true,
          vendor: true,
          items: true,
        },
      });

      return updatedOrder;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Order not found');
        }
        throw new BadRequestException('Could not update the order', error.message);
      }
      throw new InternalServerErrorException('An error occurred while updating the order');
    }
  }

  async deleteOrder(id: number): Promise<Order> {
    try {
      return await this.prisma.order.delete({
        where: { id },
        include: {
          restaurant: true,
          vendor: true,
          items: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Order not found');
        }
        throw new BadRequestException('Could not delete the order', error.message);
      }
      throw new InternalServerErrorException('An error occurred while deleting the order');
    }
  }
}
