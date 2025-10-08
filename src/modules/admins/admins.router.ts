import { Body, Controller, Param, Query } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { querySearchAdmin } from './dto/query-search-admin';
import { AdminsController } from './admins.controller';
import { ApiTags } from '@nestjs/swagger';
import {
  admins_delete,
  admins_get,
  admins_get_by_id,
  admins_patch,
  admins_post,
} from 'src/swagger/decorators/admins';

@ApiTags('administradores')
@Controller('admins')
export class AdminsRouter {
  constructor(private readonly $adminsController: AdminsController) {}

  @admins_post()
  async create(@Body() body: CreateAdminDto) {
    return await this.$adminsController.create(body);
  }

  @admins_get_by_id()
  async findOne(@Param('id') id: string) {
    return await this.$adminsController.findOne(id);
  }

  @admins_get()
  async findAll(@Query() query: querySearchAdmin) {
    return await this.$adminsController.findAll(query);
  }

  @admins_patch()
  async update(@Body() body: UpdateAdminDto, @Param('id') id: string) {
    return await this.$adminsController.update(id, body);
  }

  @admins_delete()
  async remove(@Param('id') id: string) {
    return await this.$adminsController.remove(id);
  }
}
