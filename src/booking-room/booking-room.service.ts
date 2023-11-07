import { Injectable } from '@nestjs/common';
import { CreateBookingRoomDto } from './dto/create-booking-room.dto';
import { UpdateBookingRoomDto } from './dto/update-booking-room.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class BookingRoomService {
  constructor(private jwtService: JwtService) {}
  model = new PrismaClient();
  async findAll() {
    let data = await this.model.bookingRoom.findMany();
    return { status: 200, message: 'get api thành công', response: data };
  }

  async findOne(id: number) {
    let data = await this.model.bookingRoom.findUnique({
      where: {
        id,
      },
    });
    if (!data) {
      return {
        status: 404,
        message: 'không tìm thấy phòng đã đặt',
      };
    } else {
      return {
        status: 200,
        message: 'get api theo id thành công',
        response: data,
      };
    }
  }
  async create(createBookingRoomDto: CreateBookingRoomDto) {
    let data = await this.model.bookingRoom.create({
      data: createBookingRoomDto,
    });
    return {
      status: 200,
      message: 'đặt phòng thành công',
      response: data,
    };
  }

  async update(id: number, updateBookingRoomDto: UpdateBookingRoomDto) {
    let data = await this.model.bookingRoom.update({
      data: updateBookingRoomDto,
      where: { id },
    });
    return {
      status: 200,
      message: 'update đặt phòng thành công',
      response: data,
    };
  }

  async remove(id: number, token: string) {
    let checkToken: any = this.jwtService.decode(token);
    let user = checkToken.data;
    console.log(user);
    let { role } = user;
    console.log(role);
    if (role == 'ADMIN') {
      await this.model.bookingRoom.delete({ where: { id } });
      return {
        status: 200,
        message: 'xóa đặt phòng thành công',
      };
    } else {
      return {
        status: 200,
        message: 'không có quyền xóa đặt phòng',
      };
    }
  }
  async search(id: number) {
    // console.log(id);
    let data = await this.model.bookingRoom.findMany({
      where: { user_id: id },
    });
    // console.log(data);
    if (!data.length) {
      return {
        status: 404,
        message: 'không tìm thấy phòng mà user đã đặt',
      };
    } else {
      return {
        status: 200,
        message: 'get theo user_id thành công',
        response: data,
      };
    }
  }
}
