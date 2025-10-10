import { Body, Controller, Param, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { querySearchUser } from './dto/query-search-user';
import { UsersController } from './users.controller';
import { getUser } from 'src/decorators';
import { IuserToken } from 'src/types';
import { ApiTags } from '@nestjs/swagger';
import {
  users_delete,
  users_find_my_sessions_get_id,
  users_get,
  users_get_by_id,
  users_patch,
  users_post,
} from 'src/swagger/decorators/users';

@ApiTags('usuários')
@Controller('users')
export class UsersRouter {
  constructor(private readonly $usersController: UsersController) {}

  @users_post()
  async create(@Body() body: CreateUserDto) {
    return await this.$usersController.create(body);
  }

  @users_find_my_sessions_get_id()
  async findMySessions(
    @getUser() user: IuserToken,
    @Query() querys: querySearchUser,
  ) {
    const { id } = user;
    return await this.$usersController.findMySessions(id, querys);
  }

  @users_get_by_id()
  async findOne(@Param('id') id: string) {
    return await this.$usersController.findOne(id);
  }

  @users_get()
  async findAll(@Query() querys: querySearchUser) {
    return await this.$usersController.findAll(querys);
  }

  @users_patch()
  async update(@Body() body: UpdateUserDto, @Param('id') id: string) {
    return await this.$usersController.update(id, body);
  }

  @users_delete()
  async remove(@Param('id') id: string) {
    return await this.$usersController.remove(id);
  }
}
