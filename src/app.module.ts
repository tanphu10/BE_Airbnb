import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './Strategy/jwt.strategy';
import { RoomModule } from './room/room.module';
import { LocationModule } from './location/location.module';
import { BookingRoomModule } from './booking-room/booking-room.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [UserModule, AuthModule, RoomModule, LocationModule, BookingRoomModule, CommentModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
