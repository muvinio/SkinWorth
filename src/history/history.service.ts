import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class HistoryService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async addHistory(userName: string, skin: string) {
    const key = `history:${userName}`;
    await this.redis.lrem(key, 0, skin);
    await this.redis.lpush(key, skin);
    await this.redis.ltrim(key, 0, 4);
  }

  async getHistory(userName: string) {
    const key = `history:${userName}`;
    return await this.redis.lrange(key, 0, 4);
  }
}
