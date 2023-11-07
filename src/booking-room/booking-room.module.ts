import { Module } from '@nestjs/common';
import { BookingRoomService } from './booking-room.service';
import { BookingRoomController } from './booking-room.controller';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports: [JwtModule.register({})],
  controllers: [BookingRoomController],
  providers: [BookingRoomService],
})
export class BookingRoomModule {}
