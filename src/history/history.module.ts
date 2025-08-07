import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
    }),
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
