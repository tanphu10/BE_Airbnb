import { Injectable } from '@nestjs/common';
import { CreateTypeRoomDto } from './dto/create-type-room.dto';
import { UpdateTypeRoomDto } from './dto/update-type-room.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TypeRoomService {
  prisma = new PrismaClient();
  async findAll() {
    let data = await this.prisma.roomType.findMany();
    // return `This action returns all typeRoom`;
    return {
      status: 200,
      message: 'get type_room all thành công',
      content: data,
      dateTime: new Date(),
    };
  }
  async findOne(id: number) {
    // console.log(id);
    let data = await this.prisma.room.findMany({ where: { type_id: id } });
    return {
      status: 200,
      message: 'get type id theo room thành công',
      content: data,
      dateTime: new Date(),
    };
  }
  async create(createTypeRoomDto: CreateTypeRoomDto) {
    let data = await this.prisma.roomType.create({ data: createTypeRoomDto });
    return {
      status: 200,
      message: 'thêm type room thành công',
      content: data,
      dateTime: new Date(),
    };
  }
  async update(id: number, updateTypeRoomDto: UpdateTypeRoomDto) {
    let data = await this.prisma.roomType.update({
      data: updateTypeRoomDto,
      where: { id },
    });
    return {
      status: 200,
      message: 'update type room thành công',
      content: data,
      dateTime: new Date(),
    };
  }
  async remove(id: number) {
    await this.prisma.roomType.delete({
      where: { id },
    });
    return `This action removes a #${id} typeRoom`;
  }
}
