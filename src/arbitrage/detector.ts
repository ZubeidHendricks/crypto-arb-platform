export interface Opportunity {
  buyExchange: string;
  sellExchange: string;
  spread: number;
  buyPrice: number;
  sellPrice: number;
}

export class ArbitrageDetector {
  private minProfitPercentage: number = 0.5;

  findOpportunities(prices: Map<string, number>): Opportunity[] {
    const opportunities: Opportunity[] = [];
    const exchanges = Array.from(prices.keys());

    for (let i = 0; i < exchanges.length; i++) {
      for (let j = i + 1; j < exchanges.length; j++) {
        const buyPrice = prices.get(exchanges[i]);
        const sellPrice = prices.get(exchanges[j]);
        const spread = ((sellPrice - buyPrice) / buyPrice) * 100;

        if (spread > this.minProfitPercentage) {
          opportunities.push({
            buyExchange: exchanges[i],
            sellExchange: exchanges[j],
            spread,
            buyPrice,
            sellPrice
          });
        }
      }
    }
    return opportunities;
  }
}