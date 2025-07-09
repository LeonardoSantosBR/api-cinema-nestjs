import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsRepository } from './rooms.repository';
import { Prisma, Rooms } from '@prisma/client';
import { PrismaMysqlTransactionService } from 'src/services';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';

@Injectable()
export class RoomsService {
  constructor(
    private readonly $roomsRepository: RoomsRepository,
    private readonly $prismaMysqlTransactionService: PrismaMysqlTransactionService,
  ) {}

  async create(data: CreateRoomDto) {
    const { cinema_id, rows, name } = data;

    const transaction = async (tr: PrismaServiceMysql) => {
      const new_room = await tr.rooms.create({
        data: { name, cinema: { connect: { id: cinema_id } } },
      });
      for (const r of rows) {
        const { seats, row_label } = r;
        const rowsCreate: Prisma.RowsRoomCreateInput = {
          room: {
            connect: {
              id: new_room.id,
            },
          },
          row_label,
        };
        const new_row = await tr.rowsRoom.create({
          data: rowsCreate,
        });
        await tr.seats.createMany({
          data: seats.map((st) => {
            const seatsCreate: Prisma.SeatsCreateManyInput = {
              row_id: new_row.id,
              seat_number: st.seat_number,
              is_accessible: st.is_accessible,
            };
            return seatsCreate;
          }),
        });
      }
    };
    await this.$prismaMysqlTransactionService.transaction(transaction, {
      timeout: 50000,
    });
  }

  async findAll(params: Prisma.RoomsFindManyArgs) {
    const [rows, count]: [Rooms[], number] = await Promise.all([
      this.$roomsRepository.findAll(params),
      this.$roomsRepository.count({
        where: params.where || {},
      }),
    ]);
    return { rows, count };
  }

  async findOne(id: number, arg?: Prisma.RoomsFindFirstArgs) {
    const where = arg?.where || { id, deleted_at: null };
    const query = await this.$roomsRepository.findOne({
      where,
      ...arg,
    });

    return query;
  }

  async update(id: number, data: UpdateRoomDto) {
    const { rows, ...rest } = data;

    const transaction = async (tr: PrismaServiceMysql) => {
      const updated_room = await tr.rooms.update({
        where: { id },
        data: {
          ...rest,
          updated_at: new Date(),
        },
      });

      const row_ids_from_payload = rows?.map((r) => r.row_id).filter(Boolean);

      const existing_rows = await tr.rowsRoom.findMany({
        where: { room_id: id },
        select: { id: true },
      });

      const existing_row_ids = existing_rows.map((r) => r.id);

      const rows_to_delete = existing_row_ids.filter(
        (rid) => !row_ids_from_payload?.includes(rid),
      );

      if (rows_to_delete.length > 0) {
        await tr.seats.deleteMany({
          where: { row_id: { in: rows_to_delete } },
        });
        await tr.rowsRoom.deleteMany({
          where: { id: { in: rows_to_delete } },
        });
      }

      for (const r of rows!) {
        const { row_id, seats, row_label } = r;

        const row_data = {
          room_id: updated_room.id,
          row_label,
        };

        let row_id_to_use = row_id;

        if (!row_id) {
          const new_row = await tr.rowsRoom.create({ data: row_data });
          row_id_to_use = new_row.id;

          await tr.seats.createMany({
            data: seats.map((st) => {
              const seatsCreate: Prisma.SeatsCreateManyInput = {
                row_id: new_row.id,
                seat_number: st.seat_number,
                is_accessible: st.is_accessible,
              };
              return seatsCreate;
            }),
          });
        } else {
          await tr.rowsRoom.update({
            where: { id: row_id },
            data: row_data,
          });

          for (const st of seats) {
            const seatUpdate: Prisma.SeatsUpdateInput = {
              seat_number: st.seat_number,
              is_accessible: st.is_accessible,
            };
            if (st.seat_id)
              await tr.seats.update({
                where: {
                  id: st.seat_id,
                },
                data: seatUpdate,
              });
          }
        }
      }
    };

    await this.$prismaMysqlTransactionService.transaction(transaction, {
      timeout: 50000,
    });
  }
  async remove(id: number) {
    return await this.$roomsRepository.remove(id);
  }
}
