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
export default function Header() {
  return (
    <>
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
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
