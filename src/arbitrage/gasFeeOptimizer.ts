import { ethers } from 'ethers';
import { Opportunity } from './detector';

export class GasFeeOptimizer {
  async optimizeOpportunities(opportunities: Opportunity[]): Promise<Opportunity[]> {
    const gasPrice = await this.getGasPrice();
    return opportunities.filter(opp => {
      const estimatedGasCost = this.estimateGasCost(gasPrice);
      return opp.spread > estimatedGasCost;
    });
  }

  private async getGasPrice(): Promise<number> {
    const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
    const gasPrice = await provider.getFeeData();
    return gasPrice.gasPrice.toNumber();
  }

  private estimateGasCost(gasPrice: number): number {
    const estimatedGasUsed = 200000; // Estimated gas for DEX trade
    return (gasPrice * estimatedGasUsed) / 1e18; // Convert to ETH
  }
}