import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MarketCsgoService {
    constructor(private readonly configService : ConfigService){}

    async getMarketCsgoPrice(item: string): Promise<number | null> {
  const api = this.configService.getOrThrow<string>('MARKET_API_KEY');
  const url = `https://market.csgo.com/api/v2/search-item-by-hash-name`;

  try {
    const response = await axios.get(url, {
      params: {
        key: api,
        hash_name: item
      },
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const data = response.data;

    if (!data.success || !data.data || data.data.length === 0) {
      return null;
    }

    const price = data.data[0].price; // в копейках
    return price / 100; // преобразуем в рубли
  } catch (error) {
    console.error('API error:', error.response?.status, error.response?.data);
    return null;
  }
}
}
