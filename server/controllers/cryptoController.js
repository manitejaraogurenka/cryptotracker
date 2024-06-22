const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.CRYPTO_API_KEY;

const api = axios.create({
  baseURL: "https://pro-api.coinmarketcap.com",
  headers: {
    Accept: "application/json",
    "Accept-Encoding": "deflate, gzip",
  },
});

const handleRequestError = (error, res) => {
  console.error(error.response ? error.response.data : error.message);
  res.status(500).json({ error: "Internal Server Error" });
};

const getCryptoListings = async (req, res) => {
  const { convert, page } = req.query;
  try {
    const response = await api.get("/v1/cryptocurrency/listings/latest", {
      params: {
        limit: 10,
        convert: convert,
        start: String(page),
        CMC_PRO_API_KEY: apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    handleRequestError(error, res);
  }
};

const getCryptoCoinsList = async (req, res) => {
  try {
    const response = await api.get("/v1/cryptocurrency/listings/latest", {
      params: {
        CMC_PRO_API_KEY: apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    handleRequestError(error, res);
  }
};

const getTrendingCoins = async (req, res) => {
  const { convert = "USD" } = req.query;
  try {
    const response = await api.get("/v1/cryptocurrency/listings/latest", {
      params: {
        limit: 10,
        convert: convert,
        CMC_PRO_API_KEY: apiKey,
      },
    });
    const sortedCoins = response.data.data
      .sort(
        (a, b) =>
          b.quote[convert].percent_change_24h -
          a.quote[convert].percent_change_24h
      )
      .slice(0, 10);
    res.json({ data: sortedCoins });
  } catch (error) {
    handleRequestError(error, res);
  }
};

const convertCryptocurrency = async (req, res) => {
  const { fromCoin, toCoin, amount } = req.query;
  try {
    const response = await api.get("/v1/tools/price-conversion", {
      params: {
        amount: amount,
        symbol: fromCoin,
        convert: toCoin,
        CMC_PRO_API_KEY: apiKey,
      },
    });
    res.json({ result: response.data.data.quote[toCoin].price });
  } catch (error) {
    console.error("Error converting cryptocurrency:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCryptoListings,
  getTrendingCoins,
  convertCryptocurrency,
  getCryptoCoinsList,
};
