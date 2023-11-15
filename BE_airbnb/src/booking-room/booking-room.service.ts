import {
  HttpCode,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import { CreateBookingRoomDto } from './dto/create-booking-room.dto';
import { UpdateBookingRoomDto } from './dto/update-booking-room.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class BookingRoomService {
  constructor(private jwtService: JwtService) {}
  model = new PrismaClient();

  async findAll() {
    let data = await this.model.bookingRoom.findMany({
      include: { room: true },
    });
    return {
      status: 200,
      message: 'get booking Room api thành công',
      content: data,
    };
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
        dateTime: new Date(),
      };
    } else {
      return {
        status: 200,
        message: 'get  booking Room api theo id thành công',
        content: data,
        dateTime: new Date(),
      };
    }
  }
  @HttpCode(200)
  async create(createBookingRoomDto: CreateBookingRoomDto) {
    console.log(createBookingRoomDto);
    try {
      let data = await this.model.bookingRoom.create({
        data: createBookingRoomDto,
      });
      console.log(data);
      return {
        status: 200,
        message: 'đặt phòng thành công',
        content: data,
        dateTime: new Date(),
      };
    } catch (exception) {
      console.log(exception);
      if ((exception.statusCode = 400)) {
        console.log('ex', exception.meta.field_name);
        throw new HttpException(exception.massage, exception.statusCode);
      }
      throw new InternalServerErrorException('Lỗi ...');
    }
  }
  async update(id: number, updateBookingRoomDto: UpdateBookingRoomDto) {
    let data = await this.model.bookingRoom.update({
      data: updateBookingRoomDto,
      where: { id },
    });
    return {
      status: 200,
      message: 'update đặt phòng thành công',
      content: data,
      dateTime: new Date(),
    };
  }
  async remove(id: number, token: string) {
    let checkToken: any = this.jwtService.decode(token);
    let user = checkToken.data;
    // console.log(user);
    let { role } = user;
    // console.log(role);
    if (role == 'ADMIN') {
      await this.model.bookingRoom.delete({ where: { id } });
      return {
        status: 200,
        message: 'xóa đặt phòng thành công',
        dateTime: new Date(),
      };
    } else {
      return {
        status: 401,
        message: 'không có quyền xóa đặt phòng',
        dateTime: new Date(),
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
        dateTime: new Date(),
      };
    } else {
      return {
        status: 200,
        message: 'get booking room theo user_id thành công',
        content: data,
        dateTime: new Date(),
      };
    }
  }
}
