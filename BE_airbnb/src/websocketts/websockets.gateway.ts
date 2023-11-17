import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebsocketsService } from './websockets.service';
import { Body, Get, Post, Controller } from '@nestjs/common';
import { CreateAddUserDto, CreateGroupDto } from './dto/create-groupChat.dto';
import { ApiTags } from '@nestjs/swagger';
// @WebSocketGateway(Option: { cors: true })
@ApiTags('group Chat')
@Controller('api')
// @WebSocketGateway(3000, { transports: ['websocket'] })
@WebSocketGateway({ transports: ['websocket', 'polling', 'flashsocket'] })
export class WebsocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  constructor(private readonly websocketsService: WebsocketsService) {}

  // @Get('/group-chat')
  // findAll() {
  //   return this.websocketsService.findAll();
  // }
  // @Post('/group-chat')
  // create(@Body() createGroupChat: CreateGroupDto) {
  //   return this.websocketsService.create(createGroupChat);
  // }
  // @Post('/add-member')
  // createAdd(@Body() createAddUser: CreateAddUserDto) {
  //   return this.websocketsService.createAdd(createAddUser);
  // }
  afterInit(socket: Socket): any {}

  async handleConnection(socket: Socket) {
    // const headers = socket.handshake.headers;
    // // console.log(headers);
    // const token = headers.authorization as string;
    // console.log(token);
    // if (token) {
    //   try {
    //     socket.data.email =
    //       await this.websocketsService.handleVerifyToken(token);
    //     // console.log('connect success', socket.data.email);
    //   } catch (error) {
    //     socket.disconnect();
    //   }
    // } else {
    //   socket.disconnect();
    // }
    console.log(`socket connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    console.log(`socket disconnected: ${socket.id}`);
  }

  @SubscribeMessage('join-room')
  async handleJoinRoom(socket: Socket, data: string) {
    console.log('roomName', data);
    // socket.emit('roomMessages', roomName);
    // const createRoom = await this.websocketsService.createMember(data);
    socket.join(data);
  }

  @SubscribeMessage('mess-send')
  async handleMessage(
    socket: Socket,
    data: {
      user_id: number;
      chat_id: number;
      content: string;
      createdAt: Date;
      updatedAt: Date;
    },
  ) {
    const { user_id, content, createdAt, updatedAt, chat_id } = data;
    const newData = {
      ...data,
      user_id: Number(user_id),
      chat_id: Number(chat_id),
    };
    console.log('newData', newData);
    const newMessage = await this.websocketsService.createMessage(newData);
    console.log(newMessage);
    // await this.websocketsService.saveMessage(newMessage);
    setTimeout(() => {
      this.server.emit('send-data', data);
    }, 1000);
  }
}
