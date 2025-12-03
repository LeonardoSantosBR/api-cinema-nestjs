import { Injectable, BadRequestException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { querySearchRoles } from './dto/query-search-roles';
import { Prisma } from '@prisma/client';
import { roles_filter } from 'src/helpers/filters/roles-filter';
import { pagination_helper, pagination_prisma } from 'src/helpers';

@Injectable()
export class RolesController {
  constructor(private readonly $rolesService: RolesService) {}

  async create(body: CreateRoleDto) {
    const role = await this.$rolesService.findOne(undefined, {
      where: { name: body.name },
    });
    if (role) throw new BadRequestException('Cargo com esse nome já existe.');
    return this.$rolesService.create(body);
  }

  async findAll(querys: querySearchRoles) {
    const page = +querys?.page;
    const limit = +querys?.limit;
    const orderBy: Prisma.RolesOrderByWithAggregationInput = querys?.order ?? {
      created_at: 'desc',
    };
    const where: Prisma.RolesWhereInput = {
      deleted_at: null,
    };
    const filter: any = roles_filter(querys);
    if (filter?.length) where.OR = filter;

    const data = await this.$rolesService.findAll({
      where,
      orderBy,
      ...pagination_prisma(limit, page),
    });

    return pagination_helper(page, limit, data.count, data);
  }

  async findOne(id: string) {
    return this.$rolesService.findOne(+id);
  }

  async update(id: string, body: UpdateRoleDto) {
    return await this.$rolesService.update(+id, body);
  }

  async remove(id: string) {
    return this.$rolesService.remove(+id);
  }
}
