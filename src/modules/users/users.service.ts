import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { Prisma, Users } from '@prisma/client';
import { HashService } from 'src/services';
import { Itickets } from 'src/types';
import { querySearchUser } from './dto/query-search-user';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly $prisma: PrismaServiceMysql,
    private readonly $usersRepository: UsersRepository,
    private readonly $hashService: HashService,
  ) {}

  async create(data: CreateUserDto) {
    const { password, roleIds, ...rest } = data;
    const hashed_password = await this.$hashService.encrypt(password);
    const user_dt: Prisma.UsersCreateInput = {
      ...rest,
      userRoles: {
        create: roleIds?.map((roleId) => ({
          role: {
            connect: {
              id: roleId,
            },
          },
        })),
      },
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

  async findMySessions(id: number, querys: querySearchUser) {
    const rows: Itickets[] = await this.$usersRepository.findMySessions(
      id,
      querys,
    );
    return this.formatSessionsRows(rows);
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
    const { roleIds, ...rest } = data;
    if (roleIds) await this.updateRoleUsers(id, roleIds);
    return await this.$usersRepository.update(id, { ...rest });
  }

  async remove(id: number) {
    return await this.$usersRepository.remove(id);
  }

  formatSessionsRows(rows: Itickets[]) {
    if (rows.length == 0) return [];
    const sessions: any = [];
    for (const r of rows) {
      const session_exists = sessions.find((s) => s.session_id == r.session_id);
      if (!session_exists) {
        sessions.push({
          id: r.id,
          name: r.name,
          cinema_name: r.cinema_name,
          room_name: r.room_name,
          session_id: r.session_id,
          seats: [],
        });
      }
    }
    for (const r of rows) {
      for (const s of sessions) {
        if (s.session_id === r.session_id) {
          s.seats.push(`${r.row_label}-${r.seat_number}`);
        }
      }
    }
    return { sessions };
  }

  async updateRoleUsers(id: number, roleIds: Array<number>) {
    await this.$prisma.$transaction(async (prisma) => {
      await Promise.all([
        await prisma.usersRoles.deleteMany({
          where: {
            user_id: id,
          },
        }),
        await prisma.users.update({
          where: { id },
          data: {
            userRoles: {
              create: roleIds?.map((roleId) => ({
                role: {
                  connect: {
                    id: roleId,
                  },
                },
              })),
            },
          },
        }),
      ]);
    });
    return true;
  }
}
