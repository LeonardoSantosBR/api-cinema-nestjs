import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { Prisma, Users } from '@prisma/client';
import { HashService } from 'src/services';

@Injectable()
export class UsersService {
  constructor(
    private readonly $usersRepository: UsersRepository,
    private readonly $hashService: HashService,
  ) {}

  async create(data: CreateUserDto) {
    const { password, ...rest } = data;
    const hashed_password = await this.$hashService.encrypt(password);

    const user_dt: Prisma.UsersCreateInput = {
      ...rest,
      password: hashed_password,
    };
    return await this.$usersRepository.create(user_dt);
  }

  async findAll(params: Prisma.UsersFindManyArgs) {
    const [rows, count]: [Users[], number] = await Promise.all([
      this.$usersRepository.findAll(params),
      this.$usersRepository.count({
        where: params.where || {},
      }),
    ]);
    return { rows, count };
  }

  async findOne(id?: number, arg?: Prisma.UsersFindFirstArgs) {
    const where = arg?.where || { id, deleted_at: null };
    const query = await this.$usersRepository.findOne({
      where,
      ...arg,
    });

    return query;
  }

  async update(id: number, data: UpdateUserDto) {
    return await this.$usersRepository.update(id, data);
  }

  async remove(id: number) {
    return await this.$usersRepository.remove(id);
  }
}
