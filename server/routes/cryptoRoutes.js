const express = require("express");
const {
  getCryptoListings,
  getTrendingCoins,
  convertCryptocurrency,
  getCryptoCoinsList,
} = require("../controllers/cryptoController");

const router = express.Router();

router.get("/api", getCryptoListings);
router.get("/api/coins", getCryptoCoinsList);
router.get("/api/trending", getTrendingCoins);
router.get("/api/convert", convertCryptocurrency);

module.exports = router;
