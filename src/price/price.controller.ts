// src/price/price.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { PriceService } from './price.service';

@Controller('api/price') // теперь твой URL будет: /api/price?name=...
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  async getPrice(@Query('item') item: string) {
    return this.priceService.getPrices(item);
  }
}
