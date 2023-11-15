import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Headers,
} from '@nestjs/common';
import { TypeRoomService } from './type-room.service';
import { CreateTypeRoomDto } from './dto/create-type-room.dto';
import { UpdateTypeRoomDto } from './dto/update-type-room.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Type Room')
@Controller('api')
export class TypeRoomController {
  constructor(private readonly typeRoomService: TypeRoomService) {}
  @Get('/type-room')
  findAll() {
    return this.typeRoomService.findAll();
  }

  @Get('/type-room/:id')
  findOne(@Param('id') id: string) {
    return this.typeRoomService.findOne(+id);
  }
  @Post('/type-room')
  create(@Body() createTypeRoomDto: CreateTypeRoomDto) {
    return this.typeRoomService.create(createTypeRoomDto);
  }

  @Put('/type-room/:id')
  update(
    @Param('id') id: string,
    @Body() updateTypeRoomDto: UpdateTypeRoomDto,
    // @Headers() token: string,
  ) {
    return this.typeRoomService.update(+id, updateTypeRoomDto);
  }

  @Delete('/type-room/:id')
  remove(@Param('id') id: string) {
    return this.typeRoomService.remove(+id);
  }
}
