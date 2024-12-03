import * as ccxt from 'ccxt';

export class ExchangeManager {
  private exchanges: Map<string, ccxt.Exchange> = new Map();

  async initializeExchanges() {
    const exchanges = ['binance', 'kraken', 'coinbase'];
    
    for (const name of exchanges) {
      const exchange = new (ccxt as any)[name]({
        enableRateLimit: true
      });
      this.exchanges.set(name, exchange);
    }
  }

  async getPrices(symbol: string): Promise<Map<string, number>> {
    const prices = new Map();
    for (const [name, exchange] of this.exchanges) {
      try {
        const ticker = await exchange.fetchTicker(symbol);
        console.log(`${name}: ${ticker.last}`);
        prices.set(name, ticker.last);
      } catch (error) {
        console.error(`Error fetching ${symbol} price from ${name}:`, error);
      }
    }
    return prices;
  }
}