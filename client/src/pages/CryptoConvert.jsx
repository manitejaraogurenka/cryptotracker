import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import { fetchCryptoCoinsList } from "../utils/fetchCryptocurrency";
import axios from "axios";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { navbarActions } from "../store/navbarSlice";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#2d3748",
    color: "white",
    border: "1px solid #4a5568",
    borderRadius: "0.375rem",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#2b6cb0" : "#2d3748",
    color: "white",
  }),
};

const CryptoConvert = () => {
  const [coins, setCoins] = useState([]);
  const [fromCoin, setFromCoin] = useState("");
  const [toCoin, setToCoin] = useState("");
  const [fromCoinName, setFromCoinName] = useState("");
  const [toCoinName, setToCoinName] = useState("");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    document.title = "Converter-Crypto Tracker";
  }, []);

  useEffect(() => {
    fetchCryptoCoinsList()
      .then((data) => {
        setCoins(data.data);
      })
      .catch((error) => {
        console.error("Error fetching coins:", error);
      });
  }, []);

  const handleConvert = () => {
    if (!fromCoin || !toCoin) {
      setResult("Please select both 'From Coin' and 'To Coin'");
      return;
    }

    axios
      .get("/api/convert", {
        params: {
          fromCoin: fromCoin,
          toCoin: toCoin,
          amount: amount,
        },
      })
      .then((response) => {
        setResult(response.data.result);
      })
      .catch((error) => {
        console.error("Error converting cryptocurrency:", error);
        setResult("Error converting cryptocurrency. Please try again.");
      });
  };

  const handleFromCoinChange = (selectedOption) => {
    setFromCoin(selectedOption.value);
    setFromCoinName(selectedOption.label);
  };

  const handleToCoinChange = (selectedOption) => {
    setToCoin(selectedOption.value);
    setToCoinName(selectedOption.label);
  };

  const handleSearch = (inputValue) => {
    if (typeof inputValue !== "string") {
      return;
    }

    setInputValue(inputValue);
  };

  const filteredCoins = useMemo(() => {
    if (!coins) return [];
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [coins, inputValue]);

  return (
    <div className="flex items-center justify-center h-screen w-screen background-1">
      <div className=" absolute top-2 left-2 font-Orbitron w-fit flex items-center text-xl font-bold gap-1">
        <img src={Logo} alt="Logo" className="rounded-full w-14" />
        <span className="bg-opacity-0 bg-white bg-blur-lg backdrop-blur-md backdrop-filter p-2 rounded-full text-white">
          CRYPTO <br />
          TRACKER
        </span>
      </div>

      <Link
        to={"/"}
        className="bg-white p-1.5 rounded-2xl text-black  absolute top-4 right-3 font-Orbitron  text-2xl font-black active:scale-95"
        onClick={() => {
          navbarActions.dispatch("Home");
        }}
      >
        Back
      </Link>

      <section className="bg-gray-900 text-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold mb-6 text-center  font-Orbitron">
          Crypto Converter
        </h1>
        <div className="flex flex-col items-center justify-center md:flex-row gap-4 font-Poppins">
          <div className="flex flex-col w-full md:w-1/3">
            <label htmlFor="amount" className="text-lg">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-800 text-white rounded-lg p-2 border-[0.5px] border-blue-600"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/3">
            <label htmlFor="fromCoin" className="text-lg">
              From Coin
            </label>
            <Select
              id="fromCoin"
              value={{ value: fromCoin, label: fromCoin }}
              onChange={handleFromCoinChange}
              options={filteredCoins.map((coin) => ({
                value: coin.symbol,
                label: coin.name,
              }))}
              onInputChange={handleSearch}
              styles={customStyles}
            />
          </div>
          <div className="flex flex-col w-full md:w-1/3">
            <label htmlFor="toCoin" className="text-lg">
              To Coin
            </label>
            <Select
              id="toCoin"
              value={{ value: toCoin, label: toCoin }}
              onChange={handleToCoinChange}
              options={filteredCoins.map((coin) => ({
                value: coin.symbol,
                label: coin.name,
              }))}
              onInputChange={handleSearch}
              styles={customStyles}
            />
          </div>
        </div>
        <button
          onClick={handleConvert}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4 active:scale-95"
        >
          Convert
        </button>
        {result !== null && typeof result !== "string" && (
          <p className="mt-4 font-Poppins font-semibold text-white">
            {`${amount} ${fromCoinName} = ${result.toFixed(3)} ${toCoinName}`}
          </p>
        )}
        {result !== null && typeof result === "string" && (
          <p className="mt-4 ">{result}</p>
        )}
      </section>
    </div>
  );
};

export default CryptoConvert;
