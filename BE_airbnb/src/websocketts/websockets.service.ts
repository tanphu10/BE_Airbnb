import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, messages } from '@prisma/client';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateAddUserDto, CreateGroupDto } from './dto/create-groupChat.dto';

@Injectable()
export class WebsocketsService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();

  // các bước xử lí group bằng socket io
  // step 1. gửi token lên bằng socket.io để check token
  //       -gửi token lên như thế nào ?
  // step 2. tạo phòng chat
  //       -em tạo bình thường không được
  //           --> vậy thì bên socket có tạo render ra swagger được không
  //       -vậy thì có bước tạo phòng đó xử lí trong bước join-room hay sao?
  // step 3. thêm người dùng vào phòng chat
  //       - như bước 2
  // step 4. gửi tin nhắn lưu vào server

  async handleVerifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      console.log('payload', payload);
      return payload.checkEmail.data.email;
    } catch (error) {
      console.log(error);
    }
  }
  async create(createGroupChat: CreateGroupDto) {
    let data = await this.prisma.group_chat.create({
      data: createGroupChat,
    });
    return {
      status: 200,
      message: 'tạo phòng chat thành công',
      content: data,
      dateTime: new Date(),
    };
  }
  async createAdd(createAddUser: CreateAddUserDto) {
    let data = await this.prisma.group_chat.create({
      data: createAddUser,
    });
    return {
      status: 200,
      message: 'add member vào phòng chat thành công',
      content: data,
      dateTime: new Date(),
    };
  }
  async findAll() {
    let data = await this.prisma.group_chat.findMany({
      include: { chats_users: true },
    });
    return {
      status: 200,
      message: 'get all group chat thành công',
      content: data,
      dateTime: new Date(),
    };
  }
  async createMessage(newData: CreateMessageDto) {
    // console.log(newData);
    let data = await this.prisma.messages.create({ data: newData });
    // console.log(data);
    return data;
  }
  // async saveMessage(newMessage: CreateMessageDto) {
  //   console.log(newMessage);
  //   let newData = this.prisma.chats.create({ data: newMessage });
  //   console.log(newData);
  //   return;
  // }
}
