// suggest.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { SuggestService } from './suggest.service';

@Controller('api/suggest')
export class SuggestController {
  constructor(private readonly suggestService: SuggestService) {}

  @Get()
  getSuggestions(@Query('q') query: string) {
    return this.suggestService.getSuggestions(query);
  }
}
