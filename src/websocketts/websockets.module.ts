import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './websockets.gateway';
import { WebsocketsService } from './websockets.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [WebsocketsService, WebsocketsGateway],
})
export class WebsocketsModule {}
