import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import {
  pagination_helper,
  pagination_prisma,
  users_filter,
} from 'src/helpers';
import { querySearchUser } from './dto/query-search-user';

@Injectable()
export class UsersController {
  constructor(private readonly $usersService: UsersService) {}

  async create(body: CreateUserDto) {
    const cpf_already_exists = await this.findOneByCpf(body.cpf);
    if (cpf_already_exists)
      throw new BadRequestException('Usuário com esse CPF já existe.');
    return this.$usersService.create(body);
  }

  async findAll(querys: querySearchUser) {
    const page = +querys?.page;
    const limit = +querys?.limit;
    const orderBy: Prisma.UsersOrderByWithAggregationInput = querys?.order ?? {
      created_at: 'desc',
    };
    const where: Prisma.UsersWhereInput = {
      deleted_at: null,
    };
    const filter: any = users_filter(querys);
    if (filter?.length) where.OR = filter;
    const select: Prisma.UsersSelect = {
      id: true,
      name: true,
      cpf: true,
    };

    const data = await this.$usersService.findAll({
      where,
      orderBy,
      select,
      ...pagination_prisma(limit, page),
    });

    return pagination_helper(page, limit, data.count, data);
  }

  async findMySessions(id: number, querys: querySearchUser) {
    return this.$usersService.findMySessions(id, querys);
  }

  async findOne(id: string) {
    return this.$usersService.findOne(+id);
  }

  async findOneByCpf(cpf: string) {
    return this.$usersService.findOne(undefined, { where: { cpf } });
  }

  async update(id: string, body: UpdateUserDto) {
    return this.$usersService.update(+id, body);
  }

  async remove(id: string) {
    return this.$usersService.remove(+id);
  }
}
