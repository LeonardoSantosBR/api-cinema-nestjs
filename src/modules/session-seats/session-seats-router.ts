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
import { CreateSessionSeatDto } from './dto/create-session-seat.dto';
import { UpdateSessionSeatDto } from './dto/update-session-seat.dto';
import { querySearchSessionSeats } from './dto/query-search-session-seats';
import { SessionSeatsController } from './session-seats.controller';

@Controller('session-seats')
export class SessionSeatsRouter {
  constructor(
    private readonly $sessionSeatsController: SessionSeatsController,
  ) {}

  @Post()
  async create(@Body() body: CreateSessionSeatDto) {
    return await this.$sessionSeatsController.create(body);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.$sessionSeatsController.findOne(id);
  }

  @Get()
  async findAll(@Query() query: querySearchSessionSeats) {
    return await this.$sessionSeatsController.findAll(query);
  }

  @Patch('/:id')
  async update(@Body() body: UpdateSessionSeatDto, @Param('id') id: string) {
    return await this.$sessionSeatsController.update(id, body);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.$sessionSeatsController.remove(id);
  }
}
