import { Body, Controller, Param, Query } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { querySearchRooms } from './dto/query-search-rooms';
import { RoomsController } from './rooms.controller';
import { ApiTags } from '@nestjs/swagger';
import {
  rooms_delete,
  rooms_get,
  rooms_get_by_id,
  rooms_patch,
  rooms_post,
} from 'src/swagger/decorators/rooms';

@ApiTags('salas')
@Controller('rooms')
export class RoomsRouter {
  constructor(private readonly $roomsController: RoomsController) {}

  @rooms_post()
  async create(@Body() body: CreateRoomDto) {
    return await this.$roomsController.create(body);
  }

  @rooms_get_by_id()
  async findOne(@Param('id') id: string) {
    return await this.$roomsController.findOne(id);
  }

  @rooms_get()
  async findAll(@Query() querys: querySearchRooms) {
    return await this.$roomsController.findAll(querys);
  }

  @rooms_patch()
  async update(@Body() body: UpdateRoomDto, @Param('id') id: string) {
    return await this.$roomsController.update(id, body);
  }

  @rooms_delete()
  async remove(@Param('id') id: string) {
    return await this.$roomsController.remove(id);
  }
}
