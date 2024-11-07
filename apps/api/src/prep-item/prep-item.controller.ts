import { Controller } from '@nestjs/common';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { PrepItemService } from './prep-item.service';
import { LoggingService } from '../logging/logging.service';

@TsRest({ jsonQuery: true })
@Controller()
export class PrepItemController {
  constructor(
    private readonly prepItemService: PrepItemService,
    private readonly logger: LoggingService,
  ) {
    this.logger.setContext('PrepItemController');
  }

  @TsRestHandler(contract.prepItem.createPrepItem)
  async createPrepItem() {
    return tsRestHandler(contract.prepItem.createPrepItem, async ({ body }) => {
      this.logger.log('Received request to create prep item');
      const prepItem = await this.prepItemService.createPrepItem(body);
      return { status: 201, body: prepItem };
    });
  }

  @TsRestHandler(contract.prepItem.getPrepItems)
  async getPrepItems() {
    return tsRestHandler(contract.prepItem.getPrepItems, async ({ query }) => {
      this.logger.log('Received request to get prep items');
      const prepItems = await this.prepItemService.getPrepItems({
        skip: query.skip,
        take: query.take,
        where: query.where,
        orderBy: query.orderBy,
      });
      return { status: 200, body: prepItems };
    });
  }

  @TsRestHandler(contract.prepItem.getPrepItem)
  async getPrepItem() {
    return tsRestHandler(contract.prepItem.getPrepItem, async ({ params }) => {
      this.logger.log(`Received request to get prep item with ID ${params.id}`);
      const prepItem = await this.prepItemService.getPrepItem(params.id);
      return { status: 200, body: prepItem };
    });
  }

  @TsRestHandler(contract.prepItem.updatePrepItem)
  async updatePrepItem() {
    return tsRestHandler(
      contract.prepItem.updatePrepItem,
      async ({ params, body }) => {
        this.logger.log(
          `Received request to update prep item with ID ${params.id}`,
        );
        const prepItem = await this.prepItemService.updatePrepItem(
          params.id,
          body,
        );
        return { status: 200, body: prepItem };
      },
    );
  }

  @TsRestHandler(contract.prepItem.deletePrepItem)
  async deletePrepItem() {
    return tsRestHandler(
      contract.prepItem.deletePrepItem,
      async ({ params }) => {
        this.logger.log(
          `Received request to delete prep item with ID ${params.id}`,
        );
        const prepItem = await this.prepItemService.deletePrepItem(params.id);
        return {
          status: 200,
          body: { message: 'PrepItem deleted successfully' },
        };
      },
    );
  }
}
