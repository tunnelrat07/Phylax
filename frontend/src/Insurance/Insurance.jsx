import React, { useState, useEffect } from "react";
import {
  Shield,
  Search,
  Filter,
  AlertCircle,
  Plus,
  DollarSign,
  Percent,
  Calendar,
  ArrowRight,
  Info,
  ChevronDown,
  CheckCircle,
  Wallet,
  Menu,
  X,
} from "lucide-react";
import { BsDropletHalf } from "react-icons/bs";

export function InsuranceMarketplace() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("marketplace");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState("all");

  // Mock data for available insurance opportunities
  const insuranceOpportunities = [
    {
      id: 1,
      loanId: "LOAN-4582",
      borrower: "0x7Fc6...8dE3",
      loanAmount: "125,000 USDC",
      collateral: "150 ETH",
      duration: "90 days",
      premium: "3.5%",
      riskLevel: "low",
      collateralRatio: "150%",
      coverage: "80%",
      premiumTotal: "4,375 USDC",
      borrowerRating: "A+",
    },
    {
      id: 2,
      loanId: "LOAN-6723",
      borrower: "0x3Ab2...5fC1",
      loanAmount: "75,000 USDC",
      collateral: "2.5 BTC",
      duration: "60 days",
      premium: "5.2%",
      riskLevel: "medium",
      collateralRatio: "130%",
      coverage: "75%",
      premiumTotal: "3,900 USDC",
      borrowerRating: "B",
    },
    {
      id: 3,
      loanId: "LOAN-9124",
      borrower: "0x5Dd4...2aB7",
      loanAmount: "250,000 USDC",
      collateral: "8,500 SOL",
      duration: "120 days",
      premium: "7.8%",
      riskLevel: "high",
      collateralRatio: "115%",
      coverage: "90%",
      premiumTotal: "19,500 USDC",
      borrowerRating: "C+",
    },
    {
      id: 4,
      loanId: "LOAN-2391",
      borrower: "0x9Ff3...7cB2",
      loanAmount: "50,000 DAI",
      collateral: "45 ETH",
      duration: "30 days",
      premium: "2.4%",
      riskLevel: "low",
      collateralRatio: "180%",
      coverage: "65%",
      premiumTotal: "1,200 DAI",
      borrowerRating: "A",
    },
  ];

  // Mock data for active insurance products user is providing
  const activeInsurances = [
    {
      id: 101,
      loanId: "LOAN-3257",
      borrower: "0x2Bc8...4fA9",
      loanAmount: "100,000 USDC",
      premium: "4.2%",
      premiumEarned: "2,100 USDC",
      startDate: "Feb 12, 2025",
      endDate: "May 12, 2025",
      status: "active",
      coverage: "85%",
      riskLevel: "medium",
    },
    {
      id: 102,
      loanId: "LOAN-5981",
      borrower: "0x6Ea5...3cD4",
      loanAmount: "35,000 DAI",
      premium: "3.1%",
      premiumEarned: "1,085 DAI",
      startDate: "Jan 25, 2025",
      endDate: "Mar 25, 2025",
      status: "active",
      coverage: "70%",
      riskLevel: "low",
    },
  ];

  // Filter opportunities based on selected risk level
  const filteredOpportunities =
    selectedRisk === "all"
      ? insuranceOpportunities
      : insuranceOpportunities.filter((opp) => opp.riskLevel === selectedRisk);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getRiskBadgeColor = (risk) => {
    switch (risk) {
      case "low":
        return "bg-green-600 text-green-100";
      case "medium":
        return "bg-yellow-600 text-yellow-100";
      case "high":
        return "bg-red-600 text-red-100";
      default:
        return "bg-blue-600 text-blue-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 text-gray-100">
      {/* Navigation Bar */}
      <nav className="px-4 md:px-8 py-8 flex justify-between items-center bg-gray-900 bg-opacity-80 backdrop-blur-sm mx-10">
        <a href="/">
          <div className="flex items-center">
            <BsDropletHalf className="text-blue-400 mr-2" size={34} />
            <span className="font-bold text-xl md:text-2xl text-blue-300">
              Phylax
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#"
            className="text-gray-300 hover:text-blue-300 transition-colors duration-300"
          >
            Markets
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-blue-300 transition-colors duration-300"
          >
            Products
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-blue-300 transition-colors duration-300"
          >
            Company
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-blue-300 transition-colors duration-300"
          >
            Resources
          </a>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full flex items-center transition-all duration-300 transform hover:scale-105">
            <Wallet size={18} className="mr-2" />
            Connect Wallet
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 bg-opacity-95 absolute top-16 left-0 right-0 z-50 py-4 px-6 flex flex-col space-y-4 backdrop-blur-sm shadow-lg">
          <a
            href="#"
            className="py-2 text-gray-300 hover:text-blue-300 transition-colors duration-300"
          >
            Markets
          </a>
          <a
            href="#"
            className="py-2 text-gray-300 hover:text-blue-300 transition-colors duration-300"
          >
            Products
          </a>
          <a
            href="#"
            className="py-2 text-gray-300 hover:text-blue-300 transition-colors duration-300"
          >
            Company
          </a>
          <a
            href="#"
            className="py-2 text-gray-300 hover:text-blue-300 transition-colors duration-300"
          >
            Resources
          </a>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full flex items-center justify-center">
            <Wallet size={18} className="mr-2" />
            Connect Wallet
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="container mx-auto px-4 pt-12 md:pt-16 pb-8">
        <div
          className={`transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-200">
            Insurance Provider Dashboard
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Provide coverage for loans, earn premiums, and manage your insurance
            portfolio
          </p>

          {/* Dashboard Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm p-4 rounded-xl border border-blue-900 shadow-lg">
              <div className="text-sm text-gray-400 mb-1">
                Total Insurance Provided
              </div>
              <div className="text-2xl font-bold text-blue-300">
                135,000 USDC
              </div>
            </div>
            <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm p-4 rounded-xl border border-blue-900 shadow-lg">
              <div className="text-sm text-gray-400 mb-1">Active Policies</div>
              <div className="text-2xl font-bold text-blue-300">2</div>
            </div>
            <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm p-4 rounded-xl border border-blue-900 shadow-lg">
              <div className="text-sm text-gray-400 mb-1">Premium Revenue</div>
              <div className="text-2xl font-bold text-blue-300">3,185 USDC</div>
            </div>
            <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm p-4 rounded-xl border border-blue-900 shadow-lg">
              <div className="text-sm text-gray-400 mb-1">Provider Rating</div>
              <div className="text-2xl font-bold text-blue-300">A-</div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-700 mb-6">
            <button
              className={`py-3 px-5 font-medium ${
                activeTab === "marketplace"
                  ? "text-blue-300 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => setActiveTab("marketplace")}
            >
              Insurance Marketplace
            </button>
            <button
              className={`py-3 px-5 font-medium ${
                activeTab === "active"
                  ? "text-blue-300 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => setActiveTab("active")}
            >
              My Active Policies
            </button>
            <button
              className={`py-3 px-5 font-medium ${
                activeTab === "analytics"
                  ? "text-blue-300 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        {activeTab === "marketplace" && (
          <div>
            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="relative w-full md:w-1/2">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search loans by ID, borrower, or amount"
                  className="w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-gray-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative">
                  <button
                    className="flex items-center bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg py-2 px-4 text-gray-200 hover:border-gray-500 transition-colors"
                    onClick={() => setFilterOpen(!filterOpen)}
                  >
                    <Filter size={18} className="mr-2" />
                    Filter by Risk
                    <ChevronDown size={16} className="ml-2" />
                  </button>

                  {filterOpen && (
                    <div className="absolute top-full mt-2 right-0 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                      <div className="p-2">
                        <button
                          className={`w-full text-left px-3 py-2 rounded ${
                            selectedRisk === "all"
                              ? "bg-blue-900 text-blue-200"
                              : "hover:bg-gray-700"
                          }`}
                          onClick={() => {
                            setSelectedRisk("all");
                            setFilterOpen(false);
                          }}
                        >
                          All Risks
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded ${
                            selectedRisk === "low"
                              ? "bg-blue-900 text-blue-200"
                              : "hover:bg-gray-700"
                          }`}
                          onClick={() => {
                            setSelectedRisk("low");
                            setFilterOpen(false);
                          }}
                        >
                          Low Risk
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded ${
                            selectedRisk === "medium"
                              ? "bg-blue-900 text-blue-200"
                              : "hover:bg-gray-700"
                          }`}
                          onClick={() => {
                            setSelectedRisk("medium");
                            setFilterOpen(false);
                          }}
                        >
                          Medium Risk
                        </button>
                        <button
                          className={`w-full text-left px-3 py-2 rounded ${
                            selectedRisk === "high"
                              ? "bg-blue-900 text-blue-200"
                              : "hover:bg-gray-700"
                          }`}
                          onClick={() => {
                            setSelectedRisk("high");
                            setFilterOpen(false);
                          }}
                        >
                          High Risk
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  className="flex items-center bg-blue-600 hover:bg-blue-500 text-white transition-colors duration-300 py-2 px-4 rounded-lg font-medium"
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus size={18} className="mr-2" />
                  Create Insurance
                </button>
              </div>
            </div>

            {/* Insurance Opportunities */}
            <div className="space-y-4">
              {filteredOpportunities.map((opportunity) => (
                <div
                  key={opportunity.id}
                  className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-xl border border-blue-900 shadow-lg overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-blue-200">
                            {opportunity.loanId}
                          </h3>
                          <span
                            className={`text-xs font-medium py-1 px-2 rounded-full ${getRiskBadgeColor(
                              opportunity.riskLevel
                            )}`}
                          >
                            {opportunity.riskLevel.charAt(0).toUpperCase() +
                              opportunity.riskLevel.slice(1)}{" "}
                            Risk
                          </span>
                          <span className="text-sm bg-gray-700 text-gray-300 py-1 px-2 rounded-full">
                            Borrower Rating: {opportunity.borrowerRating}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          Borrower: {opportunity.borrower}
                        </p>
                      </div>
                      <div className="flex flex-col md:items-end mt-3 md:mt-0">
                        <div className="text-xl font-bold text-blue-300">
                          {opportunity.loanAmount}
                        </div>
                        <div className="text-gray-400 text-sm">
                          Collateral: {opportunity.collateral} (
                          {opportunity.collateralRatio})
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-4">
                      <div>
                        <div className="text-gray-400 text-sm">Duration</div>
                        <div className="font-medium">
                          {opportunity.duration}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Premium</div>
                        <div className="font-medium text-green-400">
                          {opportunity.premium}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Coverage</div>
                        <div className="font-medium">
                          {opportunity.coverage}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">
                          Total Premium
                        </div>
                        <div className="font-medium text-green-400">
                          {opportunity.premiumTotal}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                      <button className="flex items-center text-blue-400 hover:text-blue-300">
                        <Info size={16} className="mr-1" />
                        View Loan Details
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-300 font-medium">
                        Provide Insurance
                        <ArrowRight size={16} className="ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "active" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-200 mb-4">
                Your Active Insurance Policies
              </h2>
              <p className="text-gray-300">
                Manage the loan insurance policies you are currently providing
              </p>
            </div>

            {/* Active Insurance Policies */}
            <div className="space-y-4">
              {activeInsurances.map((insurance) => (
                <div
                  key={insurance.id}
                  className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-xl border border-blue-900 shadow-lg overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-blue-200">
                            {insurance.loanId}
                          </h3>
                          <span className="text-xs font-medium py-1 px-2 rounded-full bg-green-600 text-green-100">
                            <CheckCircle size={12} className="inline mr-1" />
                            Active
                          </span>
                          <span
                            className={`text-xs font-medium py-1 px-2 rounded-full ${getRiskBadgeColor(
                              insurance.riskLevel
                            )}`}
                          >
                            {insurance.riskLevel.charAt(0).toUpperCase() +
                              insurance.riskLevel.slice(1)}{" "}
                            Risk
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          Borrower: {insurance.borrower}
                        </p>
                      </div>
                      <div className="flex flex-col md:items-end mt-3 md:mt-0">
                        <div className="text-xl font-bold text-blue-300">
                          {insurance.loanAmount}
                        </div>
                        <div className="text-green-400 text-sm">
                          Premium Earned: {insurance.premiumEarned}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-4">
                      <div>
                        <div className="text-gray-400 text-sm">Coverage</div>
                        <div className="font-medium">{insurance.coverage}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">
                          Premium Rate
                        </div>
                        <div className="font-medium text-green-400">
                          {insurance.premium}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Start Date</div>
                        <div className="font-medium">{insurance.startDate}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">End Date</div>
                        <div className="font-medium">{insurance.endDate}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                      <button className="flex items-center text-blue-400 hover:text-blue-300">
                        <Info size={16} className="mr-1" />
                        View Loan Details
                      </button>
                      <div className="text-gray-400 text-sm">
                        <AlertCircle
                          size={16}
                          className="inline mr-1 text-blue-300"
                        />
                        Claim probability: Low
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-xl border border-blue-900 shadow-lg p-6">
              <h2 className="text-xl font-bold text-blue-200 mb-4">
                Insurance Analytics Dashboard
              </h2>
              <p className="text-gray-300 mb-6">
                View performance metrics and risk analysis for your insurance
                portfolio
              </p>

              <div className="flex justify-center items-center h-64 border border-gray-700 rounded-lg bg-gray-800 mb-6">
                <div className="text-gray-400">
                  Insurance Analytics and Performance Charts will appear here
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-medium text-blue-300 mb-2">
                    Risk Distribution
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <div>Low Risk</div>
                    <div>40%</div>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full mt-1 mb-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "40%" }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>Medium Risk</div>
                    <div>35%</div>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full mt-1 mb-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: "35%" }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>High Risk</div>
                    <div>25%</div>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full mt-1">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-medium text-blue-300 mb-2">
                    Premium Income
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-green-400">
                      3,185 USDC
                    </div>
                    <div className="text-green-400 text-sm">+12.4%</div>
                  </div>
                  <div className="text-gray-400 text-sm">
                    Last month: 2,832 USDC
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-medium text-blue-300 mb-2">
                    Claims Ratio
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold">0%</div>
                    <div className="text-green-400 text-sm">No claims</div>
                  </div>
                  <div className="text-gray-400 text-sm">
                    Industry average: 5.2%
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h3 className="text-lg font-medium text-blue-300 mb-4">
                  Insurance Opportunities
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="py-2 px-4 text-left text-gray-400 font-medium">
                          Risk Level
                        </th>
                        <th className="py-2 px-4 text-left text-gray-400 font-medium">
                          Count
                        </th>
                        <th className="py-2 px-4 text-left text-gray-400 font-medium">
                          Total Value
                        </th>
                        <th className="py-2 px-4 text-left text-gray-400 font-medium">
                          Avg. Premium
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700">
                        <td className="py-3 px-4">Low Risk</td>
                        <td className="py-3 px-4">12</td>
                        <td className="py-3 px-4">325,000 USDC</td>
                        <td className="py-3 px-4">2.8%</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-3 px-4">Medium Risk</td>
                        <td className="py-3 px-4">8</td>
                        <td className="py-3 px-4">210,000 USDC</td>
                        <td className="py-3 px-4">5.1%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">High Risk</td>
                        <td className="py-3 px-4">5</td>
                        <td className="py-3 px-4">420,000 USDC</td>
                        <td className="py-3 px-4">7.4%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Insurance Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-xl border border-blue-900 shadow-2xl w-full max-w-lg mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-blue-200">
                  Create Custom Insurance Policy
                </h2>
                <button
                  className="text-gray-400 hover:text-gray-200"
                  onClick={() => setShowCreateModal(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Loan ID or Borrower Address
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="Enter loan ID or borrower address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Coverage Amount
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 pl-9 text-gray-200 focus:outline-none focus:border-blue-500"
                        placeholder="Enter amount"
                      />
                      <DollarSign
                        size={16}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Premium Rate
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 pl-9 text-gray-200 focus:outline-none focus:border-blue-500"
                        placeholder="e.g. 3.5"
                      />
                      <Percent
                        size={16}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Coverage Duration
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 pl-9 text-gray-200 focus:outline-none focus:border-blue-500"
                      placeholder="Enter days (e.g. 30, 60, 90)"
                    />
                    <Calendar
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Coverage Terms
                  </label>
                  <textarea
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-blue-500 min-h-24"
                    placeholder="Describe the conditions under which this insurance will pay out..."
                  ></textarea>
                </div>

                <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 border border-blue-800">
                  <div className="flex items-start">
                    <AlertCircle
                      size={18}
                      className="text-blue-400 mt-1 mr-2 flex-shrink-0"
                    />
                    <div className="text-sm text-gray-300">
                      <p className="font-medium text-blue-300 mb-1">
                        Smart Contract Verification
                      </p>
                      <p>
                        This insurance contract will be immutably stored on the
                        blockchain. Payouts are automated based on oracle
                        verification of default events.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                  Create Insurance Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insurance Educational Section */}
      <div className="container mx-auto px-4 py-16 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-200">
            Credit Default Swaps (CDS) in DeFi
          </h2>
          <p className="text-gray-300 mb-8">
            CDS contracts in DeFi function as insurance against loan defaults.
            As an insurance provider, you earn premium payments in exchange for
            taking on the risk of loan defaults. This creates a more robust
            lending ecosystem by providing security for lenders.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl border border-blue-900">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <DollarSign size={24} className="text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-300">
                Premium Income
              </h3>
              <p className="text-gray-300">
                Earn competitive returns by providing insurance coverage for
                loans. Higher risk loans typically offer higher premium rates.
              </p>
            </div>

            <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl border border-blue-900">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <Shield size={24} className="text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-300">
                Risk Management
              </h3>
              <p className="text-gray-300">
                Sophisticated risk assessment tools help you evaluate loan
                quality and borrower creditworthiness before providing coverage.
              </p>
            </div>

            <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm p-6 rounded-xl border border-blue-900">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-300">
                Smart Contracts
              </h3>
              <p className="text-gray-300">
                All policies are encoded as smart contracts with automated
                payouts triggered by verified default events through oracle
                networks.
              </p>
            </div>
          </div>

          <div className="bg-blue-900 bg-opacity-30 p-6 rounded-xl border border-blue-800">
            <h3 className="text-xl font-semibold mb-3 flex items-center text-blue-200">
              <AlertCircle size={20} className="mr-2" />
              Risk Intelligence System
            </h3>
            <p className="text-gray-300 mb-4">
              As an insurance provider on Phylax, you have access to our
              proprietary Risk Intelligence System that analyzes on-chain data,
              borrower history, and market conditions to provide accurate risk
              assessments.
            </p>
            <button className="text-blue-400 hover:text-blue-300 font-medium flex items-center">
              Learn more about our risk assessment methodology
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Subtle blue accents */}
      <div className="fixed top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600 opacity-10 blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-500 opacity-10 blur-3xl pointer-events-none"></div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <BsDropletHalf className="text-blue-400 mr-2" size={24} />
              <span className="font-bold text-xl text-blue-300">Phylax</span>
            </div>
            <div className="flex space-x-6 text-gray-400">
              <a
                href="#"
                className="hover:text-blue-300 transition-colors duration-300"
              >
                Terms
              </a>
              <a
                href="#"
                className="hover:text-blue-300 transition-colors duration-300"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-blue-300 transition-colors duration-300"
              >
                Docs
              </a>
              <a
                href="#"
                className="hover:text-blue-300 transition-colors duration-300"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© 2025 Phylax. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
