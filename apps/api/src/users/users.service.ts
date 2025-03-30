import { Auth, Prisma, User, UserRole } from '@ckm/db';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }


  async getAuthgUserByEmail(email: string): Promise<User & { auth: Auth[] }> {
    const user = await this.prisma.user.findUnique({ where: { email }, include: { auth: true } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }


  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email }, include: { auth: true } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }


  async getUser(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }


  async getAuthUser(id: number): Promise<User & { auth: Auth[] }> {
    const user = await this.prisma.user.findUnique({
      where: { id }, include: {
        auth: true
      }
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }


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


  async createUser(
    userData: Omit<Prisma.UserCreateInput, 'auth'> & { password: string, role?: UserRole }
  ): Promise<User> {
    try {

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const { password, role = UserRole.STAFF, ...userDataWithoutAuth } = userData;

      const user = await this.prisma.user.create({
        data: {
          ...userDataWithoutAuth,
          auth: {
            create: {
              passwordHash: hashedPassword,
              role: role
            }
          }
        },

      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


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


  async deleteUser(userId: number): Promise<User> {
    try {
      return await this.prisma.user.delete({ where: { id: userId } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async updateUserRole(userId: number, newRole: UserRole): Promise<User> {
    try {
      const user = await this.getAuthUser(userId);

      const priorityOrder: UserRole[] = [UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF];
      const sortedAuth = [...user.auth].sort((a, b) => {
        return priorityOrder.indexOf(a.role) - priorityOrder.indexOf(b.role);
      });

      const authToUpdate = sortedAuth[0]

      await this.prisma.auth.update({

        where: { id: authToUpdate.id },
        data: { role: newRole }
      })
      return this.getUser(userId)
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
              role: role
            }
          }
        },
        include: {
          auth: true
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

