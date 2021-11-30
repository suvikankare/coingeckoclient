export const profit = (prices) => {
  let maxProfit = 0;
  let buyPrice = prices[0][1];
  let sellPrice = 0;
  let sellDay = 0;
  let buyDay = 0;
  for (let i = 1; i < prices.length; i++) {
    // find buy price and store it to buyPrice
    buyPrice = Math.min(prices[i][1], buyPrice);
    // find highest price and store it to sellPrice
    sellPrice = Math.max(maxProfit, prices[i][1]);
    // find highest difference between prices
    maxProfit = Math.max(maxProfit, prices[i][1] - buyPrice);
    // find cells holding dates from highest and lowest prices
    sellDay = prices.find(p => p[1] === sellPrice);
    buyDay = prices.find(p => p[1] === buyPrice);
  }

  return { sellDay, buyDay, buyPrice, sellPrice, maxProfit };
};