import { createSlice } from "@reduxjs/toolkit";

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    cryptoData: [],
    currency: "USD",
    trendingCoins: [],
    currentPage: 1,
  },
  reducers: {
    setCryptoData(state, action) {
      state.cryptoData = action.payload;
    },
    setCurrency(state, action) {
      state.currency = action.payload;
    },
    setTrendingCoins(state, action) {
      state.trendingCoins = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const cryptoActions = cryptoSlice.actions;
export default cryptoSlice;
