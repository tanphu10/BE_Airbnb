import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { BookingRoomService } from './booking-room.service';
import { CreateBookingRoomDto } from './dto/create-booking-room.dto';
import { UpdateBookingRoomDto } from './dto/update-booking-room.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Booking Room')
@Controller('api')
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

  @Post('/bookRoom')
  create(@Body() createBookingRoomDto: CreateBookingRoomDto) {
    return this.bookingRoomService.create(createBookingRoomDto);
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
