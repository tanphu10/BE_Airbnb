import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoomService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async findAll() {
    let data = await this.prisma.room.findMany();
    return {
      status: 200,
      message: 'get all thành công',
      content: data,
      dateTime: new Date(),
    };
  }
  async findOne(cmtId: number) {
    console.log(cmtId);
    let data = await this.prisma.room.findFirst({ where: { id: cmtId } });
    return {
      status: 200,
      message: 'get room thành công',
      content: data,
      dateTime: new Date(),
    };
  }
  async create(createRoomDto: CreateRoomDto) {
    let data = await this.prisma.room.create({ data: createRoomDto });
    return {
      status: 200,
      message: 'đặt phòng thành công',
      content: data,
      dateTime: new Date(),
    };
  }
  async update(id: number, updateRoomDto: UpdateRoomDto) {
    let data = await this.prisma.room.update({
      data: updateRoomDto,
      where: { id },
    });
    return {
      status: 201,
      message: 'update đặt phòng thành công',
      content: data,
      dateTime: new Date(),
    };
  }
  async remove(id: number) {
    await this.prisma.room.delete({ where: { id } });
    return `xóa thành công phòng ${id}`;
  }

  async search(roomName: string) {
    let data = await this.prisma.room.findMany({
      where: { name_room: { contains: roomName } },
    });
    if (data.length > 0) {
      return {
        status: 200,
        message: 'danh sách room',
        content: data,
        dateTime: new Date(),
      };
    } else {
      return {
        status: 401,
        message: 'không tìm thấy data',
        dateTime: new Date(),
      };
    }
  }
  async locateRoom(id: number) {
    console.log(id);
    let data = await this.prisma.room.findMany({
      where: { locate_id: id },
    });
    console.log(data);
    return {
      status: 200,
      message: 'get vị trí thành công',
      content: data,
      dateTime: new Date(),
    };
  }
  async uploadImg(token: string, files: Express.Multer.File, roomId: number) {
    let decodeToken: any = this.jwtService.decode(token);
    let { role } = decodeToken.data;
    let room = await this.prisma.room.findFirst({ where: { id: roomId } });
    let newRoom: any = { ...room, photo: files.filename };
    // console.log(newRoom);
    if (role == 'ADMIN') {
      let data = await this.prisma.room.update({
        data: newRoom,
        where: { id: roomId },
      });
      // console.log(data);
      return {
        status: 200,
        message: 'update hình thành công',
        content: data,
        dateTime: new Date(),
      };
    } else {
      return {
        status: 400,
        message: 'user không có quyền upload hình',
        dateTime: new Date(),
      };
    }
  }
  async paginaRoom(page: number, pageSize: number) {
    let index = pageSize * (page - 1);
    let data = await this.prisma.room.findMany({
      skip: index,
      take: +pageSize,
    });
    return {
      status: 200,
      message: 'get theo trang thành công',
      content: data,
      dateTime: new Date(),
    };
  }
}
//
