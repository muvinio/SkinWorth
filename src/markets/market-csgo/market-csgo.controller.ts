import { Controller, Get, Query } from '@nestjs/common';
import { MarketCsgoService } from './market-csgo.service';

@Controller('market')
export class MarketCsgoController {
  constructor(private readonly marketCsgoService: MarketCsgoService) {}

  @Get()
  async getMarket(@Query('item') item:string){
    const price = await this.marketCsgoService.getMarketCsgoPrice(item)
    return{item, price}
  }
}
