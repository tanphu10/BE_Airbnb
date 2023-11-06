import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/users')
  findAll() {
    return this.userService.findAll();
  }
  @Get('/user/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @Post('/user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Put('/user/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @Delete('user/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  @Get('/user/search/:userName')
  search(@Param('userName') userName: string) {
    return this.userService.search(userName);
  }
}
