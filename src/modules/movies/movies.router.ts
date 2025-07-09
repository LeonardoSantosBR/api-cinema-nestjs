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
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { querySearchMovies } from '../cinemas/dto/query-search-movies';
import { MoviesController } from './movies.controller';

@Controller('movies')
export class MoviesRouter {
  constructor(private readonly $cinemasController: MoviesController) {}

  @Post()
  async create(@Body() body: CreateMovieDto) {
    return await this.$cinemasController.create(body);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.$cinemasController.findOne(id);
  }

  @Get()
  async findAll(@Query() query: querySearchMovies) {
    return await this.$cinemasController.findAll(query);
  }

  @Patch('/:id')
  async update(@Body() body: UpdateMovieDto, @Param('id') id: string) {
    return await this.$cinemasController.update(id, body);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.$cinemasController.remove(id);
  }
}
