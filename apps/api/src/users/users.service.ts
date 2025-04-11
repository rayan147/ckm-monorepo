import { Auth, Prisma, User, UserRole } from '@ckm/db';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoggingService } from 'src/logging/logging.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly logger: LoggingService,
  ) {}

  async getAuthUserByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({ where: { email }, include: { auth: true } });
    } catch (error) {
      this.logger.handleError(error, 'Database error in getAuthUserByEmail');
    }
  }
  async getUserByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({ where: { email } });
    } catch (error) {
      this.logger.handleError(error, 'Database error in getUserByEmail');
    }
  }

  async getUser(id: number): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      this.logger.handleError(error, 'Database error in getUser');
    }
  }

  async getAuthUser(id: number): Promise<User & { auth: Auth[] }> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        auth: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUsers(params: { skip?: number; take?: number; orderBy?: keyof User }): Promise<User[]> {
    const { skip, take, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      orderBy: orderBy ? { [orderBy]: 'asc' } : undefined,
    });
  }

  async createUser(
    userData: Prisma.UserCreateInput & {
      password: string;
      role?: UserRole;
      isOrganization?: boolean;
      organizationInput?: { name: string; imageUrl?: string };
      restaurantsInput?: Array<{
        name: string;
        imageUrl?: string;
        address: string;
        city: string;
        zipCode: string;
        state: string;
        owner: string;
      }>;
    },
  ): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const {
        password,
        role = UserRole.STAFF,
        isOrganization,
        organizationInput,
        restaurantsInput,
        ...userDataWithoutAuth
      } = userData;

      // Use Prisma transaction to ensure all related operations succeed or fail together
      return await this.prisma.$transaction(async tx => {
        // Create organization first if applicable
        let organization = null;
        if (isOrganization && organizationInput) {
          organization = await tx.organization.create({
            data: {
              name: organizationInput.name,
              imageUrl: organizationInput.imageUrl,
            },
          });
          this.logger.log('Organization created: ' + organization.id);
        }

        // Create user with auth and connect to organization if applicable
        const user = await tx.user.create({
          data: {
            ...userDataWithoutAuth,
            auth: {
              create: {
                passwordHash: hashedPassword,
                role: role,
              },
            },
            ...(organization ? { organization: { connect: { id: organization.id } } } : {}),
          },
          include: {
            organization: true,
          },
        });
        this.logger.log('User created: ' + user.id);

        // Create restaurants and connect to organization and user if applicable
        if (restaurantsInput && restaurantsInput.length > 0) {
          for (const restaurantData of restaurantsInput) {
            const restaurant = await tx.restaurant.create({
              data: {
                ...restaurantData,
                ...(organization ? { organization: { connect: { id: organization.id } } } : {}),
                users: {
                  connect: { id: user.id },
                },
              },
            });
            this.logger.log('Restaurant created: ' + restaurant.id);
          }
        }

        // Return the user object
        return user;
      });
    } catch (error) {
      this.logger.handleError(error, 'Error creating user with organization and restaurants');
    }
  }

  async updateUser(userId: number, data: Prisma.UserUpdateInput): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteUser(userId: number): Promise<User> {
    try {
      return await this.prisma.user.delete({ where: { id: userId } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateUserRole(userId: number, newRole: UserRole): Promise<User | null> {
    try {
      const user = await this.getAuthUser(userId);

      const priorityOrder: UserRole[] = [UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF];
      const sortedAuth = [...user.auth].sort((a, b) => {
        return priorityOrder.indexOf(a.role) - priorityOrder.indexOf(b.role);
      });

      const authToUpdate = sortedAuth[0];

      await this.prisma.auth.update({
        where: { id: authToUpdate.id },
        data: { role: newRole },
      });
      return this.getUser(userId);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getUsersByRole(role: UserRole): Promise<(User & { auth: Auth[] })[]> {
    try {
      return await this.prisma.user.findMany({
        where: {
          auth: {
            some: {
              role: role,
            },
          },
        },
        include: {
          auth: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
