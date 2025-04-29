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
import Overview from "./MainComponents/OverviewCards";
import TabNavigation from "./MainComponents/TabNavigation";
import FilterAndSearch from "./MainComponents/FilterAndSearch";
import Risk from "./MainComponents/Risk";
import MainSection from "./MainComponents/MainSection";
export default function Main({
  animateIn,
  setAnimateIn,
  showStatsAnimation,
  setShowStatsAnimation,
}) {
  return (
    <>
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Overview Cards */}
        <Overview
          animateIn={animateIn}
          setAnimateIn={setAnimateIn}
          showStatsAnimation={showStatsAnimation}
          setShowStatsAnimation={setShowStatsAnimation}
        />
        {/* Tab Navigation */}
        <TabNavigation animateIn={animateIn} setAnimateIn={setAnimateIn} />

        {/* Filter and Search Bar */}
        <Filter />

        {/* Main */}
        <MainSection
          animateIn={animateIn}
          setAnimateIn={setAnimateIn}
          showStatsAnimation={showStatsAnimation}
          setShowStatsAnimation={setShowStatsAnimation}
        />

        {/* Risk warning banner */}
        <Risk animateIn={animateIn} setAnimateIn={setAnimateIn} />
      </main>
    </>
  );
}
