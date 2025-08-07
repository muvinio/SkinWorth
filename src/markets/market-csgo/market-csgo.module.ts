import { Module } from '@nestjs/common';
import { MarketCsgoService } from './market-csgo.service';
import { MarketCsgoController } from './market-csgo.controller';

@Module({
  controllers: [MarketCsgoController],
  providers: [MarketCsgoService],
})
export class MarketCsgoModule {}
