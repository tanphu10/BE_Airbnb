import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeRoomDto {
  @ApiProperty()
  type_name: string;
  @ApiProperty()
  icons: string;
}
