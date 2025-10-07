import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminsRepository } from './admins.repository';
import { HashService } from 'src/services';
import { Prisma, Admins } from '@prisma/client';

@Injectable()
export class AdminsService {
  constructor(
    private readonly $adminsRepository: AdminsRepository,
    private readonly $hashService: HashService,
  ) {}

  async create(data: CreateAdminDto) {
    const { password, ...rest } = data;
    const hashed_password = await this.$hashService.encrypt(password);
    const admins_dt: Prisma.UsersCreateInput = {
      ...rest,
      password: hashed_password,
    };
    return await this.$adminsRepository.create(admins_dt);
  }

  async findAll(params: Prisma.AdminsFindManyArgs) {
    const [rows, count]: [Admins[], number] = await Promise.all([
      this.$adminsRepository.findAll(params),
      this.$adminsRepository.count({
        where: params.where || {},
      }),
    ]);
    return { rows, count };
  }

  async findOne(id?: number, arg?: Prisma.AdminsFindFirstArgs) {
    const where = arg?.where || { id, deleted_at: null };
    const query = await this.$adminsRepository.findOne({
      where,
      ...arg,
    });

    return query;
  }

  async update(id: number, data: UpdateAdminDto) {
    return await this.$adminsRepository.update(id, data);
  }

  async remove(id: number) {
    return await this.$adminsRepository.remove(id);
  }
}
