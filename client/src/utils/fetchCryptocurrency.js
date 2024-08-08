import axios from "axios";

export async function fetchCryptocurrency(currency, page) {
  try {
    const response = await axios.get(`/api`, {
      params: { convert: currency, page: page },
    });
    console.log("haii");
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error);
    throw new Error(`Failed to fetch cryptocurrency data: ${error.message}`);
  }
}

export const fetchTrendingCoins = async (currency) => {
  try {
    const response = await axios.get("/api/trending", {
      params: { convert: currency },
    });
    console.log("haii");

    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching trending coins data:", error);
    throw new Error(`Failed to fetch trending coins: ${error.message}`);
  }
};

export async function fetchCryptoCoinsList() {
  try {
    const response = await axios.get("/api/coins");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error);
    throw new Error(`Failed to fetch cryptocurrency data: ${error.message}`);
  }
}
