import { Controller } from '@nestjs/common';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { OrderItemService } from './order-item.service';

@TsRest({ jsonQuery: true })
@Controller()
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @TsRestHandler(contract.orderItem.createOrderItem)
  async createOrderItem() {
    return tsRestHandler(
      contract.orderItem.createOrderItem,
      async ({ body }) => {
        const orderItem = await this.orderItemService.createOrderItem(body);
        return { status: 201, body: orderItem };
      },
    );
  }

  @TsRestHandler(contract.orderItem.getOrderItems)
  async getOrderItems() {
    return tsRestHandler(
      contract.orderItem.getOrderItems,
      async ({ query }) => {
        const orderItems = await this.orderItemService.getOrderItems({
          skip: query.skip ? parseInt(query.skip) : undefined,
          take: query.take ? parseInt(query.take) : undefined,
          orderId: query.orderId ? parseInt(query.orderId) : undefined,
        });
        return { status: 200, body: orderItems };
      },
    );
  }

  @TsRestHandler(contract.orderItem.getOrderItem)
  async getOrderItem() {
    return tsRestHandler(
      contract.orderItem.getOrderItem,
      async ({ params }) => {
        const orderItem = await this.orderItemService.getOrderItem(params.id);
        return { status: 200, body: orderItem };
      },
    );
  }

  @TsRestHandler(contract.orderItem.updateOrderItem)
  async updateOrderItem() {
    return tsRestHandler(
      contract.orderItem.updateOrderItem,
      async ({ params, body }) => {
        const orderItem = await this.orderItemService.updateOrderItem(
          params.id,
          body,
        );
        return { status: 200, body: orderItem };
      },
    );
  }

  @TsRestHandler(contract.orderItem.deleteOrderItem)
  async deleteOrderItem() {
    return tsRestHandler(
      contract.orderItem.deleteOrderItem,
      async ({ params }) => {
        const orderItem = await this.orderItemService.deleteOrderItem(
          params.id,
        );
        return { status: 200, body: orderItem };
      },
    );
  }
}
