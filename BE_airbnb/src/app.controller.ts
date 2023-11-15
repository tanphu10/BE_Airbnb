import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import * as express from 'express';

// const exApp = express();
// const httpServer = createServer(exApp);
// const io = new Server(httpServer, {
//   cors: {
//     origin: '*',
//   },
// });

// httpServer.listen(3000);

// io.on('connection', (socket) => {
//   console.log('connection', socket.id);
//   socket.on('join-room', (roomId) => {
//     socket.rooms.forEach((roomId) => socket.leave(roomId));
//     // console.log(roomId);
//     socket.join(roomId);
//   });
//   socket.on('mess-send', (txtsend) => {
//     console.log('messages server lưu', txtsend);
//     // lưu cơ sở dữ liệu là lưu khúc này
//     // this.AppService.handledata(txtsend);
//     io.emit('send-data', txtsend);
//     // io.to(data.roomId).emit('send-data', data);
//   });

//   socket.on('disconnect', (reason) => {
//     console.log(socket.id, reason);
//   });
// });

// -----------
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello(txtsend);
  // }
}
