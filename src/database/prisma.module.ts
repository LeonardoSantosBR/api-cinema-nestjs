import { Global, Module } from '@nestjs/common';
import { PrismaServiceMysql } from './prisma_mysql.service';

@Global()
@Module({
  providers: [PrismaServiceMysql],
  exports: [PrismaServiceMysql],
})
export class PrismaModule {}
