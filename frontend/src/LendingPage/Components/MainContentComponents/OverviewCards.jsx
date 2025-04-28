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
export default function Overview() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-blue-900 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-gray-400 font-medium">Total Value Supplied</h2>
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
          <div className="text-blue-400 text-sm mt-1">Across all positions</div>
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
    </>
  );
}
