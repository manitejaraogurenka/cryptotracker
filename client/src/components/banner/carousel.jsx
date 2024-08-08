import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { cryptoActions } from "../../store/cryptoSlice";
import { fetchTrendingCoins } from "../../utils/fetchCryptocurrency";
import LoaderSpinner from "../../components/Loader";

const Carousel = () => {
  const { trendingCoins, currency } = useSelector((state) => state.crypto);
  const dispatch = useDispatch();

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth >= 460);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth >= 460);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTrendingCoins(currency);
        dispatch(cryptoActions.setTrendingCoins(data.data));
      } catch (error) {
        console.error("Error fetching trending coins data:", error);
      }
    };
    fetchData();
  }, [dispatch, currency]);

  const getCoinImageUrl = (id) =>
    `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`;

  const items =
    trendingCoins?.map((coin) => {
      const profit = coin.quote[currency]?.percent_change_24h >= 0;
      return (
        <div
          key={coin.id}
          className="flex flex-col items-center uppercase text-white"
        >
          <img
            src={getCoinImageUrl(coin.id)}
            alt={coin.name}
            className={`mb-2 h-20 rounded-full ${
              isSmallScreen ? "h-20" : "h-16 mt-4"
            }`}
          />
          <span>
            {coin.symbol}&nbsp;
            <span
              className={`font-semibold ${
                profit ? "text-green-500" : "text-red-500"
              }`}
            >
              {profit && "+"}
              {coin.quote[currency]?.percent_change_24h.toFixed(2)}%
            </span>
          </span>
          <span className="font-semibold text-lg">
            {coin.quote[currency]?.price.toFixed(2)}
          </span>
        </div>
      );
    }) || [];

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  return trendingCoins ? (
    <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  ) : (
    <LoaderSpinner height={"5rem"} width={"5rem"} />
  );
};

export default Carousel;
