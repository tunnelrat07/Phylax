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
export default function Risk({ animateIn, setAnimateIn }) {
  return (
    <>
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
              Borrowing assets carries risk of liquidation. Ensure you maintain
              a healthy collateral ratio and monitor market conditions
              regularly.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
