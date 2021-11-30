import CoinGecko from "coingecko-api";

const CoinGeckoClient = new CoinGecko();

export const fetchMarketChartRangeFunction = async (from, to) => {
  const { data } = await CoinGeckoClient.coins.fetchMarketChartRange('bitcoin', {
    from: from,
    to: to,
  });
  return data;
}

export default { fetchMarketChartRangeFunction };