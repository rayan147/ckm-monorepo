import { contract } from '@ckm/contracts';
import { User, UserRole } from '@ckm/db';
import { Controller, NotFoundException, Req } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { UserService } from './users.service';
import { Request } from 'express';
import { Auth } from '../decorators/auth.decorator';
import { Public } from '../decorators/public.decorator';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @TsRestHandler(contract.users.createUser)
  async createUser() {
    return tsRestHandler(contract.users.createUser, async ({ body }) => {
      try {
        const user = await this.userService.createUser(body);
        return {
          status: 200 as const,
          body: user,
        };
      } catch (error) {
        return {
          status: 500 as const,
          body: { message: (error as Error).message },
        };
      }
    });
  }

  @Auth(UserRole.ADMIN, UserRole.MANAGER)
  @TsRestHandler(contract.users.getUsers)
  async getUsers() {
    return tsRestHandler(contract.users.getUsers, async ({ query }) => {
      const skip = query.skip ? parseInt(query.skip, 10) : undefined;
      const take = query.take ? parseInt(query.take, 10) : undefined;
      const orderBy = query.orderBy as keyof User | undefined;

      try {
        const users = await this.userService.getUsers({ skip, take, orderBy });
        return {
          status: 200 as const,
          body: users,
        };
      } catch (error) {
        return {
          // Adjust if you want a different status for not found, etc.
          status: 500 as const,
          body: { message: (error as Error).message },
        };
      }
    });
  }

  @Auth(UserRole.ADMIN, UserRole.MANAGER)
  @TsRestHandler(contract.users.getUser)
  async getUser() {
    return tsRestHandler(contract.users.getUser, async ({ params }) => {
      try {
        const user = await this.userService.getUser(params.id);
        if (!user) {
          return {
            status: 404,
            body: { message: 'User not found' },
          };
        }
        return {
          status: 200,
          body: user,
        };
      } catch (error) {
        return {
          status: 500 as const,
          body: { message: (error as Error).message },
        };
      }
    });
  }

  @Auth()
  @TsRestHandler(contract.users.getAuthUser)
  async getAuthUser(@Req() req: Request) {
    return tsRestHandler(contract.users.getAuthUser, async ({ params }) => {
      try {
        // Debug session token in this request
        console.log('getAuthUser session token:', req.cookies['session_token']);
        console.log('getAuthUser request params:', params);

        const user = await this.userService.getAuthUser(params.id);
        if (!user) {
          return {
            status: 404,
            body: { message: 'User not found' },
          };
        }
        return {
          status: 200,
          body: user,
        };
      } catch (error) {
        console.error('Error in getAuthUser:', error);
        return {
          status: 500 as const,
          body: { message: (error as Error).message },
        };
      }
    });
  }

  @Auth(UserRole.ADMIN)
  @TsRestHandler(contract.users.updateUser)
  async updateUser() {
    return tsRestHandler(contract.users.updateUser, async ({ params, body }) => {
      try {
        const user = await this.userService.updateUser(params.id, body);
        return {
          status: 200 as const,
          body: user,
        };
      } catch (error) {
        if (error instanceof NotFoundException) {
          return {
            status: 404 as const,
            body: { message: error.message },
          };
        }
        return {
          status: 500 as const,
          body: { message: (error as Error).message },
        };
      }
    });
  }

  @Auth(UserRole.ADMIN)
  @TsRestHandler(contract.users.deleteUser)
  async deleteUser() {
    return tsRestHandler(contract.users.deleteUser, async ({ params }) => {
      try {
        const user = await this.userService.deleteUser(params.id);
        return {
          status: 200 as const,
          body: user,
        };
      } catch (error) {
        if (error instanceof NotFoundException) {
          return {
            status: 404 as const,
            body: { message: error.message },
          };
        }
        return {
          status: 500 as const,
          body: { message: (error as Error).message },
        };
      }
    });
  }
}
