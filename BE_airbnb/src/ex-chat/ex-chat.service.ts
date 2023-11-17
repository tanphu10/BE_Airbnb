import { Injectable } from '@nestjs/common';
import { CreateExChatDto } from './dto/create-ex-chat.dto';
import { UpdateExChatDto } from './dto/update-ex-chat.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ExChatService {
  prisma = new PrismaClient();
  create(createExChatDto: CreateExChatDto) {
    return 'This action adds a new exChat';
  }

  async findAll() {
    return `This action returns all exChat`;
  }

  async findOne(user_id: number) {
    let data = await this.prisma.chats_users.findMany({
      where: { user_id },
      include: {
        group_chat: { include: { messages: { include: { users: true } } } },
      },
    });
    return {
      status: 200,
      message: 'get user theo by id chat thành công',
      content: data,
      dateTime: new Date(),
    };
  }
  async findRoom(room_id: number) {
    let data = await this.prisma.group_chat.findMany({
      where: { id: room_id },
      include: { chats_users: { include: { users: true } } },
    });
    return {
      status: 200,
      message: 'get all user theo group theo group chat thành công',
      content: data,
      dateTime: new Date(),
    };
  }

  async searchName(name: string) {
    let data = await this.prisma.chats_users.findMany({
      // where: { chat_name: { contains: name } },
      include: {
        group_chat: { include: { messages: { include: { users: true } } } },
      },
    });
    if (data.length > 0) {
      return {
        status: 200,
        message: 'danh sách room',
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
  update(id: number, updateExChatDto: UpdateExChatDto) {
    return `This action updates a #${id} exChat`;
  }

  remove(id: number) {
    return `This action removes a #${id} exChat`;
  }
}
