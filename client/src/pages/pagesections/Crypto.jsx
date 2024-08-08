import React, { useEffect, useState, useCallback } from "react";
import { fetchCryptocurrency } from "../../utils/fetchCryptocurrency";
import { useDispatch, useSelector } from "react-redux";
import { cryptoActions } from "../../store/cryptoSlice";
import CryptoTable from "../../components/CryptoTable";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";

const Crypto = () => {
  const { currency, currentPage } = useSelector((state) => state.crypto);
  const [refresh, setRefresh] = useState(false);
  const [isRefreshDisabled, setIsRefreshDisabled] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency") || "USD";
    dispatch(cryptoActions.setCurrency(savedCurrency));
  }, [dispatch]);

  const cryptoData = useSelector((state) => state.crypto.cryptoData);

  const fetchData = useCallback(
    async (currency, page) => {
      try {
        const data = await fetchCryptocurrency(currency, page);
        dispatch(cryptoActions.setCryptoData(data.data));
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData(currency, (currentPage - 1) * 10 + 1);
  }, [currency, currentPage, fetchData]);

  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    localStorage.setItem("currency", selectedCurrency);
    dispatch(cryptoActions.setCurrency(selectedCurrency));
  };

  const handlePageChange = (newPage) => {
    dispatch(cryptoActions.setCurrentPage(newPage));
  };

  const handleRefreshClick = () => {
    setRefresh(!refresh);
    setIsRefreshDisabled(true);
    setTimeout(() => {
      setIsRefreshDisabled(false);
    }, 5000);
  };

  const slotProps = {
    popper: {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, -10],
          },
        },
      ],
    },
  };

  return (
    <div className="h-fit w-screen overflow-hidden background-1 select-none">
      <div className="flex justify-between mt-20">
        <select
          value={currency}
          onChange={handleCurrencyChange}
          className="text-black rounded-md p-[0.120rem] ml-2"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
        </select>
        <Tooltip title="Gap 10secs" placement="left" slotProps={slotProps}>
          <button
            onClick={handleRefreshClick}
            className={`py-1 px-2 font-Poppins font-bold bg-white rounded-lg active:scale-95 active:bg-slate-300 hover:bg-slate-100 ${
              isRefreshDisabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isRefreshDisabled}
          >
            Refresh!
          </button>
        </Tooltip>

        <Link to="/cryptoconverter" className="special_font active:scale-95">
          CONVERT CRYPTO
        </Link>
      </div>

      <div className="flex justify-center text-white overflow-scroll">
        <CryptoTable cryptoData={cryptoData} />
      </div>
      <div className="flex justify-around my-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md"
        >
          Prev
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Crypto;
