import { Controller } from '@nestjs/common';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { CookBookService } from './cookbook.service';
import { LoggingService } from '../logging/logging.service';

@TsRest({ jsonQuery: true })
@Controller()
export class CookBookController {
  constructor(
    private readonly cookbookService: CookBookService,
    private readonly logger: LoggingService,
  ) {
    this.logger.setContext('CookBookController');
  }

  @TsRestHandler(contract.cookbook.createCookBook)
  async createCookBook() {
    return tsRestHandler(contract.cookbook.createCookBook, async ({ body }) => {
      this.logger.log('Received request to create cookbook');
      const cookbook = await this.cookbookService.createCookBook(body);
      return { status: 201, body: cookbook };
    });
  }

  @TsRestHandler(contract.cookbook.getCookBooks)
  async getCookBooks() {
    return tsRestHandler(contract.cookbook.getCookBooks, async ({ query }) => {
      this.logger.log('Received request to get cookbooks');
      const cookbooks = await this.cookbookService.getCookBooks({
        skip: query.skip,
        take: query.take,
        restaurantId: query.restaurantId,
      });
      return { status: 200, body: cookbooks };
    });
  }

  @TsRestHandler(contract.cookbook.getCookBook)
  async getCookBook() {
    return tsRestHandler(contract.cookbook.getCookBook, async ({ params }) => {
      this.logger.log(`Received request to get cookbook with ID ${params.id}`);
      const cookbook = await this.cookbookService.getCookBook(params.id);
      return { status: 200, body: cookbook };
    });
  }

  @TsRestHandler(contract.cookbook.updateCookBook)
  async updateCookBook() {
    return tsRestHandler(
      contract.cookbook.updateCookBook,
      async ({ params, body }) => {
        this.logger.log(
          `Received request to update cookbook with ID ${params.id}`,
        );
        const cookbook = await this.cookbookService.updateCookBook(
          params.id,
          body,
        );
        return { status: 200, body: cookbook };
      },
    );
  }

  @TsRestHandler(contract.cookbook.deleteCookBook)
  async deleteCookBook() {
    return tsRestHandler(
      contract.cookbook.deleteCookBook,
      async ({ params }) => {
        this.logger.log(
          `Received request to delete cookbook with ID ${params.id}`,
        );
        const cookbook = await this.cookbookService.deleteCookBook(params.id);
        return {
          status: 200,
          body: { message: 'Cookbook deleted successfully' },
        };
      },
    );
  }
}
