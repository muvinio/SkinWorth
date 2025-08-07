import { Controller, Query, Get } from '@nestjs/common';
import { SteamService } from './steam.service';

@Controller('steam')
export class SteamController {
  constructor(private readonly steamService: SteamService) {}

  @Get()
    async getSteam(@Query('item') item: string) {
      const price = await this.steamService.getSteamPrice(item);
      return { item, price };
    }
}
