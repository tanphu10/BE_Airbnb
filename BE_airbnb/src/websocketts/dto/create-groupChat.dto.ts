import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty()
  chat_name: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class CreateAddUserDto {
  @ApiProperty()
  chat_id: number;
  @ApiProperty()
  user_id: number;
}
