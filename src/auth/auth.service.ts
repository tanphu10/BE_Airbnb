import { Injectable } from '@nestjs/common';
import { CreateAuthDto, LoginAuthDto } from './dto/create-auth.dto';
import { PrismaClient, users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async signup(body: CreateAuthDto) {
    let { email, pass_word } = body;
    let checkEmail = await this.prisma.users.findMany({ where: { email } });
    if (checkEmail.length > 0) {
      return 'email đã tồn tại';
    } else {
      let newPass = bcrypt.hashSync(pass_word, 10);
      let newRole = 'USER';
      let newUser = { ...body, pass_word: newPass, role: newRole };
      let data = await this.prisma.users.create({ data: newUser });
      return { status: 200, message: 'Đăng kí thành công', response: data };
    }
  }
  async signin(body: LoginAuthDto) {
    let { pass_word, email } = body;
    let checkEmail = await this.prisma.users.findFirst({
      where: { email },
    });
    // console.log(checkEmail);
    let infoUser = { ...checkEmail, pass_word: '' };
    if (checkEmail) {
      let checkPass = bcrypt.compareSync(pass_word, checkEmail.pass_word);
      if (checkPass) {
        let token = this.jwtService.sign(
          { data: checkEmail },
          { expiresIn: '1s', secret: 'BIMAT' },
        );
        // console.log(token);
        return {
          status: 200,
          message: 'Đăng nhập thành công',
          content: { user: infoUser },
          token: token,
        };
      } else {
        return {
          status: 400,
          message: 'Yêu cầu không hợp lệ!',
          content: 'mật khẩu không đúng',
        };
      }
    } else {
      return {
        status: 400,
        message: 'Yêu cầu không hợp lệ!',
        content: 'email không đúng',
      };
    }
  }
}
