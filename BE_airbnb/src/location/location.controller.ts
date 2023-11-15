import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UploadedFile,
  Headers,
  UseInterceptors,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { UploadDto } from 'src/user/dto/upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Location')
@Controller('api')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
  @Get('/location')
  findAll() {
    return this.locationService.findAll();
  }
  @Get('/location/:id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }
  @Post('/location')
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Put('/location/:id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(+id, updateLocationDto);
  }

  @Delete('/location/:id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(+id);
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
  @Post('/location/upload-image')
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Headers('token') token: string,
    @Query('locate_id') locateId: string,
  ) {
    return this.locationService.uploadImg(token, file, +locateId);
  }
}
