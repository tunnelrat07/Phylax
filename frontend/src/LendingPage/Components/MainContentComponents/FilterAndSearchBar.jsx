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
export default function FilterAndSearch() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="relative w-full md:w-64 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search assets..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
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
    </>
  );
}
