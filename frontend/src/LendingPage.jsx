import React, { useState } from "react";
import {
  DollarSign,
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
} from "lucide-react";

export function LendingPage() {
  const [activeTab, setActiveTab] = useState("available");

  // Sample lending pool data
  const lendingPools = [
    {
      name: "USDC",
      apy: "8.2%",
      totalSupply: "$45.3M",
      utilization: "76%",
      icon: "💲",
      riskLevel: "Low",
      insuranceCoverage: "92%",
    },
    {
      name: "ETH",
      apy: "5.4%",
      totalSupply: "$28.7M",
      utilization: "81%",
      icon: "🔷",
      riskLevel: "Medium",
      insuranceCoverage: "85%",
    },
    {
      name: "BTC",
      apy: "4.2%",
      totalSupply: "$32.1M",
      utilization: "68%",
      icon: "🔶",
      riskLevel: "Medium",
      insuranceCoverage: "80%",
    },
    {
      name: "DAI",
      apy: "7.8%",
      totalSupply: "$18.9M",
      utilization: "82%",
      icon: "🟡",
      riskLevel: "Low",
      insuranceCoverage: "95%",
    },
    {
      name: "LINK",
      apy: "9.1%",
      totalSupply: "$12.3M",
      utilization: "74%",
      icon: "🔗",
      riskLevel: "High",
      insuranceCoverage: "60%",
    },
  ];

  // Sample user lending positions
  const myLendingPositions = [
    {
      name: "USDC",
      amount: "5,000",
      value: "$5,002.45",
      apy: "8.2%",
      accrued: "$17.45",
      icon: "💲",
      insuranceCoverage: "Yes",
    },
    {
      name: "ETH",
      amount: "2.5",
      value: "$7,281.25",
      apy: "5.4%",
      accrued: "$21.32",
      icon: "🔷",
      insuranceCoverage: "Yes",
    },
  ];

  const getRiskBadge = (risk) => {
    switch (risk) {
      case "Low":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-blue-900 text-blue-200">
            Low Risk
          </span>
        );
      case "Medium":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-yellow-900 text-yellow-200">
            Medium Risk
          </span>
        );
      case "High":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-red-900 text-red-200">
            High Risk
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 text-gray-100">
      {/* Header */}
      <header className="px-4 md:px-8 py-4 bg-gray-900 shadow-md">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-800">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold text-blue-300">Lending</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center transition-all duration-300">
                <Wallet size={16} className="mr-2" />
                <span className="hidden md:inline">0x7A...3F5D</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-blue-900 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-gray-400 font-medium">
                Total Value Supplied
              </h2>
              <Info size={16} className="text-gray-500" />
            </div>
            <div className="text-2xl font-bold text-white">$12,283.70</div>
            <div className="text-green-400 text-sm flex items-center mt-1">
              <ArrowUpRight size={16} className="mr-1" />
              +2.4% last 24h
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-blue-900 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-gray-400 font-medium">Average APY</h2>
              <Info size={16} className="text-gray-500" />
            </div>
            <div className="text-2xl font-bold text-white">6.8%</div>
            <div className="text-blue-400 text-sm mt-1">
              Across all positions
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-blue-900 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-gray-400 font-medium">
                Total Accrued Interest
              </h2>
              <Info size={16} className="text-gray-500" />
            </div>
            <div className="text-2xl font-bold text-white">$38.77</div>
            <div className="text-green-400 text-sm flex items-center mt-1">
              <ArrowUpRight size={16} className="mr-1" />
              $1.26 today
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            className={`pb-4 px-4 font-medium ${
              activeTab === "available"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("available")}
          >
            Available Markets
          </button>
          <button
            className={`pb-4 px-4 font-medium ${
              activeTab === "my"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("my")}
          >
            My Lending Positions
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="relative w-full md:w-64 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search assets..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search
              size={18}
              className="absolute left-3 top-2.5 text-gray-500"
            />
          </div>

          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg flex items-center hover:bg-gray-700 transition-colors">
              <Filter size={16} className="mr-2" />
              Filters
            </button>
            <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg flex items-center hover:bg-gray-700 transition-colors">
              <BarChart2 size={16} className="mr-2" />
              Sort by: APY
              <ChevronDown size={16} className="ml-2" />
            </button>
          </div>
        </div>

        {activeTab === "available" ? (
          /* Available Lending Markets */
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 border-b border-gray-800">
                  <th className="pb-4 pl-4">Asset</th>
                  <th className="pb-4">APY</th>
                  <th className="pb-4 hidden md:table-cell">Risk Level</th>
                  <th className="pb-4 hidden md:table-cell">Total Supply</th>
                  <th className="pb-4 hidden md:table-cell">Utilization</th>
                  <th className="pb-4 hidden md:table-cell">Insurance</th>
                  <th className="pb-4 pr-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {lendingPools.map((pool, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-800 hover:bg-gray-800"
                  >
                    <td className="py-4 pl-4">
                      <div className="flex items-center">
                        <div className="text-2xl mr-3">{pool.icon}</div>
                        <div>{pool.name}</div>
                      </div>
                    </td>
                    <td className="py-4 text-green-400 font-medium">
                      {pool.apy}
                    </td>
                    <td className="py-4 hidden md:table-cell">
                      {getRiskBadge(pool.riskLevel)}
                    </td>
                    <td className="py-4 hidden md:table-cell">
                      {pool.totalSupply}
                    </td>
                    <td className="py-4 hidden md:table-cell">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: pool.utilization }}
                          ></div>
                        </div>
                        <span>{pool.utilization}</span>
                      </div>
                    </td>
                    <td className="py-4 hidden md:table-cell">
                      {pool.insuranceCoverage}
                    </td>
                    <td className="py-4 pr-4 text-right">
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
                        Lend
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* My Lending Positions */
          <div>
            {myLendingPositions.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {myLendingPositions.map((position, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-xl border border-blue-900 p-6 shadow-lg"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div className="flex items-center mb-4 md:mb-0">
                        <div className="text-2xl mr-3">{position.icon}</div>
                        <div>
                          <h3 className="font-bold">{position.name}</h3>
                          <p className="text-gray-400">
                            {position.amount} {position.name} supplied
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        <div>
                          <p className="text-gray-400 text-sm">
                            Position Value
                          </p>
                          <p className="font-medium">{position.value}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Current APY</p>
                          <p className="font-medium text-green-400">
                            {position.apy}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">
                            Accrued Interest
                          </p>
                          <p className="font-medium text-green-400">
                            {position.accrued}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Insurance</p>
                          <p className="font-medium text-blue-400">
                            {position.insuranceCoverage}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0 flex space-x-2">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
                          Withdraw
                        </button>
                        <button className="px-4 py-2 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-900 transition-colors">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl p-10 border border-blue-900 text-center">
                <AlertCircle size={48} className="mx-auto mb-4 text-gray-500" />
                <h3 className="text-xl font-medium mb-2">
                  No lending positions yet
                </h3>
                <p className="text-gray-400 mb-6">
                  Start by supplying assets to earn interest on your crypto
                </p>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors mx-auto flex items-center">
                  View available markets
                  <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
