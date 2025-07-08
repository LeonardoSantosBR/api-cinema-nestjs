import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { querySearchCinemas } from './dto/query-search-cinema';
import { CinemasController } from './cinemas.controller';

@Controller('cinemas')
export class CinemasRouter {
  constructor(private readonly $cinemasController: CinemasController) {}

  @Post()
  async create(@Body() body: CreateCinemaDto) {
    return await this.$cinemasController.create(body);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.$cinemasController.findOne(id);
  }

  @Get()
  async findAll(@Query() query: querySearchCinemas) {
    return await this.$cinemasController.findAll(query);
  }

  @Patch('/:id')
  async update(@Body() body: UpdateCinemaDto, @Param('id') id: string) {
    return await this.$cinemasController.update(id, body);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.$cinemasController.remove(id);
  }
}
