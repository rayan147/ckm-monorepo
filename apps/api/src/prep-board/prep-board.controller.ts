import { Controller } from '@nestjs/common';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { PrepBoardService } from './prep-board.service';
import { LoggingService } from '../logging/logging.service';

@TsRest({ jsonQuery: true })
@Controller()
export class PrepBoardController {
  constructor(
    private readonly prepBoardService: PrepBoardService,
    private readonly logger: LoggingService,
  ) {
    this.logger.setContext('PrepBoardController');
  }

  @TsRestHandler(contract.prepBoard.createPrepBoard)
  async createPrepBoard() {
    return tsRestHandler(contract.prepBoard.createPrepBoard, async ({ body }) => {
      this.logger.log('Received request to create prep board');
      const prepBoard = await this.prepBoardService.createPrepBoard(body);
      return { status: 201, body: prepBoard };
    });
  }

  @TsRestHandler(contract.prepBoard.getPrepBoards)
  async getPrepBoards() {
    return tsRestHandler(contract.prepBoard.getPrepBoards, async ({ query }) => {
      this.logger.log('Received request to get prep boards');
      const prepBoards = await this.prepBoardService.getPrepBoards({
        skip: query.skip,
        take: query.take,
        where: query.where,
        orderBy: query.orderBy,
      });
      return { status: 200, body: prepBoards };
    });
  }

  @TsRestHandler(contract.prepBoard.getPrepBoard)
  async getPrepBoard() {
    return tsRestHandler(contract.prepBoard.getPrepBoard, async ({ params }) => {
      this.logger.log(`Received request to get prep board with ID ${params.id}`);
      const prepBoard = await this.prepBoardService.getPrepBoard(params.id);
      return { status: 200, body: prepBoard };
    });
  }

  @TsRestHandler(contract.prepBoard.updatePrepBoard)
  async updatePrepBoard() {
    return tsRestHandler(contract.prepBoard.updatePrepBoard, async ({ params, body }) => {
      this.logger.log(`Received request to update prep board with ID ${params.id}`);
      const prepBoard = await this.prepBoardService.updatePrepBoard(params.id, body);
      return { status: 200, body: prepBoard };
    });
  }

  @TsRestHandler(contract.prepBoard.deletePrepBoard)
  async deletePrepBoard() {
    return tsRestHandler(contract.prepBoard.deletePrepBoard, async ({ params }) => {
      this.logger.log(`Received request to delete prep board with ID ${params.id}`);
      const prepBoard = await this.prepBoardService.deletePrepBoard(params.id);
      return {
        status: 200,
        body: { message: 'PrepBoard deleted successfully' },
      };
    });
  }
}
