import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  room_id: number;
  @ApiProperty()
  user_id: number;
  @ApiProperty()
  date_comment: Date;
  @ApiProperty()
  content: string;
  @ApiProperty()
  rate: number;
}
