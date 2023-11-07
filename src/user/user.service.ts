import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
import * as brcypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async findAll() {
    let data = await this.prisma.users.findMany();
    return { status: '200', response: data };
  }
  async findOne(id: number) {
    let data = await this.prisma.users.findUnique({ where: { id } });
    let newData = { ...data, pass_word: '' };
    return {
      status: 200,
      message: 'get user theo id thành công',
      response: newData,
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
        };
      }
    } else {
      return {
        status: 400,
        message: 'role không đúng chỉ được tạo là USER hoặc ADMIN',
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
      return { status: 200, message: 'update user thành công', response: data };
    }
  }
  async remove(id: number) {
    await this.prisma.users.delete({ where: { id } });
    return ` đã xóa thành công ${id}`;
  }
  async search(userName: string) {
    let data = await this.prisma.users.findMany({
      where: { full_name: { contains: userName } },
    });
    return { status: 200, message: 'xóa user thành công', response: data };
  }
  async uploadAvatar(token: string, file: Express.Multer.File) {
    let decodeToken: any = this.jwtService.decode(token);
    // console.log(decodeToken.data);
    let user = decodeToken.data;
    let { id } = decodeToken.data;
    let newUser = { ...user, avatar: file.filename };
    let updateAvt = await this.prisma.users.update({
      data: newUser,
      where: { id },
    });
    return {
      status: 200,
      message: 'upload avatar thành công',
      response: updateAvt,
    };
  }
}
