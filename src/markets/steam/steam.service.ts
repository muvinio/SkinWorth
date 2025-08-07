import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as puppeteer from 'puppeteer';


@Injectable()
export class SteamService {
  //   async getSteamCurrency(): Promise<number | null> {
  //       const browser = await puppeteer.launch({ headless: true });
  //       const page = await browser.newPage();
    
  //       await page.setUserAgent(
  //         'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
  //       );
  //       await page.goto('https://steam-currency.ru', { waitUntil: 'domcontentloaded', timeout: 0 });
    
  //       // Ждем, пока элемент с курсом появится
  //       await page.waitForSelector('#currentRate');
    
  //       // Получаем текст курса
  //       const currency = await page.evaluate(() => {
  //         const el = document.querySelector('#currentRate');
  //         if (!el || !el.textContent) return null;
  //         return Number(el.textContent.replace(',', '.').trim());
  //       });
    
  //       await browser.close();
  //       return currency;
  //     }
  //     async getSteamPrice(item: string): Promise<number | null> {
  //   const currency = await this.getSteamCurrency();
  //   if (!currency) return null;

  //   const url = `https://steamcommunity.com/market/listings/730/${encodeURIComponent(item)}`;
  //   const browser = await puppeteer.launch({ headless: true });
  //   const page = await browser.newPage();

  //   await page.setUserAgent(
  //     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
  //   );

  //   await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });

  //   // Ждем появления элемента с ценой
  //   try {
  //     await page.waitForSelector('.market_commodity_orders_header_promote', { timeout: 10000 });
  //   } catch {
  //     await browser.close();
  //     return null; // элемент не появился — возвращаем null
  //   }

  //   const price = await page.evaluate((currency) => {
  //     const elements = document.querySelectorAll('.market_commodity_orders_header_promote');
  //     if (elements.length >= 2) {
  //       const text = elements[1].textContent;
  //       if (text) {
  //         // Чистим строку, заменяем запятую на точку и убираем всё, кроме цифр и точки
  //         const cleaned = text.replace(',', '.').replace(/[^\d.]/g, '').trim();
  //         const num = parseFloat(cleaned);
  //         if (!isNaN(num)) return Number((num * currency).toFixed(2));
  //       }
  //     }
  //     return null;
  //   }, currency);

  //   await browser.close();
  //   return price;
  // }

  async getSteamPrice(name: string): Promise<number | null> {
    const url = `http://localhost:8000/get-steam-price.php?name=${encodeURIComponent(name)}`;

    const result = await axios.get(url)
    const price = result.data.response.lowest_price;

    if (!price) return null;
    return price
  }
}
