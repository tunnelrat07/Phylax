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
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import {
  borrowingMarkets,
  myBorrowingPositions,
} from "./Components/BorrowingPoolData";
import { getHealthFactorBadge } from "./Components/getHealthFactorBadge";
import Animated from "./Components/Animated";
import Header from "./Components/Header";
import Navbar from "../SharedComponents/NavigationBar";
import Main from "./Components/Main";
import BorrowingFooter from "./Components/BorrowingFooter";
import Footer from "../SharedComponents/Footer";
export function BorrowingPage() {
  const [activeTab, setActiveTab] = useState("available");
  const [animateIn, setAnimateIn] = useState(false);
  const [hoveredMarket, setHoveredMarket] = useState(null);
  const [showStatsAnimation, setShowStatsAnimation] = useState(false);

  // Trigger animations on mount
  useEffect(() => {
    setAnimateIn(true);
    setTimeout(() => setShowStatsAnimation(true), 300);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 text-gray-100 overflow-hidden">
        {/* Navigation Bar */}
        <Navbar />

        {/* Header */}
        <Header />

        {/* Animated background elements */}
        <Animated />

        {/* Main Content */}
        <Main
          animateIn={animateIn}
          setAnimateIn={setAnimateIn}
          showStatsAnimation={showStatsAnimation}
          setShowStatsAnimation={setShowStatsAnimation}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {/* Add a subtle animated footer */}
        <BorrowingFooter />

        <Footer />
      </div>
    </>
  );
}
