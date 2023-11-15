import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
import * as brcypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { skip } from 'node:test';
@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async findAll() {
    let data = await this.prisma.users.findMany();
    return {
      status: '200',
      message: 'get all user thành công',
      content: data,
      dateTime: new Date(),
    };
  }
  async findOne(user_id: number) {
    // console.log(user_id);
    let data = await this.prisma.users.findFirst({ where: { id: user_id } });
    // console.log(data);
    let newData = { ...data, pass_word: '' };
    return {
      status: 200,
      message: 'get user theo id thành công',
      content: newData,
      dateTime: new Date(),
    };
  }
  async create(createUserDto: CreateUserDto) {
    let { email, pass_word, role } = createUserDto;
    let newPass = brcypt.hashSync(pass_word, 10);
    let newUser = { ...createUserDto, pass_word: newPass };
    if (role == 'USER' || role == 'ADMIN') {
      let checkEmail = await this.prisma.users.findMany({ where: { email } });
      if (checkEmail.length > 0) {
        return 'email đã tồn tại';
      } else {
        let data = await this.prisma.users.create({ data: newUser });
        return {
          status: 201,
          message: 'create user thành công',
          content: data,
          dateTime: new Date(),
        };
      }
    } else {
      return {
        status: 400,
        message: 'role không đúng chỉ được tạo là USER hoặc ADMIN',
        dateTime: new Date(),
      };
    }
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    let { pass_word } = updateUserDto;
    let user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) {
      return 'user không tồn tại';
    } else {
      let newPass = brcypt.hashSync(pass_word, 10);
      let newUser = { ...updateUserDto, pass_word: newPass };
      let data = await this.prisma.users.update({
        data: newUser,
        where: { id },
      });
      return {
        status: 200,
        message: 'update user thành công',
        content: data,
        dateTime: new Date(),
      };
    }
  }
  async remove(id: number) {
    await this.prisma.bookingRoom.deleteMany({
      where: { user_id: id },
    });
    await this.prisma.comments.deleteMany({
      where: { user_id: id },
    });
    await this.prisma.users.delete({ where: { id } });
    return {
      status: 200,
      message: ` đã xóa thành công ${id}`,
      dateTime: new Date(),
    };
  }
  async search(userName: string) {
    let data = await this.prisma.users.findMany({
      where: { full_name: { contains: userName } },
    });
    if (data.length > 0) {
      return {
        status: 200,
        message: 'danh sách user',
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
  async uploadAvatar(token: string, file: Express.Multer.File) {
    // console.log(token);
    let decodeToken: any = this.jwtService.decode(token);
    // console.log(decodeToken.data);
    // console.log('file', file);
    let user = decodeToken.data;
    let { id } = decodeToken.data;
    let newUser = { ...user, avatar: file.filename };
    let updateAvt = await this.prisma.users.update({
      data: newUser,
      where: { id },
    });
    // console.log(updateAvt);
    return {
      status: 200,
      message: 'upload avatar thành công',
      content: updateAvt,
      dateTime: new Date(),
    };
  }
  async pagina(page: number, pageSize: number, userName: string) {
    let index = (page - 1) * pageSize;
    let data = await this.prisma.users.findMany({
      skip: index,
      take: +pageSize,
      where: {
        full_name: {
          contains: userName,
        },
      },
    });
    return {
      status: 200,
      message: 'get theo trang thành công',
      content: data,
      dateTime: new Date(),
    };
  }


}
