// suggest.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SuggestService {
  private skins: string[];

  constructor() {
const filePath = path.resolve(process.cwd(), 'src', 'suggest', 'skins.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Предположим, что skins.json - это массив объектов с полем market_hash_name
    this.skins = data.items.map((item: any) => item.market_hash_name);
  }

  getSuggestions(query: string): string[] {
    if (!query.trim()) return [];

    // Разбиваем запрос на слова (по пробелам), игнорируя пустые
    const words = query
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    // Фильтруем скины, которые содержат все слова в любом порядке
    const filtered = this.skins.filter(skinName => {
      const lowerName = skinName.toLowerCase();
      return words.every(word => lowerName.includes(word));
    });

    // Ограничиваем максимум 5 подсказками
    return filtered.slice(0, 5);
  }
}
