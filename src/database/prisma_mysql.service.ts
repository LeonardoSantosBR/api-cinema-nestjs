import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaServiceMysql extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('connect prisma mysql');
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', () => {
      app.close();
    });
  }
}
