import { Module } from '@nestjs/common';
import { UseService } from './use.service';
import { UseController } from './use.controller';

@Module({
  controllers: [UseController],
  providers: [UseService],
})
export class UseModule {}
