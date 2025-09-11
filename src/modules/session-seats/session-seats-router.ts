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

@ApiTags('assentos')
@Controller('session-seats')
export class SessionSeatsRouter {
  constructor(
    private readonly $sessionSeatsController: SessionSeatsController,
  ) {}

  @Post()
  async create(
    @Body() body: CreateSessionSeatDto,
    @getUser() user: IuserToken,
  ) {
    return await this.$sessionSeatsController.create(body, user);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.$sessionSeatsController.findOne(id);
  }

  @Get()
  async findAll(@Query() query: querySearchSessionSeats) {
    return await this.$sessionSeatsController.findAll(query);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.$sessionSeatsController.remove(id);
  }
}
