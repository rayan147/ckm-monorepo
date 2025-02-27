import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma, UserRole, zodSchemas } from '@ckm/db';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  /**
   * Retrieves a user by their email.
   * @throws {NotFoundException} if no user is found.
   */
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Retrieves a user by their ID.
   * @throws {NotFoundException} if no user is found.
   */
  async getUser(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Retrieves a list of users, optionally paginated and sorted.
   */
  async getUsers(params: {
    skip?: number;
    take?: number;
    orderBy?: keyof User;
  }): Promise<User[]> {
    const { skip, take, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      orderBy: orderBy ? { [orderBy]: 'asc' } : undefined,
    });
  }

  /**
   * Creates a new user.
   * Automatically hashes the provided `passwordHash` value before storing.
   */
  async createUser(
    data: Omit<Prisma.UserCreateInput, 'restaurant' | 'organization'> & {
      restaurantId?: number | null;
      organizationId?: number | null;
    },
  ): Promise<zodSchemas.User> {
    try {
      // 1. Hash the password
      const hashedPassword = await bcrypt.hash(data.passwordHash, 10);

      // 2. Build the creation data
      const { restaurantId, organizationId, ...rest } = data;
      const createData: Prisma.UserCreateInput = {
        ...rest,
        passwordHash: hashedPassword,
      };

      if (organizationId) {
        createData.organization = { connect: { id: organizationId } };
      }
      if (restaurantId) {
        createData.restaurant = { connect: { id: restaurantId } };
      }

      // 3. Create the user
      return await this.prisma.user.create({ data: createData });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates an existing user.
   */
  async updateUser(
    userId: number,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Deletes a user by ID.
   */
  async deleteUser(userId: number): Promise<User> {
    try {
      return await this.prisma.user.delete({ where: { id: userId } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Deletes a user's session, given a user ID and session token.
   * Adjust according to your schema's unique constraints.
   */
  async deleteSession(userId: number, sessionToken: string): Promise<void> {
    // If your Prisma schema has a unique composite or uses `token` as unique,
    // adjust accordingly:
    try {
      await this.prisma.session.delete({
        where: { token: sessionToken },
      });
    } catch (error) {
      // Decide if you want to ignore this or throw if session not found:
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates a user's role.
   */
  async updateUserRole(userId: number, newRole: UserRole): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data: { role: newRole },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Retrieves all users with a given role.
   */
  async getUsersByRole(role: UserRole): Promise<User[]> {
    try {
      return await this.prisma.user.findMany({ where: { role } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

