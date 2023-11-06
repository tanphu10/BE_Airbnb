import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  full_name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  pass_word: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  birth_day: Date;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  face_app_id: string;
}
