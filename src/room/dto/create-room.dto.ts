import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty()
  name_room: string;
  @ApiProperty()
  guest: number;
  @ApiProperty()
  bedroom: number;
  @ApiProperty()
  bathroom: number;
  @ApiProperty()
  descr: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  wash_machine: boolean;
  @ApiProperty()
  iron_cloth: boolean;
  @ApiProperty()
  television: boolean;
  @ApiProperty()
  air_conditioner: boolean;
  @ApiProperty()
  wifi: boolean;
  @ApiProperty()
  kitchen: boolean;
  @ApiProperty()
  park: boolean;
  @ApiProperty()
  pool: boolean;
  @ApiProperty()
  photo: string;
  @ApiProperty()
  locate_id: number;
}
 