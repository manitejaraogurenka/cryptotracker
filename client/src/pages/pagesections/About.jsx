import React from "react";

const About = () => {
  return (
    <div className="h-full w-screen background-1 text-white p-8 pt-24 pb-20 font-Poppins">
      <div className="max-w-[95%] mx-auto bg-black p-4 glassy-bg">
        <h1 className="text-4xl font-bold mb-8">About Crypto Tracker</h1>
        <p className="text-lg mb-8 text-justify">
          Crypto Tracker is a sleek and powerful cryptocurrency tracking
          application that allows you to stay up-to-date with the latest prices,
          trends, and news in the world of cryptocurrencies. With a
          user-friendly interface and real-time analytics, Crypto Tracker makes
          it easy for you to monitor your favorite cryptocurrencies and stay
          informed about market movements.
        </p>
        <h2 className="text-2xl font-bold mb-4">Key Features</h2>
        <ul className="list-disc pl-6 mb-8">
          <li className="mb-2">
            Real-time price tracking for top cryptocurrencies
          </li>
          <li className="mb-2">Real-time analytics and market data</li>
          <li className="mb-2">
            Latest news and updates from the crypto market
          </li>
          <li className="mb-2">User-friendly interface for easy navigation</li>
        </ul>
        <p className="text-lg mb-8 text-justify">
          Whether you're a seasoned cryptocurrency enthusiast or just getting
          started, Crypto Tracker is the perfect tool to help you stay informed
          about the crypto market. Stay ahead of the curve with Crypto Tracker!
        </p>
      </div>
    </div>
  );
};

export default About;
