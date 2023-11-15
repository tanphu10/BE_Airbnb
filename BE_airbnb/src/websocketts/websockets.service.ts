import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, messages } from '@prisma/client';
import { CreateMessageDto } from './dto/create-location.dto';

@Injectable()
export class WebsocketsService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async handleVerifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      console.log('payload', payload);
      return payload.checkEmail.data.email;
    } catch (error) {
      console.log(error);
    }
  }
  async createMessage(newData: CreateMessageDto) {
    console.log(newData);
    let data = await this.prisma.messages.create({ data: newData });
    console.log(data);
    return data;
  }
  // async saveMessage(newMessage: CreateMessageDto) {
  //   console.log(newMessage);
  //   let newData = this.prisma.chats.create({ data: newMessage });
  //   console.log(newData);
  //   return;
  // }
}
