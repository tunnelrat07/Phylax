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

export default function Overview({
  animateIn,
  setAnimateIn,
  showStatsAnimation,
  setShowStatsAnimation,
}) {
  return (
    <>
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
    </>
  );
}
