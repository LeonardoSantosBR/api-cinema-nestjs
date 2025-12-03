import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';
import { RolesRouter } from './roles.router';
const providers = [
  PrismaServiceMysql,
  RolesController,
  RolesService,
  RolesRepository,
];

@Module({
  controllers: [RolesRouter],
  providers,
  exports: providers,
})
export class RolesModule {}
