import { Controller } from '@nestjs/common';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { ShiftService } from './shifts.service';
import { LoggingService } from '../logging/logging.service';

@TsRest({ jsonQuery: true })
@Controller()
export class ShiftController {
  constructor(
    private readonly shiftService: ShiftService,
    private readonly logger: LoggingService,
  ) {
    this.logger.setContext('ShiftController');
  }

  @TsRestHandler(contract.shifts.getShifts)
  async getShifts() {
    return tsRestHandler(contract.shifts.getShifts, async ({ query }) => {
      this.logger.log('Received request to get shifts');
      const shifts = await this.shiftService.getShifts({
        skip: query.skip,
        take: query.take,
        userId: query.userId,
        status: query.status,
      });
      return { status: 200, body: shifts };
    });
  }

  @TsRestHandler(contract.shifts.getShift)
  async getShift() {
    return tsRestHandler(contract.shifts.getShift, async ({ params }) => {
      this.logger.log(`Received request to get shift with ID ${params.id}`);
      const shift = await this.shiftService.getShift(params.id);
      return { status: 200, body: shift };
    });
  }

  @TsRestHandler(contract.shifts.updateShift)
  async updateShift() {
    return tsRestHandler(contract.shifts.updateShift, async ({ params, body }) => {
      this.logger.log(`Received request to update shift with ID ${params.id}`);
      const shift = await this.shiftService.updateShift(params.id, body);
      return { status: 200, body: shift };
    });
  }

  @TsRestHandler(contract.shifts.deleteShift)
  async deleteShift() {
    return tsRestHandler(contract.shifts.deleteShift, async ({ params }) => {
      this.logger.log(`Received request to delete shift with ID ${params.id}`);
      const shift = await this.shiftService.deleteShift(params.id);
      return { status: 200, body: shift };
    });
  }

  @TsRestHandler(contract.shifts.createShift)
  async createShift() {
    return tsRestHandler(contract.shifts.createShift, async ({ body }) => {
      this.logger.log('Received request to create shift');
      const shift = await this.shiftService.createShift(body);
      return { status: 201, body: shift };
    });
  }
}
