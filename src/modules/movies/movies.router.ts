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
import { querySearchMovies } from './dto/query-search-movies';
import { MoviesController } from './movies.controller';
import { ApiTags } from '@nestjs/swagger';
import {
  movies_post,
  movies_get,
  movies_patch,
  movies_get_by_id,
  movies_delete,
} from 'src/swagger/decorators/movies';

@ApiTags('filmes')
@Controller('movies')
export class MoviesRouter {
  constructor(private readonly $cinemasController: MoviesController) {}

  @movies_post()
  async create(@Body() body: CreateMovieDto) {
    return await this.$cinemasController.create(body);
  }

  @movies_get_by_id()
  async findOne(@Param('id') id: string) {
    return await this.$cinemasController.findOne(id);
  }

  @movies_get()
  async findAll(@Query() query: querySearchMovies) {
    return await this.$cinemasController.findAll(query);
  }

  @movies_patch()
  async update(@Body() body: UpdateMovieDto, @Param('id') id: string) {
    return await this.$cinemasController.update(id, body);
  }

  @movies_delete()
  async remove(@Param('id') id: string) {
    return await this.$cinemasController.remove(id);
  }
}
