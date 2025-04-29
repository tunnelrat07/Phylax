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
import { myBorrowingPositions, borrowingMarkets } from "../BorrowingPoolData";
import { getHealthFactorBadge } from "../getHealthFactorBadge";
export default function MainSection({
  activeTab,
  setActiveTab,
  animateIn,
  setAnimateIn,
}) {
  return (
    <>
      {activeTab === "available" ? (
        /* Available Borrowing Markets */
        <div
          className={`overflow-x-auto transition-all duration-500 delay-200 rounded-xl ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 border-b border-gray-800">
                <th className="pb-4 pl-4">Asset</th>
                <th className="pb-4">Borrow APR</th>
                <th className="pb-4 hidden md:table-cell">Collateral Factor</th>
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
                  <td className="py-4 hidden md:table-cell">{market.maxLTV}</td>
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
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
                        <p className="text-gray-400 text-sm">Borrowed Value</p>
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
    </>
  );
}
