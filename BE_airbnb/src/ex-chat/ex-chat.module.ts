import { Module } from '@nestjs/common';
import { ExChatService } from './ex-chat.service';
import { ExChatController } from './ex-chat.controller';

@Module({
  controllers: [ExChatController],
  providers: [ExChatService],
})
export class ExChatModule {}
