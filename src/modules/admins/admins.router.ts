import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { querySearchAdmin } from './dto/query-search-admin';
import { AdminsController } from './admins.controller';
import { ApiTags } from '@nestjs/swagger';
import { SkipAuth } from 'src/decorators';

@ApiTags('administradores')
@Controller('admins')
export class AdminsRouter {
  constructor(private readonly $adminsController: AdminsController) {}

  @SkipAuth()
  @Post()
  async create(@Body() body: CreateAdminDto) {
    return await this.$adminsController.create(body);
  }

  @SkipAuth()
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.$adminsController.findOne(id);
  }

  @SkipAuth()
  @Get()
  async findAll(@Query() query: querySearchAdmin) {
    return await this.$adminsController.findAll(query);
  }

  @SkipAuth()
  @Patch('/:id')
  async update(@Body() body: UpdateAdminDto, @Param('id') id: string) {
    return await this.$adminsController.update(id, body);
  }

  @SkipAuth()
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.$adminsController.remove(id);
  }
}
