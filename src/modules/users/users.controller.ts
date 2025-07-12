import { Injectable } from '@nestjs/common';
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
import { HashService } from 'src/services';

@Injectable()
export class UsersController {
  constructor(
    private readonly $usersService: UsersService,
    private readonly $hashService: HashService,
  ) {}

  async create(body: CreateUserDto) {
    const { password, ...rest } = body;
    const hashed_password = await this.$hashService.encrypt(password);

    const user_dt: Prisma.UsersCreateInput = {
      ...rest,
      password: hashed_password,
    };
    return this.$usersService.create(user_dt);
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

  async findOne(id: string) {
    return this.$usersService.findOne(+id);
  }

  async update(id: string, body: UpdateUserDto) {
    return this.$usersService.update(+id, body);
  }

  async remove(id: string) {
    return this.$usersService.remove(+id);
  }
}
