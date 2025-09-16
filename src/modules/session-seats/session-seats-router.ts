import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateSessionSeatDto } from './dto/create-session-seat.dto';
import { querySearchSessionSeats } from './dto/query-search-session-seats';
import { SessionSeatsController } from './session-seats.controller';
import { getUser } from 'src/decorators';
import { IuserToken } from 'src/types';
import { ApiTags } from '@nestjs/swagger';
import {
  session_seats_delete,
  session_seats_get,
  session_seats_get_by_id,
  session_seats_post,
} from 'src/swagger/decorators/session-seats';

@ApiTags('assentos')
@Controller('session-seats')
export class SessionSeatsRouter {
  constructor(
    private readonly $sessionSeatsController: SessionSeatsController,
  ) {}

  @session_seats_post()
  async create(
    @Body() body: CreateSessionSeatDto,
    @getUser() user: IuserToken,
  ) {
    return await this.$sessionSeatsController.create(body, user);
  }

  @session_seats_get_by_id()
  async findOne(@Param('id') id: string) {
    return await this.$sessionSeatsController.findOne(id);
  }

  @session_seats_get()
  async findAll(@Query() query: querySearchSessionSeats) {
    return await this.$sessionSeatsController.findAll(query);
  }

  @session_seats_delete()
  async remove(@Param('id') id: string) {
    return await this.$sessionSeatsController.remove(id);
  }
}
