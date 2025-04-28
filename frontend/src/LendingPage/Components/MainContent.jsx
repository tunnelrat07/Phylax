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
import { getRiskBadge } from "../Components/getRiskBadgeFunction";
import Tabnav from "./MainContentComponents/TabNavigation";
import Overview from "./MainContentComponents/OverviewCards";
import FilterAndSearch from "./MainContentComponents/FilterAndSearchBar";
import MainContent from "./MainContentComponents/MainContent";
import Footer from "../../SharedComponents/Footer";
export default function Main({
  setActiveTab,
  activeTab,
  lendingPools,
  myLendingPositions,
}) {
  return (
    <>
      <main className="container mx-auto px-4 py-8">
        {/* Overview Cards */}
        <Overview />
        {/* Tab Navigation */}
        <Tabnav activeTab={activeTab} setActiveTab={setActiveTab} />
        {/* Filter and Search Bar */}
        <FilterAndSearch />

        {/* Main Content */}
        <MainContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          lendingPools={lendingPools}
          myLendingPositions={myLendingPositions}
        />
      </main>
      <Footer />
    </>
  );
}
