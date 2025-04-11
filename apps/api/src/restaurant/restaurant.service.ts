import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import type { Restaurant } from '@ckm/db';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@ckm/db';
import { OrganizationService } from 'src/organization/organization.service';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class RestaurantService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly organizationService: OrganizationService,
    private readonly logger: LoggingService,
  ) {}

  async createRestaurant(data: Prisma.RestaurantCreateInput): Promise<Restaurant> {
    try {
      const createData = {
        name: data.name,
        address: data.address,
        imageUrl: data.imageUrl,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        owner: data.owner,
        organization: data.organization
          ? { connect: { id: data.organization?.connect?.id } }
          : undefined,
      } satisfies Prisma.RestaurantCreateInput;

      const restaurant = await this.prisma.restaurant.create({
        data: createData,
        include: {
          organization: true,
          users: true,
          cookbooks: {
            include: {
              recipes: true,
            },
          },
          inventory: true,
          orders: true,
        },
      });

      return restaurant;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('A restaurant with this name already exists');
        }
      }
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to create restaurant');
    }
  }

  async getRestaurants(params: {
    skip?: number;
    take?: number;
    organizationId?: number;
  }): Promise<Restaurant[]> {
    const { skip, take, organizationId } = params;

    const findManyData = {
      skip,
      take,
      include: {
        orders: true,
        inventory: true,
      },
    } satisfies Prisma.RestaurantFindManyArgs;

    const whereInput = {
      organizationId,
      isDeleted: false,
    } satisfies Prisma.RestaurantWhereInput;

    try {
      return await this.prisma.restaurant.findMany({
        where: whereInput,
        ...findManyData,
      });
    } catch (error) {
      throw new BadRequestException('Failed to fetch restaurants');
    }
  }

  async getRestaurant(id: number): Promise<Restaurant> {
    try {
      const restaurant = await this.prisma.restaurant.findUnique({
        where: { id, isDeleted: false },
      });
      if (!restaurant) throw new NotFoundException('Restaurant not found');
      return restaurant;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Failed to fetch restaurant');
    }
  }

  async updateRestaurant(id: number, data: Prisma.RestaurantUpdateInput): Promise<Restaurant> {
    try {
      return await this.prisma.restaurant.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Restaurant not found');
        }
      }
      throw new BadRequestException('Failed to update restaurant');
    }
  }

  async deleteRestaurant(id: number): Promise<Restaurant> {
    try {
      const now = new Date().toISOString();
      return await this.prisma.restaurant.update({
        where: { id },
        data: { isDeleted: true, deleted: now },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Restaurant not found');
        }
        throw new BadRequestException(error as unknown as string);
      }
      if (error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(error);
      }
      throw error;
    }
  }
}
