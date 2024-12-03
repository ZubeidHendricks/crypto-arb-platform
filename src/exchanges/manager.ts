import ccxt from 'ccxt';

export class ExchangeManager {
  private exchanges: Map<string, ccxt.Exchange> = new Map();

  async initializeExchanges() {
    const exchangeNames = ['binance', 'kraken', 'coinbase'];
    
    for (const name of exchangeNames) {
      const exchange = new ccxt[name]({
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
        prices.set(name, ticker.last);
      } catch (error) {
        console.error(`Error fetching ${symbol} price from ${name}:`, error);
      }
    }
    return prices;
  }
}