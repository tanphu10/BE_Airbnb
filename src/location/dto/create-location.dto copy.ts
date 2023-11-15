import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty()
  name_locate: string;
  @ApiProperty()
  province: string;
  @ApiProperty()
  nation: string;
  @ApiProperty()
  photo: string;
}
