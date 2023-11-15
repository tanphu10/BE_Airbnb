import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Headers,
  UseGuards,
  HttpException,
  InternalServerErrorException,
  HttpCode,
} from '@nestjs/common';
import { BookingRoomService } from './booking-room.service';
import { CreateBookingRoomDto } from './dto/create-booking-room.dto';
import { UpdateBookingRoomDto } from './dto/update-booking-room.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Booking Room')
@Controller('api')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class BookingRoomController {
  constructor(private readonly bookingRoomService: BookingRoomService) {}
  @Get('/bookroom')
  findAll() {
    return this.bookingRoomService.findAll();
  }

  @Get('/bookRoom/:id')
  findOne(@Param('id') id: string) {
    return this.bookingRoomService.findOne(+id);
  }
  // @HttpCode(200)
  @Post('/bookRoom')
  create(@Body() createBookingRoomDto: CreateBookingRoomDto) {
    return this.bookingRoomService.create(createBookingRoomDto);

    // try {
    //   return this.bookingRoomService.create(createBookingRoomDto);
    // } catch (exception) {
    //   console.log(exception);
    //   if (exception.statusCode != 500) {
    //     throw new HttpException(exception.masage, exception.statusCode);
    //   }
    //   throw new InternalServerErrorException('Lỗi ...');
    // }
  }

  @Put('/bookRoom/:id')
  update(
    @Param('id') id: string,
    @Body() updateBookingRoomDto: UpdateBookingRoomDto,
  ) {
    return this.bookingRoomService.update(+id, updateBookingRoomDto);
  }
  @Delete('/bookRoom/:id')
  remove(@Param('id') id: string, @Headers('token') token: string) {
    return this.bookingRoomService.remove(+id, token);
  }

  @Get('/bookRoom/get-by-id/:id')
  search(@Param('id') id: string) {
    return this.bookingRoomService.search(+id);
  }
}
