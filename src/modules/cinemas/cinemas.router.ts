import { Body, Controller, Param, Query } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { querySearchCinemas } from './dto/query-search-cinema';
import { CinemasController } from './cinemas.controller';
import {
  cinemas_delete,
  cinemas_get,
  cinemas_get_by_id,
  cinemas_path,
  cinemas_post,
} from '../../swagger/decorators/cinemas';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cinemas')
@Controller('cinemas')
export class CinemasRouter {
  constructor(private readonly $cinemasController: CinemasController) {}

  @cinemas_post()
  async create(@Body() body: CreateCinemaDto) {
    return await this.$cinemasController.create(body);
  }

  @cinemas_get_by_id()
  async findOne(@Param('id') id: string) {
    return await this.$cinemasController.findOne(id);
  }

  @cinemas_get()
  async findAll(@Query() querys: querySearchCinemas) {
    return await this.$cinemasController.findAll(querys);
  }

  @cinemas_path()
  async update(@Body() body: UpdateCinemaDto, @Param('id') id: string) {
    return await this.$cinemasController.update(id, body);
  }

  @cinemas_delete()
  async remove(@Param('id') id: string) {
    return await this.$cinemasController.remove(id);
  }
}
