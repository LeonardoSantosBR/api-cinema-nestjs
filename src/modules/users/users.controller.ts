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

  async findAll(query: querySearchUser) {
    const page = +query?.page;
    const limit = +query?.limit;
    const orderBy: Prisma.UsersOrderByWithAggregationInput = query?.order ?? {
      created_at: 'desc',
    };
    const where: Prisma.UsersWhereInput = {
      deleted_at: null,
    };
    const filter: any = users_filter(query);
    if (filter?.length) where.OR = filter;
    const include: Prisma.UsersInclude = {};

    const data = await this.$usersService.findAll({
      where,
      orderBy,
      include,
      ...pagination_prisma(limit, page),
    });

    return pagination_helper(page, limit, data.count, data);
  }

  async findMyTickets(id: number) {
    return this.$usersService.findMyTickets(id);
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
