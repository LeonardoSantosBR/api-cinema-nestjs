import { Injectable } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { CinemasRepository } from './cinemas.repository';
import { Cinemas, Prisma } from '@prisma/client';

@Injectable()
export class CinemasService {
  constructor(private readonly $cinemasRepository: CinemasRepository) {}

  async create(data: CreateCinemaDto) {
    return await this.$cinemasRepository.create(data);
  }

  async findAll(params: Prisma.CinemasFindManyArgs) {
    const [rows, count]: [Cinemas[], number] = await Promise.all([
      this.$cinemasRepository.findAll(params),
      this.$cinemasRepository.count({
        where: params.where || {},
      }),
    ]);
    return { rows, count };
  }

  async findOne(id: number, arg?: Prisma.CinemasFindFirstArgs) {
    const where = arg?.where || { id, deleted_at: null };
    const query = await this.$cinemasRepository.findOne({
      where,
      ...arg,
    });

    return query;
  }

  async findOneByName(name: string, arg?: Prisma.CinemasFindFirstArgs) {
    const where = arg?.where || { name, deleted_at: null };
    const query = await this.$cinemasRepository.findOne({
      where,
      ...arg,
    });

    return query;
  }

  async update(id: number, data: UpdateCinemaDto) {
    return await this.$cinemasRepository.update(id, data);
  }

  async remove(id: number) {
    return await this.$cinemasRepository.remove(id);
  }
}
