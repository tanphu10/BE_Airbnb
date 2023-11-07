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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('api')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/comment')
  findAll() {
    return this.commentService.findAll();
  }

  @Get('/comment/get-room/:id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }
  @Get('/comment/get-user/:id')
  getUser(@Param('id') id: string) {
    return this.commentService.getUser(+id);
  }
  @Post('/comment')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }
  @Put('/comment/:id')
  update(
    @Param('id') cmtId: string,
    @Headers('token') token: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(+cmtId, updateCommentDto, token);
  }

  @Delete('/comment/:id')
  remove(@Param('id') cmtId: string, @Headers('token') token: string) {
    return this.commentService.remove(+cmtId, token);
  }
}
