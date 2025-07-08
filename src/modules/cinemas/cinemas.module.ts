import { Module } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { CinemasController } from './cinemas.controller';
import { CinemasRepository } from './cinemas.repository';
import { CinemasRouter } from './cinemas.router';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';
const providers = [
  PrismaServiceMysql,
  CinemasController,
  CinemasService,
  CinemasRepository,
];

@Module({
  controllers: [CinemasRouter],
  providers,
  exports: providers,
})
export class CinemasModule {}
