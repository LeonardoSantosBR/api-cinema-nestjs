import { Prisma } from '@prisma/client';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';
import { Injectable } from '@nestjs/common';
import { Itickets } from 'src/types';
import { querySearchUser } from './dto/query-search-user';

@Injectable()
export class UsersRepository {
  constructor(private readonly $prismaMysql: PrismaServiceMysql) {}

  async create(data: Prisma.UsersCreateInput) {
    await this.$prismaMysql.users.create({ data });
    return true;
  }

  async findAll(params: Prisma.UsersFindManyArgs) {
    const query = await this.$prismaMysql.users.findMany(params);
    return query;
  }

  async findMySessions(id: number, querys: querySearchUser) {
    let search = Prisma.empty;
    if (querys.search) {
      const st = `%${querys.search}%`;
      search = Prisma.sql`AND m.name LIKE ${st}`;
    }
    const query: Itickets[] = await this.$prismaMysql.$queryRaw`
        SELECT 
            ss.id,
            ss.session_id,
            st.seat_number,
            m.name,
            r.name AS room_name,
            rr.row_label,
            c.name AS cinema_name
        FROM session_seats ss
            JOIN sessions sn ON ss.session_id = sn.id
            JOIN movies m ON sn.movie_id = m.id
            JOIN rooms r ON sn.room_id = r.id
            JOIN cinemas c ON r.cinema_id = c.id
            JOIN seats st ON ss.seat_id = st.id
            JOIN rows_room rr ON st.row_id = rr.id
            WHERE ss.user_id = ${id} AND ss.deleted_at IS NULL 
               AND sn.is_expired = false 
               ${search ? search : Prisma.empty}
        `;

    return query;
  }

  async findOne(params: Prisma.UsersFindFirstArgs) {
    const query = await this.$prismaMysql.users.findFirst(params);
    return query;
  }

  async count(params: Prisma.UsersCountArgs): Promise<number> {
    const query = await this.$prismaMysql.users.count(params);
    return query;
  }

  async update(
    id: number,
    data: Prisma.UsersUpdateInput,
    arg?: Prisma.UsersUpdateArgs,
  ) {
    const where = arg?.where || { id };
    await this.$prismaMysql.users.update({
      data: {
        ...data,
        updated_at: new Date(),
      },
      where,
      ...arg,
    });
    return true;
  }

  async remove(id: number) {
    await this.$prismaMysql.users.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
    return true;
  }
}
