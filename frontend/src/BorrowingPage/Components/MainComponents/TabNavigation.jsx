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
export default function TabNavigation({
  animateIn,
  setAnimateIn,
  activeTab,
  setActiveTab,
}) {
  return (
    <>
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
    </>
  );
}
