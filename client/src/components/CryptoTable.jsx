import React, { useEffect, useState } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import styles from "../styles/CryptoTable.module.css";
import Tooltip from "@mui/material/Tooltip";

const currencySymbols = {
  USD: "$",
  EUR: "€",
  INR: "₹",
};

const CryptoTable = ({ cryptoData }) => {
  const { currency, currentPage } = useSelector((state) => state.crypto);
  const currencySymbol = currencySymbols[currency] || currency;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth >= 650);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let percentage_changes = [
    "percent_change_1h",
    "percent_change_24h",
    "percent_change_7d",
    "percent_change_30d",
    "percent_change_60d",
  ];

  if (!isSmallScreen) {
    percentage_changes = percentage_changes.filter(
      (key) =>
        ![
          "percent_change_1h",
          "percent_change_30d",
          "percent_change_60d",
        ].includes(key)
    );
  }

  const getValue = (crypto, key) => {
    switch (key) {
      case "name":
        return crypto.name;
      case "price":
        return crypto.quote[currency]?.price;
      default:
        return crypto.quote[currency]?.[key];
    }
  };

  const sortedData = [...cryptoData].sort((a, b) => {
    if (sortConfig.key) {
      const valueA = getValue(a, sortConfig.key);
      const valueB = getValue(b, sortConfig.key);

      if (sortConfig.direction === "ascending") {
        return valueA < valueB ? -1 : 1;
      } else {
        return valueA > valueB ? -1 : 1;
      }
    }
    return 0;
  });

  const requestSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <FaCaretUp />
    ) : (
      <FaCaretDown />
    );
  };

  const slotProps = {
    popper: {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, -25],
          },
        },
      ],
    },
  };

  return (
    <table className={`${styles.table}`} aria-label="Cryptocurrency Data Table">
      <thead className={`${styles.stickyHead}`}>
        <tr>
          <th scope="col">No.</th>
          <Tooltip title="Sort" placement="top" slotProps={slotProps}>
            <th
              scope="col"
              onClick={() => requestSort("name")}
              className="cursor-pointer"
            >
              Name
              {renderSortIcon("name")}
            </th>
          </Tooltip>
          <Tooltip title="Sort" placement="top" slotProps={slotProps}>
            <th
              scope="col"
              onClick={() => requestSort("price")}
              className="cursor-pointer"
            >
              Price
              {renderSortIcon("price")}
            </th>
          </Tooltip>

          {isSmallScreen && (
            <Tooltip
              title="Sort"
              placement="left"
              slotProps={{
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
              }}
            >
              <th
                scope="col"
                onClick={() => requestSort("percent_change_1h")}
                className="cursor-pointer"
              >
                1h %{renderSortIcon("percent_change_1h")}
              </th>
            </Tooltip>
          )}
          <Tooltip title="Sort" placement="top" slotProps={slotProps}>
            <th
              scope="col"
              onClick={() => requestSort("percent_change_24h")}
              className="cursor-pointer"
            >
              24h %{renderSortIcon("percent_change_24h")}
            </th>
          </Tooltip>
          <Tooltip title="Sort" placement="top" slotProps={slotProps}>
            <th
              scope="col"
              onClick={() => requestSort("percent_change_7d")}
              className="cursor-pointer"
            >
              7d %{renderSortIcon("percent_change_7d")}
            </th>
          </Tooltip>

          {isSmallScreen && (
            <Tooltip title="Sort" placement="top" slotProps={slotProps}>
              <th
                scope="col"
                onClick={() => requestSort("percent_change_30d")}
                className="cursor-pointer"
              >
                30d %{renderSortIcon("percent_change_30d")}
              </th>
            </Tooltip>
          )}
          {isSmallScreen && (
            <Tooltip title="Sort" placement="bottom" slotProps={slotProps}>
              <th
                scope="col"
                onClick={() => requestSort("percent_change_60d")}
                className="cursor-pointer"
              >
                60d %{renderSortIcon("percent_change_60d")}
              </th>
            </Tooltip>
          )}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((crypto, index) => (
          <tr key={index}>
            <td style={{ textAlign: "center" }}>
              {index + 1 + (currentPage - 1) * 10}
            </td>
            <td className="flex gap-1 items-center">
              <img
                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
                alt={`${crypto.name} Logo`}
                className="w-7 h-7 rounded-full"
              />
              {crypto.name}
            </td>
            <td>
              {crypto.quote[currency]?.price !== undefined &&
              !isNaN(crypto.quote[currency]?.price) ? (
                <>
                  {currencySymbol}
                  {crypto.quote[currency]?.price?.toFixed(2)}
                </>
              ) : (
                "Loading"
              )}
            </td>
            {percentage_changes.map((key) => (
              <td key={key} className="">
                {crypto.quote[currency]?.[key] === undefined ||
                isNaN(crypto.quote[currency]?.[key]) ? (
                  "Loading"
                ) : crypto.quote[currency]?.[key] >= 0 ? (
                  <span className="flex gap-1 items-center text-green-400">
                    <FaCaretUp size={10} />
                    {crypto.quote[currency]?.[key].toFixed(2)}%
                  </span>
                ) : (
                  <span className="flex gap-1 items-center text-red-500">
                    <FaCaretDown size={10} />
                    {Math.abs(crypto.quote[currency]?.[key]).toFixed(2)}%
                  </span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CryptoTable;
