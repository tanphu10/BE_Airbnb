import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Headers,
  UploadedFiles,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UploadDto } from 'src/user/dto/upload.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@ApiTags('Room')
@Controller('api')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @Get('/room')
  findAll() {
    return this.roomService.findAll();
  }
  @Get('/room/:id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }
  @Post('/room')
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }
  @Put('/room/:id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }
  @Delete('/room/:id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
  @Get('/room/search/:roomName')
  search(@Param('roomName') roomName: string) {
    return this.roomService.search(roomName);
  }
  @Get('/room/get-room-location/:id')
  locateRoom(@Param('id') id: string) {
    return this.roomService.locateRoom(+id);
  }
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadDto,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, calback) =>
          calback(null, new Date().getTime() + '_' + file.originalname),
      }),
    }),
  )
  @Post('/room/upload-image')
  uploadAvatar(
    @UploadedFile() files: Express.Multer.File,
    @Headers('token') token: string,
    @Query('room_id') roomId: string,
  ) {
    return this.roomService.uploadImg(token, files, +roomId);
  }
}
