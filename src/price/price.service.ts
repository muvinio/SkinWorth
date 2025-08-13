// src/price/price.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SteamService } from 'src/markets/steam/steam.service';
import { MarketCsgoService } from 'src/markets/market-csgo/market-csgo.service';

@Injectable()
export class PriceService {
    constructor(
        private readonly steamService:SteamService,
        private readonly marketCsgoService:MarketCsgoService ){}
  // backend: price.service.ts
async getPrices(item: string) {
  const steamPrice = await this.steamService.getSteamPrice(item); // твой метод
  const marketPrice = await this.marketCsgoService.getMarketCsgoPrice(item); // метод для получения цены с market.csgo

  return { steamPrice, marketPrice };
}

}
