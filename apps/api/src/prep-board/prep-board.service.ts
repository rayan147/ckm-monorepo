import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggingService } from '../logging/logging.service';
import { PrepBoard, Prisma } from '@ckm/db';

@Injectable()
export class PrepBoardService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggingService,
  ) {
    this.logger.setContext('PrepBoardService');
  }

  async createPrepBoard(data: Prisma.PrepBoardCreateInput): Promise<PrepBoard> {
    try {
      return await this.prisma.prepBoard.create({
        data,
        include: { recipes: true, prepItems: true },
      });
    } catch (error) {
      this.logger.handleError(error, 'Failed to create prep board');
    }
  }

  async getPrepBoards(params: {
    skip?: number;
    take?: number;
    where?: Prisma.PrepBoardWhereInput;
    orderBy?: Prisma.PrepBoardOrderByWithRelationInput;
  }): Promise<PrepBoard[]> {
    const { skip, take, where, orderBy } = params;
    try {
      return await this.prisma.prepBoard.findMany({
        skip,
        take,
        where,
        orderBy,
        include: { recipes: true, prepItems: true },
      });
    } catch (error) {
      this.logger.handleError(error, 'Failed to fetch prep boards');
    }
  }

  async getPrepBoard(id: number): Promise<PrepBoard> {
    try {
      const prepBoard = await this.prisma.prepBoard.findUnique({
        where: { id },
        include: { recipes: true, prepItems: true },
      });
      if (!prepBoard) {
        throw new Error('PrepBoard not found');
      }
      return prepBoard;
    } catch (error) {
      this.logger.handleError(error, `Failed to fetch prep board with ID ${id}`);
    }
  }

  async updatePrepBoard(id: number, data: Prisma.PrepBoardUpdateInput): Promise<PrepBoard> {
    try {
      return await this.prisma.prepBoard.update({
        where: { id },
        data,
        include: { recipes: true, prepItems: true },
      });
    } catch (error) {
      this.logger.handleError(error, `Failed to update prep board with ID ${id}`);
    }
  }

  async deletePrepBoard(id: number): Promise<PrepBoard> {
    try {
      return await this.prisma.prepBoard.delete({
        where: { id },
        include: { recipes: true, prepItems: true },
      });
    } catch (error) {
      this.logger.handleError(error, `Failed to delete prep board with ID ${id}`);
    }
  }
}
