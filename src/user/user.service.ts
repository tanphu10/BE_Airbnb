import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import * as brcypt from 'bcrypt';
@Injectable()
export class UserService {
  prisma = new PrismaClient();
  async findAll() {
    let data = await this.prisma.users.findMany();
    // console.log(data);
    return { status: '200', Response: data };
  }
  async findOne(id: number) {
    let data = await this.prisma.users.findUnique({ where: { id } });
    return data;
  }
  async create(createUserDto: CreateUserDto) {
    let { email, pass_word } = createUserDto;
    let newPass = brcypt.hashSync(pass_word, 10);
    let newUser = { ...createUserDto, pass_word: newPass };
    let checkEmail = await this.prisma.users.findMany({ where: { email } });
    if (checkEmail.length > 0) {
      return 'email đã tồn tại';
    } else {
      let data = await this.prisma.users.create({ data: newUser });
      return { status: 201, Response: data };
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
      return { status: 200, Response: data };
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
    return { status: 200, Response: data };
  }
}
