// redis.ts
import { createClient } from 'redis';

export const redisClient = createClient();

redisClient.on('error', (err) => console.error('Redis Client Error', err));

redisClient.connect(); // если ты используешь ES-модули (или в main-файле await connect)
