import * as puppeteer from 'puppeteer';
export async function getSteamCurrency() : Promise<number | null > {
    
    const browser = await puppeteer.launch({ headless: true })
    const steamCurrencyPage = await browser.newPage();
    const currencyUrl = 'https://steam-currency.ru'
    
    await steamCurrencyPage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36')
    await steamCurrencyPage.goto(currencyUrl, {waitUntil : 'networkidle2'})
    
    const steamCurrency = await steamCurrencyPage.evaluate(()=>{
        const currency = document.querySelector('#currentRate');
        if(currency) return Number(currency.textContent?.replace(',','.'))
        return null;
    })
    await browser.close()
    return steamCurrency
}