import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExChatService } from './ex-chat.service';
import { CreateExChatDto } from './dto/create-ex-chat.dto';
import { UpdateExChatDto } from './dto/update-ex-chat.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api')
@ApiTags('ex-chat')
export class ExChatController {
  constructor(private readonly exChatService: ExChatService) {}
  @Get('/chat/:user_id')
  findOne(@Param('user_id') user_id: string) {
    return this.exChatService.findOne(+user_id);
  }
  @Get('/chat/group-chat/:room_id')
  findRoom(@Param('room_id') room_id: string) {
    return this.exChatService.findRoom(+room_id);
  }

  @Get('/chat/search-group/:name')
  searchName(@Param('name') name: string) {
    return this.exChatService.searchName(name);
  }

  @Post()
  create(@Body() createExChatDto: CreateExChatDto) {
    return this.exChatService.create(createExChatDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExChatDto: UpdateExChatDto) {
    return this.exChatService.update(+id, updateExChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exChatService.remove(+id);
  }
}
