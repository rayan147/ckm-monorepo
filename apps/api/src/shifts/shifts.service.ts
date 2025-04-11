import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Shift, ShiftCreate, ShiftUpdate } from '@ckm/contracts/src/shifts';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class ShiftService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggingService,
  ) {
    this.logger.setContext('ShiftService');
  }

  async createShift(data: ShiftCreate): Promise<Shift> {
    this.logger.log(`Creating new shift for user ${data.userId}`);
    try {
      const shift = await this.prisma.shift.create({ data });
      this.logger.log(`Shift created successfully with ID ${shift.id}`);
      return shift;
    } catch (error) {
      this.logger.handleError(error, 'Failed to create shift');
    }
  }
  async getShifts(params: {
    skip?: number;
    take?: number;
    userId?: number;
    status?: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
    startTime?: string;
    endTime?: string;
  }): Promise<Shift[]> {
    const { skip, take, userId, status, startTime, endTime } = params;
    this.logger.log(`Fetching shifts with params: ${JSON.stringify(params)}`);

    try {
      const shifts = await this.prisma.shift.findMany({
        where: {
          userId: userId ? Number(userId) : undefined,
          status,
          startTime: startTime ? { gte: new Date(startTime) } : undefined,
          endTime: endTime ? { lte: new Date(endTime) } : undefined,
        },
        skip: skip ? Number(skip) : undefined,
        take: take ? Number(take) : undefined,
        orderBy: [{ startTime: 'asc' }, { endTime: 'asc' }],
      });

      this.logger.log(`Retrieved ${shifts.length} shifts`);
      return shifts;
    } catch (error) {
      this.logger.error(`Failed to fetch shifts: ${error}`);
      throw new Error('Failed to fetch shifts');
    }
  }
  async getShift(id: number): Promise<Shift> {
    this.logger.log(`Fetching shift with ID ${id}`);
    try {
      const shift = await this.prisma.shift.findUnique({ where: { id } });
      if (!shift) {
        this.logger.handleError(new Error('Shift not found'), `Shift with ID ${id} not found`);
      }
      return shift;
    } catch (error) {
      this.logger.handleError(error, `Failed to fetch shift with ID ${id}`);
    }
  }

  async updateShift(id: number, data: ShiftUpdate): Promise<Shift> {
    this.logger.log(`Updating shift with ID ${id}`);
    try {
      const shift = await this.prisma.shift.update({
        where: { id },
        data,
      });
      this.logger.log(`Shift with ID ${id} updated successfully`);
      return shift;
    } catch (error) {
      this.logger.handleError(error, `Failed to update shift with ID ${id}`);
    }
  }

  async deleteShift(id: number): Promise<Shift> {
    this.logger.log(`Deleting shift with ID ${id}`);
    try {
      const shift = await this.prisma.shift.delete({ where: { id } });
      this.logger.log(`Shift with ID ${id} deleted successfully`);
      return shift;
    } catch (error) {
      this.logger.handleError(error, `Failed to delete shift with ID ${id}`);
    }
  }
}
