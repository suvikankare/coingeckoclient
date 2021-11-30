import { DateTime } from 'luxon';

export const sorted = (bitcoin) => {

  // Create an array for downward trends
  let trend = [];
  const totaltrends = [];

  // loop through prices
  bitcoin && bitcoin.prices.forEach((b, i) => {
    if (i === 0) return;
    const [, price] = b;
    const [previousDay, previousPrice] = bitcoin.prices[i - 1]
    // if today's price is lower than yesterday, push to trend-array
    if (price < previousPrice) trend.push({ previousDay, previousPrice })
    // if not, stop previous step and push trend-array to totaltrends-array
    else {
      if (trend.length > 0) {
        trend.push({ previousDay, previousPrice })
        totaltrends.push(trend);
      }
      trend = []
    }
  });

  // find longest array from totaltrends = longest downward trend
  const sorted = totaltrends.sort((a, b) => {
    return b.length - a.length
  });

  const downwardDays = sorted[0].length;
  const downwardFrom = DateTime.fromMillis(sorted[0][0].previousDay).toLocaleString();
  const downwardTo = DateTime.fromMillis(sorted[0].at(-1).previousDay).toLocaleString();

  return { downwardDays, downwardFrom, downwardTo };
}
