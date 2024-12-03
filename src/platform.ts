import { ExchangeManager } from './exchanges/manager';
import { ArbitrageDetector } from './arbitrage/detector';
import { GasFeeOptimizer } from './arbitrage/gasFeeOptimizer';

export class ArbitragePlatform {
  private exchangeManager: ExchangeManager;
  private arbitrageDetector: ArbitrageDetector;
  private gasFeeOptimizer: GasFeeOptimizer;

  constructor() {
    this.exchangeManager = new ExchangeManager();
    this.arbitrageDetector = new ArbitrageDetector();
    this.gasFeeOptimizer = new GasFeeOptimizer();
  }

  async start() {
    await this.exchangeManager.initializeExchanges();
    this.startPriceMonitoring();
  }

  private startPriceMonitoring() {
    setInterval(async () => {
      const prices = await this.exchangeManager.getPrices('BTC/USDT');
      const opportunities = this.arbitrageDetector.findOpportunities(prices);
      const viableOpportunities = await this.gasFeeOptimizer.optimizeOpportunities(opportunities);
      
      if (viableOpportunities.length > 0) {
        console.log('Found opportunities:', viableOpportunities);
      }
    }, 1000);
  }
}