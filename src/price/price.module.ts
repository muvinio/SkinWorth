import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { SteamModule } from 'src/markets/steam/steam.module';
import { MarketCsgoService } from 'src/markets/market-csgo/market-csgo.service';
import { MarketCsgoModule } from 'src/markets/market-csgo/market-csgo.module';

@Module({
  controllers: [PriceController], // только контроллеры
  providers: [PriceService, MarketCsgoService],      // сервисы
  imports: [SteamModule, MarketCsgoModule],          // импорт SteamModule, где есть SteamService
})
export class PriceModule {}
