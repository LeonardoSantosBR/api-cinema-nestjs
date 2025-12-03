import { Body, Controller, Param, Query } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { querySearchRoles } from './dto/query-search-roles';
import { RolesController } from './roles.controller';
import { ApiTags } from '@nestjs/swagger';
import {
  roles_post,
  roles_path,
  roles_get_by_id,
  roles_get,
  roles_delete,
} from 'src/swagger/decorators/roles';

@ApiTags('cargos')
@Controller('roles')
export class RolesRouter {
  constructor(private readonly $rolesController: RolesController) {}

  @roles_post()
  async create(@Body() body: CreateRoleDto) {
    return await this.$rolesController.create(body);
  }

  @roles_get_by_id()
  async findOne(@Param('id') id: string) {
    return await this.$rolesController.findOne(id);
  }

  @roles_get()
  async findAll(@Query() querys: querySearchRoles) {
    return await this.$rolesController.findAll(querys);
  }

  @roles_path()
  async update(@Body() body: UpdateRoleDto, @Param('id') id: string) {
    return await this.$rolesController.update(id, body);
  }

  @roles_delete()
  async remove(@Param('id') id: string) {
    return await this.$rolesController.remove(id);
  }
}
