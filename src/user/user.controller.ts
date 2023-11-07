import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UploadDto } from './dto/upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uploadImg } from 'src/utils/upload';

@ApiTags('User')
@Controller('api')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user')
  findAll() {
    return this.userService.findAll();
  }
  @Get('/user/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @Put('/user/:id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
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
  @Post('/user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  // --upload avatar
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
  @Post('/user/upload-avatar')
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Headers('token') token: string,
  ) {
    return this.userService.uploadAvatar(token, file);
  }
}
