import { Body, Controller, Param, Query } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { querySearchSessions } from './dto/query-search-sessions';
import { SessionsController } from './sessions.controller';
import { ApiTags } from '@nestjs/swagger';
import {
  sessions_delete,
  sessions_get,
  sessions_get_by_id,
  sessions_patch,
  sessions_post,
} from 'src/swagger/decorators/sessions';

@ApiTags('sessões')
@Controller('sessions')
export class SessionsRouter {
  constructor(private readonly $sessionsController: SessionsController) {}

  @sessions_post()
  async create(@Body() body: CreateSessionDto) {
    return await this.$sessionsController.create(body);
  }

  @sessions_get_by_id()
  async findOne(@Param('id') id: string) {
    return await this.$sessionsController.findOne(id);
  }

  @sessions_get()
  async findAll(@Query() querys: querySearchSessions) {
    return await this.$sessionsController.findAll(querys);
  }

  @sessions_patch()
  async update(@Body() body: UpdateSessionDto, @Param('id') id: string) {
    return await this.$sessionsController.update(id, body);
  }

  @sessions_delete()
  async remove(@Param('id') id: string) {
    return await this.$sessionsController.remove(id);
  }
}
