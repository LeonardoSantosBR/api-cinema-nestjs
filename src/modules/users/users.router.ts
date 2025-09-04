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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { querySearchUser } from './dto/query-search-user';
import { UsersController } from './users.controller';
import { getUser } from 'src/decorators';
import { UserToken } from 'src/types';

@Controller('users')
export class UsersRouter {
  constructor(private readonly $usersController: UsersController) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.$usersController.create(body);
  }

  @Get('/find-my-tickets')
  async findMyTickets(@getUser() user: UserToken) {
    const { id } = user;
    return await this.$usersController.findMyTickets(id);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.$usersController.findOne(id);
  }

  @Get()
  async findAll(@Query() query: querySearchUser) {
    return await this.$usersController.findAll(query);
  }

  @Patch('/:id')
  async update(@Body() body: UpdateUserDto, @Param('id') id: string) {
    return await this.$usersController.update(id, body);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.$usersController.remove(id);
  }
}
