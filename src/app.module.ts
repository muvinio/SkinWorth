import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SteamModule } from './markets/steam/steam.module';
import { MarketCsgoModule } from './markets/market-csgo/market-csgo.module';
import { PriceModule } from './price/price.module';
import { SuggestModule } from './suggest/suggest.module';
import { HistoryModule } from './history/history.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true
  }), SteamModule, MarketCsgoModule, PriceModule, SuggestModule, HistoryModule, AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
