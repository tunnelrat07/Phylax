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
export default function Header() {
  return (
    <>
      <header className="px-4 md:px-8 py-4 bg-gray-900 shadow-md">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-800">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold text-blue-300">Lending</h1>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
