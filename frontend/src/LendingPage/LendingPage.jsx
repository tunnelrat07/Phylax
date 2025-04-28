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
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { lendingPools, myLendingPositions } from "./Components/LendingPoolData";
import { getRiskBadge } from "./Components/getRiskBadgeFunction";
import Main from "./Components/MainContent";
import Header from "./Components/Header";
import Navbar from "../SharedComponents/NavigationBar";
export function LendingPage() {
  const [activeTab, setActiveTab] = useState("available");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 text-gray-100">
      {/* Navigation Bar */}
      <Navbar />
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Main
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lendingPools={lendingPools}
        myLendingPositions={myLendingPositions}
      />
    </div>
  );
}
