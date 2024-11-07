import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@ckm/db';
import { withOptimize } from '@prisma/extension-optimize';

export function getExtendedClient() {
  const client = () => new PrismaClient().$extends(withOptimize());

  return class {
    // wrapper with type-safety 🎉
    constructor() {
      return client();
    }
  } as new () => ReturnType<typeof client>;
}

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
