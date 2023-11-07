import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingRoomDto {
  @ApiProperty()
  room_id: number;
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  date_on: Date;
  @ApiProperty()
  date_out: Date;
  @ApiProperty()
  number_guest: number;
}
