import { Controller, BadRequestException } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { querySearchAdmin } from './dto/query-search-admin';
import { Prisma } from '@prisma/client';
import { admins_filter } from 'src/helpers/filters/admins-filter';
import { pagination_helper, pagination_prisma } from 'src/helpers';

@Controller('admins')
export class AdminsController {
  constructor(private readonly $adminsService: AdminsService) {}

  async create(body: CreateAdminDto) {
    const cpf_already_exists = await this.findOneByCpf(body.cpf);
    if (cpf_already_exists)
      throw new BadRequestException('Administrador com esse CPF já existe.');
    return this.$adminsService.create(body);
  }

  async findAll(query: querySearchAdmin) {
    const page = +query?.page;
    const limit = +query?.limit;
    const orderBy: Prisma.AdminsOrderByWithAggregationInput = query?.order ?? {
      created_at: 'desc',
    };
    const where: Prisma.AdminsWhereInput = {
      deleted_at: null,
    };
    const filter: any = admins_filter(query);
    if (filter?.length) where.OR = filter;
    const select: Prisma.AdminsSelect = {
      id: true,
      name: true,
      cpf: true,
    };

    const data = await this.$adminsService.findAll({
      where,
      orderBy,
      select,
      ...pagination_prisma(limit, page),
    });

    return pagination_helper(page, limit, data.count, data);
  }

  async findOne(id: string) {
    return this.$adminsService.findOne(+id);
  }

  async findOneByCpf(cpf: string) {
    return this.$adminsService.findOne(undefined, { where: { cpf } });
  }

  async update(id: string, body: UpdateAdminDto) {
    return this.$adminsService.update(+id, body);
  }

  async remove(id: string) {
    return this.$adminsService.remove(+id);
  }
}
