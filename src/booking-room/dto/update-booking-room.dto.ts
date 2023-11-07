import { PartialType } from '@nestjs/swagger';
import { CreateBookingRoomDto } from './create-booking-room.dto';

export class UpdateBookingRoomDto extends PartialType(CreateBookingRoomDto) {}
