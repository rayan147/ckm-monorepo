import { Controller } from '@nestjs/common';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { OrderService } from './order.service';
import { Order } from '@ckm/db';

@TsRest({ jsonQuery: true })
@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @TsRestHandler(contract.orders.createOrder)
  async createOrder() {
    return tsRestHandler(contract.orders.createOrder, async ({ body }) => {
      const order = await this.orderService.createOrder(body);
      return { status: 201, body: order };
    });
  }

  @TsRestHandler(contract.orders.getOrders)
  async getOrders() {
    return tsRestHandler(contract.orders.getOrders, async ({ query }) => {
      const orders = await this.orderService.getOrders({
        skip: query.skip,
        take: query.take,
        orderBy: query.orderBy as keyof Order | undefined,
        restaurantId: query.restaurantId,
        vendorId: query.vendorId,
        status: query.status,
      });
      return { status: 200, body: orders };
    });
  }

  @TsRestHandler(contract.orders.getOrder)
  async getOrder() {
    return tsRestHandler(contract.orders.getOrder, async ({ params }) => {
      const order = await this.orderService.getOrder(params.id);
      if (!order) {
        return { status: 404, body: { message: 'Order not found' } };
      }
      return { status: 200, body: order };
    });
  }

  @TsRestHandler(contract.orders.updateOrder)
  async updateOrder() {
    return tsRestHandler(contract.orders.updateOrder, async ({ params, body }) => {
      const order = await this.orderService.updateOrder(params.id, body);
      return { status: 200, body: order };
    });
  }

  @TsRestHandler(contract.orders.deleteOrder)
  async deleteOrder() {
    return tsRestHandler(contract.orders.deleteOrder, async ({ params }) => {
      const order = await this.orderService.deleteOrder(params.id);
      return { status: 200, body: order };
    });
  }
}
