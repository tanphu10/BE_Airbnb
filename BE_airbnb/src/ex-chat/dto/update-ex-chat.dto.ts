import { PartialType } from '@nestjs/swagger';
import { CreateExChatDto } from './create-ex-chat.dto';

export class UpdateExChatDto extends PartialType(CreateExChatDto) {}
