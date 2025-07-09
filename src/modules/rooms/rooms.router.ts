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
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { querySearchRooms } from './dto/query-search-rooms';
import { RoomsController } from './rooms.controller';

@Controller('rooms')
export class RoomsRouter {
  constructor(private readonly $roomsController: RoomsController) {}

  @Post()
  async create(@Body() body: CreateRoomDto) {
    return await this.$roomsController.create(body);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.$roomsController.findOne(id);
  }

  @Get()
  async findAll(@Query() query: querySearchRooms) {
    return await this.$roomsController.findAll(query);
  }

  @Patch('/:id')
  async update(@Body() body: UpdateRoomDto, @Param('id') id: string) {
    return await this.$roomsController.update(id, body);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.$roomsController.remove(id);
  }
}
