import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Filter,
  ArrowRight,
  ArrowUpRight,
  BarChart2,
  Info,
  AlertCircle,
  Wallet,
  Search,
  ArrowLeft,
  AlertTriangle,
  TrendingUp,
  Shield,
  Lock,
} from "lucide-react";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
export function BorrowingPage() {
  const [activeTab, setActiveTab] = useState("available");
  const [animateIn, setAnimateIn] = useState(false);
  const [hoveredMarket, setHoveredMarket] = useState(null);
  const [showStatsAnimation, setShowStatsAnimation] = useState(false);

  // Trigger animations on mount
  useEffect(() => {
    setAnimateIn(true);
    setTimeout(() => setShowStatsAnimation(true), 300);
  }, []);

  // Sample borrowing markets data
  const borrowingMarkets = [
    {
      name: "USDC",
      borrowRate: "11.2%",
      totalBorrowed: "$32.1M",
      liquidity: "$13.2M",
      liquidityPercentage: "29%",
      icon: "💲",
      collateralFactor: "85%",
      maxLTV: "80%",
    },
    {
      name: "ETH",
      borrowRate: "8.4%",
      totalBorrowed: "$18.5M",
      liquidity: "$10.2M",
      liquidityPercentage: "35%",
      icon: "🔷",
      collateralFactor: "75%",
      maxLTV: "70%",
    },
    {
      name: "BTC",
      borrowRate: "7.9%",
      totalBorrowed: "$24.6M",
      liquidity: "$7.5M",
      liquidityPercentage: "23%",
      icon: "🔶",
      collateralFactor: "70%",
      maxLTV: "65%",
    },
    {
      name: "DAI",
      borrowRate: "10.5%",
      totalBorrowed: "$14.3M",
      liquidity: "$4.6M",
      liquidityPercentage: "24%",
      icon: "🟡",
      collateralFactor: "85%",
      maxLTV: "80%",
    },
    {
      name: "LINK",
      borrowRate: "12.3%",
      totalBorrowed: "$8.1M",
      liquidity: "$4.2M",
      liquidityPercentage: "34%",
      icon: "🔗",
      collateralFactor: "65%",
      maxLTV: "60%",
    },
  ];

  // Sample user borrowing positions
  const myBorrowingPositions = [
    {
      name: "ETH",
      borrowedAmount: "1.5",
      value: "$4,368.75",
      borrowRate: "8.4%",
      accrued: "$12.89",
      icon: "🔷",
      healthFactor: "1.82",
      collateral: "USDC",
      collateralAmount: "$8,000",
    },
    {
      name: "DAI",
      borrowedAmount: "3,200",
      value: "$3,206.40",
      borrowRate: "10.5%",
      accrued: "$9.73",
      icon: "🟡",
      healthFactor: "2.14",
      collateral: "ETH",
      collateralAmount: "2.35 ETH ($6,862.50)",
    },
  ];

  const getHealthFactorBadge = (factor) => {
    const factorNum = parseFloat(factor);
    if (factorNum >= 2) {
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-green-900 text-green-200 flex items-center">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
          Safe
        </span>
      );
    } else if (factorNum >= 1.5) {
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-blue-900 text-blue-200 flex items-center">
          <span className="w-2 h-2 bg-blue-400 rounded-full mr-1 animate-pulse"></span>
          Good
        </span>
      );
    } else if (factorNum >= 1.2) {
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-yellow-900 text-yellow-200 flex items-center">
          <span className="w-2 h-2 bg-yellow-400 rounded-full mr-1 animate-pulse"></span>
          Moderate
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-red-900 text-red-200 flex items-center">
          <span className="w-2 h-2 bg-red-400 rounded-full mr-1 animate-pulse"></span>
          At Risk
        </span>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 text-gray-100 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-64 h-64 rounded-full bg-blue-900/20 blur-3xl -top-20 -left-20 animate-blob"></div>
        <div className="absolute w-96 h-96 rounded-full bg-blue-800/10 blur-3xl top-1/3 right-1/4 animate-blob animation-delay-2000"></div>
        <div className="absolute w-80 h-80 rounded-full bg-blue-700/10 blur-3xl bottom-10 right-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="px-4 md:px-8 py-4 bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-800/50 sticky top-0 z-40 transition-all duration-300">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-blue-900/50 transition-colors duration-300 group">
                <ArrowLeft
                  size={20}
                  className="group-hover:translate-x-[-2px] transition-all duration-300"
                />
              </button>
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                Borrowing
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center transition-all duration-300 group shadow-lg shadow-blue-900/20 hover:shadow-blue-800/40">
                <Wallet
                  size={16}
                  className="mr-2 group-hover:scale-110 transition-all duration-300"
                />
                <span className="hidden md:inline">0x7A...3F5D</span>
              </button> */}
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Overview Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 transition-all duration-500 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-blue-900/50 shadow-lg hover:shadow-blue-900/30 transition-all duration-300 hover:scale-[1.01] group">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-gray-400 font-medium">Total Borrowed</h2>
              <Info
                size={16}
                className="text-gray-500 group-hover:text-blue-400 transition-colors duration-300"
              />
            </div>
            <div
              className={`text-2xl font-bold text-white transition-all duration-700 ${
                showStatsAnimation ? "opacity-100" : "opacity-0"
              }`}
            >
              $7,575.15
            </div>
            <div className="text-red-400 text-sm flex items-center mt-1 group-hover:translate-x-1 transition-all duration-300">
              <TrendingUp size={16} className="mr-1" />
              +$22.62 last 24h
            </div>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-blue-900/50 shadow-lg hover:shadow-blue-900/30 transition-all duration-300 hover:scale-[1.01] group">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-gray-400 font-medium">Net Collateral</h2>
              <Info
                size={16}
                className="text-gray-500 group-hover:text-blue-400 transition-colors duration-300"
              />
            </div>
            <div
              className={`text-2xl font-bold text-white transition-all duration-700 delay-100 ${
                showStatsAnimation ? "opacity-100" : "opacity-0"
              }`}
            >
              $14,862.50
            </div>
            <div className="text-blue-400 text-sm flex items-center mt-1 group-hover:translate-x-1 transition-all duration-300">
              <Shield size={16} className="mr-1" />
              196% coverage ratio
            </div>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-blue-900/50 shadow-lg hover:shadow-blue-900/30 transition-all duration-300 hover:scale-[1.01] group">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-gray-400 font-medium">Health Factor</h2>
              <Info
                size={16}
                className="text-gray-500 group-hover:text-blue-400 transition-colors duration-300"
              />
            </div>
            <div
              className={`text-2xl font-bold text-white transition-all duration-700 delay-200 ${
                showStatsAnimation ? "opacity-100" : "opacity-0"
              }`}
            >
              1.96
            </div>
            <div className="text-green-400 text-sm flex items-center mt-1 group-hover:translate-x-1 transition-all duration-300">
              <Lock size={16} className="mr-1" />
              Good health status
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          className={`flex border-b border-gray-700 mb-6 transition-all duration-500 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            className={`pb-4 px-4 font-medium relative transition-all duration-300 ${
              activeTab === "available"
                ? "text-blue-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("available")}
          >
            Available Markets
            {activeTab === "available" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full animate-pulse"></span>
            )}
          </button>
          <button
            className={`pb-4 px-4 font-medium relative transition-all duration-300 ${
              activeTab === "my"
                ? "text-blue-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("my")}
          >
            My Borrowing Positions
            {activeTab === "my" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full animate-pulse"></span>
            )}
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div
          className={`flex flex-col md:flex-row justify-between items-center mb-6 transition-all duration-500 delay-100 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative w-full md:w-64 mb-4 md:mb-0 group">
            <input
              type="text"
              placeholder="Search assets..."
              className="w-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
            <Search
              size={18}
              className="absolute left-3 top-2.5 text-gray-500 group-focus-within:text-blue-400 transition-colors duration-300"
            />
          </div>

          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg flex items-center hover:bg-gray-700 hover:border-blue-800 transition-all duration-300 group">
              <Filter
                size={16}
                className="mr-2 group-hover:rotate-12 transition-transform duration-300"
              />
              Filters
            </button>
            <button className="px-4 py-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg flex items-center hover:bg-gray-700 hover:border-blue-800 transition-all duration-300 group">
              <BarChart2
                size={16}
                className="mr-2 group-hover:scale-110 transition-transform duration-300"
              />
              Sort by: Interest Rate
              <ChevronDown
                size={16}
                className="ml-2 group-hover:translate-y-0.5 transition-transform duration-300"
              />
            </button>
          </div>
        </div>

        {activeTab === "available" ? (
          /* Available Borrowing Markets */
          <div
            className={`overflow-x-auto transition-all duration-500 delay-200 rounded-xl ${
              animateIn
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 border-b border-gray-800">
                  <th className="pb-4 pl-4">Asset</th>
                  <th className="pb-4">Borrow APR</th>
                  <th className="pb-4 hidden md:table-cell">
                    Collateral Factor
                  </th>
                  <th className="pb-4 hidden md:table-cell">Liquidity</th>
                  <th className="pb-4 hidden md:table-cell">Max LTV</th>
                  <th className="pb-4 pr-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {borrowingMarkets.map((market, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-800 transition-colors duration-300 ${
                      hoveredMarket === index
                        ? "bg-gray-800/80"
                        : "hover:bg-gray-800/50"
                    }`}
                    onMouseEnter={() => setHoveredMarket(index)}
                    onMouseLeave={() => setHoveredMarket(null)}
                  >
                    <td className="py-4 pl-4">
                      <div className="flex items-center">
                        <div
                          className={`text-2xl mr-3 transition-transform duration-300 ${
                            hoveredMarket === index ? "scale-125" : ""
                          }`}
                        >
                          {market.icon}
                        </div>
                        <div>{market.name}</div>
                      </div>
                    </td>
                    <td className="py-4 text-red-400 font-medium">
                      {market.borrowRate}
                    </td>
                    <td className="py-4 hidden md:table-cell">
                      {market.collateralFactor}
                    </td>
                    <td className="py-4 hidden md:table-cell">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-700 rounded-full h-2 mr-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full transition-all duration-700"
                            style={{
                              width:
                                hoveredMarket === index
                                  ? "100%"
                                  : market.liquidityPercentage,
                            }}
                          ></div>
                        </div>
                        <span>{market.liquidity}</span>
                      </div>
                    </td>
                    <td className="py-4 hidden md:table-cell">
                      {market.maxLTV}
                    </td>
                    <td className="py-4 pr-4 text-right">
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/30 group">
                        <span className="flex items-center">
                          Borrow
                          <ArrowRight
                            size={14}
                            className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                          />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* My Borrowing Positions */
          <div
            className={`transition-all duration-500 delay-200 ${
              animateIn
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {myBorrowingPositions.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {myBorrowingPositions.map((position, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-blue-900/50 p-6 shadow-lg hover:shadow-blue-900/20 transition-all duration-300 hover:scale-[1.01] group"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div className="flex items-center mb-4 md:mb-0">
                        <div className="text-2xl mr-3 group-hover:scale-125 transition-transform duration-300">
                          {position.icon}
                        </div>
                        <div>
                          <h3 className="font-bold">{position.name}</h3>
                          <p className="text-gray-400">
                            {position.borrowedAmount} {position.name} borrowed
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        <div className="group-hover:translate-y-[-2px] transition-all duration-300">
                          <p className="text-gray-400 text-sm">
                            Borrowed Value
                          </p>
                          <p className="font-medium">{position.value}</p>
                        </div>
                        <div className="group-hover:translate-y-[-2px] transition-all duration-300 delay-75">
                          <p className="text-gray-400 text-sm">Interest Rate</p>
                          <p className="font-medium text-red-400">
                            {position.borrowRate}
                          </p>
                        </div>
                        <div className="group-hover:translate-y-[-2px] transition-all duration-300 delay-150">
                          <p className="text-gray-400 text-sm">
                            Accrued Interest
                          </p>
                          <p className="font-medium text-red-400">
                            {position.accrued}
                          </p>
                        </div>
                        <div className="group-hover:translate-y-[-2px] transition-all duration-300 delay-200">
                          <p className="text-gray-400 text-sm">Health Factor</p>
                          <div className="font-medium flex items-center">
                            {position.healthFactor}
                            <span className="ml-2">
                              {getHealthFactorBadge(position.healthFactor)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0 flex space-x-2">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/30 group">
                          <span className="flex items-center">
                            Repay
                            <ArrowRight
                              size={14}
                              className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                            />
                          </span>
                        </button>
                        <button className="px-4 py-2 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-900/50 transition-all duration-300 group">
                          <span className="flex items-center">
                            Manage
                            <ArrowRight
                              size={14}
                              className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                            />
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Collateral information */}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-center">
                          <Shield size={16} className="text-blue-400 mr-2" />
                          <span className="text-gray-400 text-sm">
                            Collateralized by:
                          </span>
                          <span className="ml-2">
                            {position.collateralAmount}
                          </span>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors duration-300 flex items-center">
                            Manage collateral
                            <ArrowRight size={12} className="ml-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-10 border border-blue-900/50 text-center shadow-lg hover:shadow-blue-900/20 transition-all duration-300 transform hover:scale-[1.01]">
                <AlertCircle
                  size={48}
                  className="mx-auto mb-4 text-gray-500 animate-pulse"
                />
                <h3 className="text-xl font-medium mb-2">
                  No borrowing positions yet
                </h3>
                <p className="text-gray-400 mb-6">
                  Start by borrowing against your supplied collateral
                </p>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-300 mx-auto flex items-center group hover:shadow-lg hover:shadow-blue-900/30">
                  View available markets
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    size={16}
                  />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Risk warning banner */}
        <div
          className={`mt-8 bg-red-900/30 backdrop-blur-sm rounded-xl p-4 border border-red-800/50 transition-all duration-500 delay-300 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle
              size={20}
              className="text-red-400 mt-1 animate-pulse"
            />
            <div>
              <h3 className="font-medium text-red-300">Risk Warning</h3>
              <p className="text-gray-300 text-sm mt-1">
                Borrowing assets carries risk of liquidation. Ensure you
                maintain a healthy collateral ratio and monitor market
                conditions regularly.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Add a subtle animated footer */}
      <footer className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
        <p className="opacity-50">
          Market rates updated every 15 seconds · Oracle-powered pricing ·
          Enterprise-grade security
        </p>
      </footer>
    </div>
  );
}

// Add this to your CSS to enable the blob animation
// You can include this in your global styles or component styles
// This simulates the animation-delay classes for the blobs
/*
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
*/
