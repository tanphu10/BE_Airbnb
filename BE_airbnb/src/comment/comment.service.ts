import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaClient, comments } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CommentService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();

  async findAll() {
    let data = await this.prisma.comments.findMany();
    return {
      status: 200,
      message: 'get all comment thành công',
      content: data,
      dateTime: new Date(),
    };
  }
  async findOne(id: number) {
    let data: any = await this.prisma.comments.findMany({
      where: { room_id: id },
      include: {
        users: true,
      },
    });
    // console.log(data)
    if (data.length > 0) {
      return {
        status: 200,
        message: 'get comment theo room_id thành công',
        content: data,

        dateTime: new Date(),
      };
    } else {
      return {
        status: 404,
        message: 'phòng chưa có comment',
        dateTime: new Date(),
      };
    }
  }
  async getUser(id: number) {
    let data = await this.prisma.comments.findFirst({
      where: { user_id: id },
    });
    if (!data) {
      return {
        status: 404,
        message: 'user chưa bình luận',
        dateTime: new Date(),
      };
    } else {
      return {
        status: 200,
        message: 'get comment theo user_id thành công',
        content: data,
        dateTime: new Date(),
      };
    }
  }
  async create(createCommentDto: CreateCommentDto) {
    let data = await this.prisma.comments.create({ data: createCommentDto });
    // console.log(data);
    return {
      status: 200,
      message: 'post comment theo user_id thành công',
      content: data,
      dateTime: new Date(),
    };
  }
  async update(
    cmtId: number,
    updateCommentDto: UpdateCommentDto,
    token: string,
  ) {
    let checkToken: any = this.jwtService.decode(token);
    let user = checkToken.data;
    console.log(user);
    let { role, id } = user;
    // check role gổm 2 cái 1 là admin 2 là chính user đó cũng có thể xóa được cái comment
    let infoUser = await this.prisma.comments.findFirst({
      where: { id: cmtId },
    });
    console.log(infoUser.user_id);
    if (role == 'ADMIN' || id == infoUser.user_id) {
      let data = await this.prisma.comments.update({
        data: updateCommentDto,
        where: { id: cmtId },
      });
      return {
        status: 200,
        message: 'update comment thành công',
        content: data,
        dateTime: new Date(),
      };
    } else {
      return {
        status: 401,
        message: 'không có quyền update',
        dateTime: new Date(),
      };
    }
  }

  async remove(cmtId: number, token: string) {
    let decodeToken: any = this.jwtService.decode(token);
    // console.log(decodeToken.data);
    let { role, id } = decodeToken.data;
    // console.log(cmtId);
    let findComment = await this.prisma.comments.findFirst({
      where: { id: cmtId },
    });
    if (role == 'ADMIN' || id == findComment.user_id) {
      await this.prisma.comments.delete({ where: { id: cmtId } });
      return {
        status: 200,
        message: `xóa thành công ${id} comment`,
      };
    } else {
      return `user không có quyền xóa comment này`;
    }
  }
}
