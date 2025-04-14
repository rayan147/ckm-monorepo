import { contract } from '@ckm/contracts';
import { UserRole } from '@ckm/db';
import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { Auth } from '../decorators/auth.decorator';
import { LoggingService } from '../logging/logging.service';
import { ShiftService } from './shifts.service';

@Controller()
export class ShiftController {
  constructor(
    private readonly shiftService: ShiftService,
    private readonly logger: LoggingService,
  ) {
    this.logger.setContext(ShiftController.name);
  }

  @Auth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CHEF, UserRole.STAFF)
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

  @Auth(UserRole.ADMIN, UserRole.MANAGER, UserRole.CHEF, UserRole.STAFF)
  @TsRestHandler(contract.shifts.getShift)
  async getShift() {
    return tsRestHandler(contract.shifts.getShift, async ({ params }) => {
      this.logger.log(`Received request to get shift with ID ${params.id}`);
      const shift = await this.shiftService.getShift(params.id);
      return { status: 200, body: shift };
    });
  }

  @Auth(UserRole.ADMIN, UserRole.MANAGER)
  @TsRestHandler(contract.shifts.updateShift)
  async updateShift() {
    return tsRestHandler(contract.shifts.updateShift, async ({ params, body }) => {
      this.logger.log(`Received request to update shift with ID ${params.id}`);
      const shift = await this.shiftService.updateShift(params.id, body);
      return { status: 200, body: shift };
    });
  }

  @Auth(UserRole.ADMIN, UserRole.MANAGER)
  @TsRestHandler(contract.shifts.deleteShift)
  async deleteShift() {
    return tsRestHandler(contract.shifts.deleteShift, async ({ params }) => {
      this.logger.log(`Received request to delete shift with ID ${params.id}`);
      const shift = await this.shiftService.deleteShift(params.id);
      return { status: 200, body: shift };
    });
  }

  @Auth(UserRole.ADMIN, UserRole.MANAGER)
  @TsRestHandler(contract.shifts.createShift)
  async createShift() {
    return tsRestHandler(contract.shifts.createShift, async ({ body }) => {
      this.logger.log('Received request to create shift');
      const shift = await this.shiftService.createShift(body);
      return { status: 201, body: shift };
    });
  }
}
