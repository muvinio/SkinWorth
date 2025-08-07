import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('api/history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  async add(@Body() body: { userName: string; skin: string }) {
    await this.historyService.addHistory(body.userName, body.skin);
    return { success: true };
  }

  @Get()
  async get(@Query('userName') userName: string) {
    const data = await this.historyService.getHistory(userName);
    return data;
  }
}
