import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Organization, Prisma } from '@ckm/db';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  async createOrganization(
    data: Prisma.OrganizationCreateInput,
  ): Promise<Organization> {
    try {
      return this.prisma.organization.create({
        data,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(
          'Could not create the organization',
          error,
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async getOrganizations(params: {
    skip?: number;
    take?: number;
    orderBy?: keyof Organization;
  }): Promise<Organization[]> {
    const { skip, take, orderBy } = params;
    try {
      return this.prisma.organization.findMany({
        skip,
        take,
        orderBy: orderBy ? { [orderBy]: 'asc' } : undefined,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(
          'Could not create the organization',
          error,
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async getOrganization(id: number): Promise<Organization | null> {
    try {
      return this.prisma.organization.findUnique({
        where: { id },
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Could not get the organization', error);
      }
      throw new InternalServerErrorException();
    }
  }

  async updateOrganization(
    id: number,
    data: Prisma.OrganizationUpdateInput,
  ): Promise<Organization> {
    try {
      return this.prisma.organization.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(
          'Could not update the organization',
          error,
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async deleteOrganization(id: number): Promise<Organization> {
    try {
      return this.prisma.organization.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(
          'Could not update the organization',
          error,
        );
      }
      throw new InternalServerErrorException();
    }
  }
}
