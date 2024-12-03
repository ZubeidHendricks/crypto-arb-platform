import ccxt from 'ccxt';

export class ExchangeManager {
  private exchanges: Map<string, ccxt.Exchange> = new Map();

  async initializeExchanges() {
    const exchangeConfigs = {
      binance: { name: 'binance', apiKey: process.env.BINANCE_API_KEY },
      coinbase: { name: 'coinbasepro', apiKey: process.env.COINBASE_API_KEY },
      kraken: { name: 'kraken', apiKey: process.env.KRAKEN_API_KEY }
    };

    for (const [name, config] of Object.entries(exchangeConfigs)) {
      const exchange = new ccxt[config.name]({
        apiKey: config.apiKey,
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