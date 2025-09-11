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
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { querySearchSessions } from './dto/query-search-sessions';
import { SessionsController } from './sessions.controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sessões')
@Controller('sessions')
export class SessionsRouter {
  constructor(private readonly $sessionsController: SessionsController) {}

  @Post()
  async create(@Body() body: CreateSessionDto) {
    return await this.$sessionsController.create(body);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.$sessionsController.findOne(id);
  }

  @Get()
  async findAll(@Query() query: querySearchSessions) {
    return await this.$sessionsController.findAll(query);
  }

  @Patch('/:id')
  async update(@Body() body: UpdateSessionDto, @Param('id') id: string) {
    return await this.$sessionsController.update(id, body);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.$sessionsController.remove(id);
  }
}
