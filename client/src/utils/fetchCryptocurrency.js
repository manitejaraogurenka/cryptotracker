import axios from "axios";

export async function fetchCryptocurrency(currency, page) {
  try {
    const response = await axios.get(
      `https://cryptotrackerapi.vercel.app/api`,
      {
        params: { convert: currency, page: page },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error);
    throw new Error(`Failed to fetch cryptocurrency data: ${error.message}`);
  }
}

export const fetchTrendingCoins = async (currency) => {
  try {
    const response = await axios.get(
      "https://cryptotrackerapi.vercel.app/api/trending",
      {
        params: { convert: currency },
      }
    );
    console.log("haii");

    return response.data;
  } catch (error) {
    console.error("Error fetching trending coins data:", error);
    throw new Error(`Failed to fetch trending coins: ${error.message}`);
  }
};

export async function fetchCryptoCoinsList() {
  try {
    const response = await axios.get(
      "https://cryptotrackerapi.vercel.app/api/coins"
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error);
    throw new Error(`Failed to fetch cryptocurrency data: ${error.message}`);
  }
}
