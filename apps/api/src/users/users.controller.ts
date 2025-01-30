import { Controller } from '@nestjs/common';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@ckm/contracts';
import { UserService } from './users.service';
import { NotFoundException } from '@nestjs/common'; // or wherever this is imported from
import { User } from '@ckm/db';
// import { Auth } from '../decorators/auth.decorator'; // If you need role-based guard

@TsRest({ jsonQuery: true })
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

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

  // @Auth(UserRole.ADMIN) // Uncomment if needed
  @TsRestHandler(contract.users.getUsers)
  async getUsers() {
    return tsRestHandler(contract.users.getUsers, async ({ query }) => {
      const skip = query.skip ? parseInt(query.skip, 10) : undefined;
      const take = query.take ? parseInt(query.take, 10) : undefined;
      const orderBy = query.orderBy as keyof User | undefined

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

  @TsRestHandler(contract.users.getUser)
  async getUser() {
    return tsRestHandler(contract.users.getUser, async ({ params }) => {
      try {
        const user = await this.userService.getUser(params.id);
        return {
          status: 200 as const,
          body: user,
        };
      } catch (error) {
        // For illustration, check if it's a NotFoundException
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

