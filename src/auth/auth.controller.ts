import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginAuthDto } from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/auth/signup')
  signup(@Body() body: CreateAuthDto) {
    return this.authService.signup(body);
  }
  @Post('/auth/signin')
  signin(@Body() body: LoginAuthDto) {
    return this.authService.signin(body);
  }
}
