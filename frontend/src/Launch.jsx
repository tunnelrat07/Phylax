import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Shield,
  DollarSign,
  ChevronRight,
  Wallet,
  Menu,
  X,
  BarChart,
  Users,
  PieChart,
  RefreshCw,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Search,
  Filter,
} from "lucide-react";
import { BsDropletHalf } from "react-icons/bs";

// HomePage Component
const HomePage = () => {
  const [activeTab, setActiveTab] = useState("lend");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 text-gray-100">
      {/* Navigation Bar */}
      <nav className="px-4 md:px-8 py-6 flex justify-between items-center bg-gray-900 bg-opacity-80 backdrop-blur-sm sticky top-0 z-50">
        <a href="/">
          <div className="flex items-center">
            <BsDropletHalf className="text-blue-400 mr-2" size={32} />
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

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-200 mb-4 leading-tight">
              Next-Gen DeFi Powered by{" "}
              <span className="text-blue-400">Reputation</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Lend, borrow, and insure assets with confidence using on-chain
              reputation and seamless Sui infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 font-semibold">
                Get Started
                <ArrowRight className="ml-2" size={18} />
              </button>
              <button className="bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-900 hover:bg-opacity-30 px-6 py-3 rounded-full flex items-center justify-center transition-all duration-300">
                Learn More
                <ChevronRight className="ml-1" size={18} />
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              {/* Abstract graphic representation */}
              <div className="w-64 h-64 md:w-80 md:h-80 bg-blue-900 bg-opacity-20 rounded-full flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-4 bg-gray-900 bg-opacity-70 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <BsDropletHalf className="text-blue-400" size={80} />
                </div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 border-opacity-30 rounded-full"></div>
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-500 opacity-20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 opacity-20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-900 bg-opacity-80 py-8 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Total Value Locked</p>
              <p className="text-3xl font-bold text-blue-300">$240.5M</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Active Users</p>
              <p className="text-3xl font-bold text-blue-300">18.4K</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Average APY</p>
              <p className="text-3xl font-bold text-green-400">6.2%</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Protocol Health</p>
              <p className="text-3xl font-bold text-blue-300">99.8%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sections */}
      <div className="container mx-auto px-4 py-16">
        {/* Section Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-1 inline-flex shadow-md backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("lend")}
              className={`px-8 py-4 rounded-lg font-medium text-base transition-all duration-300 ${
                activeTab === "lend"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-blue-300"
              }`}
            >
              <DollarSign size={18} className="inline mr-2" />
              Lend
            </button>
            <button
              onClick={() => setActiveTab("borrow")}
              className={`px-8 py-4 rounded-lg font-medium text-base transition-all duration-300 ${
                activeTab === "borrow"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-blue-300"
              }`}
            >
              <Users size={18} className="inline mr-2" />
              Borrow
            </button>
            <button
              onClick={() => setActiveTab("insure")}
              className={`px-8 py-4 rounded-lg font-medium text-base transition-all duration-300 ${
                activeTab === "insure"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-blue-300"
              }`}
            >
              <Shield size={18} className="inline mr-2" />
              Insure
            </button>
          </div>
        </div>

        {/* Active Section Content */}
        {activeTab === "lend" && <LendSection />}
        {/* {activeTab === "borrow" && <BorrowSection />} */}
        {activeTab === "insure" && <InsureSection />}
      </div>

      {/* Features Section */}
      <div className="bg-gray-900 bg-opacity-80 py-16 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-200 mb-12 text-center">
            Why Choose Phylax
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-blue-900 shadow-lg backdrop-blur-sm">
              <div className="bg-blue-900 bg-opacity-40 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Shield size={28} className="text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-blue-300 mb-3">
                Bank-Grade Security
              </h3>
              <p className="text-gray-300">
                Audited smart contracts and multi-layer security protocols
                protect your assets around the clock.
              </p>
            </div>

            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-blue-900 shadow-lg backdrop-blur-sm">
              <div className="bg-blue-900 bg-opacity-40 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <TrendingUp size={28} className="text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-blue-300 mb-3">
                Optimized Returns
              </h3>
              <p className="text-gray-300">
                Advanced yield strategies and dynamic interest models maximize
                your earning potential in all market conditions.
              </p>
            </div>

            <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-blue-900 shadow-lg backdrop-blur-sm">
              <div className="bg-blue-900 bg-opacity-40 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <RefreshCw size={28} className="text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-blue-300 mb-3">
                Instant Liquidity
              </h3>
              <p className="text-gray-300">
                Withdraw your assets anytime with no lockup periods and enjoy
                seamless cross-chain transactions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gray-800 bg-opacity-50 rounded-xl p-8 md:p-12 border border-blue-900 shadow-lg backdrop-blur-sm text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-200 mb-4">
            Ready to Start Your DeFi Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of users already benefiting from the future of
            decentralized finance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full flex items-center justify-center transition-all duration-300 font-semibold">
              Connect Wallet
              <Wallet className="ml-2" size={18} />
            </button>
            <button className="bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-900 hover:bg-opacity-30 px-8 py-4 rounded-full transition-all duration-300">
              View Documentation
            </button>
          </div>
        </div>
      </div>

      {/* Subtle blue accents */}
      <div className="fixed top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600 opacity-10 blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-500 opacity-10 blur-3xl pointer-events-none"></div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 mt-16">
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
};

// Lend Section Component
const LendSection = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-blue-900 shadow-lg backdrop-blur-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-blue-900 bg-opacity-40 p-3 rounded-full">
              <DollarSign size={24} className="text-blue-300" />
            </div>
            <div className="bg-green-900 bg-opacity-30 px-3 py-1 rounded-lg">
              <span className="text-green-400 text-sm font-medium">
                +8.2% APY
              </span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-blue-200 mb-2">
            Total Supplied
          </h3>
          <p className="text-3xl font-bold text-white mb-4">$124,350</p>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Daily Earnings</span>
            <span className="text-green-400">+$28.04</span>
          </div>
          <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden mb-4">
            <div className="bg-blue-500 h-full" style={{ width: "65%" }}></div>
          </div>
          <div className="mt-6">
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white transition-colors duration-300 py-3 rounded-lg flex items-center justify-center font-semibold">
              Supply Assets
              <ArrowRight className="ml-2" size={18} />
            </button>
          </div>
        </div>

        <div className="md:col-span-2 bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-blue-900 shadow-lg backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-blue-200">
              Markets to Supply
            </h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search assets..."
                  className="bg-gray-900 bg-opacity-70 text-gray-300 pl-8 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-40 md:w-auto"
                />
                <Search
                  size={16}
                  className="absolute left-2 top-2.5 text-gray-500"
                />
              </div>
              <button className="bg-gray-900 bg-opacity-70 p-2 rounded-lg">
                <Filter size={16} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                  <th className="pb-3 font-medium">Asset</th>
                  <th className="pb-3 font-medium">APY</th>
                  <th className="pb-3 font-medium">Total Supply</th>
                  <th className="pb-3 font-medium">Your Supply</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800 hover:bg-gray-800 transition-colors duration-200">
                  <td className="py-4 flex items-center">
                    <div className="bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <span className="font-bold text-blue-300">S</span>
                    </div>
                    <span>SUI</span>
                  </td>
                  <td className="py-4 text-green-400">8.2%</td>
                  <td className="py-4">$52.4M</td>
                  <td className="py-4">$5,240</td>
                  <td className="py-4">
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg text-sm transition-colors duration-300">
                      Supply
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-800 hover:bg-gray-800 transition-colors duration-200">
                  <td className="py-4 flex items-center">
                    <div className="bg-green-900 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <span className="font-bold text-green-300">U</span>
                    </div>
                    <span>USDC</span>
                  </td>
                  <td className="py-4 text-green-400">5.6%</td>
                  <td className="py-4">$78.1M</td>
                  <td className="py-4">$0</td>
                  <td className="py-4">
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg text-sm transition-colors duration-300">
                      Supply
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-800 hover:bg-gray-800 transition-colors duration-200">
                  <td className="py-4 flex items-center">
                    <div className="bg-yellow-900 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <span className="font-bold text-yellow-300">B</span>
                    </div>
                    <span>BTC</span>
                  </td>
                  <td className="py-4 text-green-400">3.8%</td>
                  <td className="py-4">$34.6M</td>
                  <td className="py-4">$0</td>
                  <td className="py-4">
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg text-sm transition-colors duration-300">
                      Supply
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-800 transition-colors duration-200">
                  <td className="py-4 flex items-center">
                    <div className="bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <span className="font-bold text-blue-300">E</span>
                    </div>
                    <span>ETH</span>
                  </td>
                  <td className="py-4 text-green-400">4.2%</td>
                  <td className="py-4">$45.2M</td>
                  <td className="py-4">$3,100</td>
                  <td className="py-4">
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg text-sm transition-colors duration-300">
                      Supply
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-blue-900 shadow-lg backdrop-blur-sm">
        <h3 className="text-xl font-bold text-blue-200 mb-6">
          Your Supplied Assets
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-900 bg-opacity-60 rounded-lg p-4 border border-blue-900">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-blue-300">S</span>
                </div>
                <span className="font-medium">SUI</span>
              </div>
              <div className="bg-blue-900 bg-opacity-30 px-2 py-1 rounded text-xs text-blue-300">
                1,820 SUI
              </div>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Amount (USD)</span>
              <span>$5,240</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">APY</span>
              <span className="text-green-400">8.2%</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-400">Daily Interest</span>
              <span className="text-green-400">+$1.18</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-2 py-2 rounded-lg text-sm transition-colors duration-300">
                Withdraw
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-2 py-2 rounded-lg text-sm transition-colors duration-300">
                Add More
              </button>
            </div>
          </div>

          <div className="bg-gray-900 bg-opacity-60 rounded-lg p-4 border border-blue-900">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-blue-300">E</span>
                </div>
                <span className="font-medium">ETH</span>
              </div>
              <div className="bg-blue-900 bg-opacity-30 px-2 py-1 rounded text-xs text-blue-300">
                1.2 ETH
              </div>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Amount (USD)</span>
              <span>$3,100</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">APY</span>
              <span className="text-green-400">4.2%</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-400">Daily Interest</span>
              <span className="text-green-400">+$0.36</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-2 py-2 rounded-lg text-sm transition-colors duration-300">
                Withdraw
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-2 py-2 rounded-lg text-sm transition-colors duration-300">
                Add More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Insure Section Component
const InsureSection = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-blue-900 shadow-lg backdrop-blur-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-blue-900 bg-opacity-40 p-3 rounded-full">
              <Shield size={24} className="text-blue-300" />
            </div>
            <div className="bg-green-900 bg-opacity-30 px-3 py-1 rounded-lg">
              <span className="text-green-400 text-sm font-medium">
                Active Coverage
              </span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-blue-200 mb-2">
            Total Protected
          </h3>
          <p className="text-3xl font-bold text-white mb-4">$42,180</p>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Premium Cost</span>
            <span className="text-blue-300">$105/month</span>
          </div>
          <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden mb-4">
            <div className="bg-green-500 h-full" style={{ width: "85%" }}></div>
          </div>
          <div className="mt-6">
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white transition-colors duration-300 py-3 rounded-lg flex items-center justify-center font-semibold">
              Manage Insurance
              <ArrowRight className="ml-2" size={18} />
            </button>
          </div>
        </div>

        <div className="md:col-span-2 bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-blue-900 shadow-lg backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-blue-200">
              Available Coverage Plans
            </h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search plans..."
                  className="bg-gray-900 bg-opacity-70 text-gray-300 pl-8 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-40 md:w-auto"
                />
                <Search
                  size={16}
                  className="absolute left-2 top-2.5 text-gray-500"
                />
              </div>
              <button className="bg-gray-900 bg-opacity-70 p-2 rounded-lg">
                <Filter size={16} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                  <th className="pb-3 font-medium">Insurance Type</th>
                  <th className="pb-3 font-medium">Premium</th>
                  <th className="pb-3 font-medium">Coverage</th>
                  <th className="pb-3 font-medium">Period</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800 hover:bg-gray-800 transition-colors duration-200">
                  <td className="py-4 flex items-center">
                    <div className="bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <Shield size={16} className="text-blue-300" />
                    </div>
                    <span>Smart Contract Cover</span>
                  </td>
                  <td className="py-4">2.5%</td>
                  <td className="py-4">Up to $500K</td>
                  <td className="py-4">12 months</td>
                  <td className="py-4">
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg text-sm transition-colors duration-300">
                      Get Quote
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-800 hover:bg-gray-800 transition-colors duration-200">
                  <td className="py-4 flex items-center">
                    <div className="bg-green-900 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <AlertCircle size={16} className="text-green-300" />
                    </div>
                    <span>Stablecoin Depeg</span>
                  </td>
                  <td className="py-4">1.8%</td>
                  <td className="py-4">Full</td>
                  <td className="py-4">6 months</td>
                  <td className="py-4">
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg text-sm transition-colors duration-300">
                      Get Quote
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-800 hover:bg-gray-800 transition-colors duration-200">
                  <td className="py-4 flex items-center">
                    <div className="bg-yellow-900 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <RefreshCw size={16} className="text-yellow-300" />
                    </div>
                    <span>Liquidity Pool</span>
                  </td>
                  <td className="py-4">3.2%</td>
                  <td className="py-4">Up to $1M</td>
                  <td className="py-4">3 months</td>
                  <td className="py-4">
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg text-sm transition-colors duration-300">
                      Get Quote
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-800 transition-colors duration-200">
                  <td className="py-4 flex items-center">
                    <div className="bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <CheckCircle size={16} className="text-blue-300" />
                    </div>
                    <span>Market Volatility</span>
                  </td>
                  <td className="py-4">4.0%</td>
                  <td className="py-4">Up to $250K</td>
                  <td className="py-4">1 month</td>
                  <td className="py-4">
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg text-sm transition-colors duration-300">
                      Get Quote
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-blue-900 shadow-lg backdrop-blur-sm">
        <h3 className="text-xl font-bold text-blue-200 mb-6">
          Your Active Policies
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-900 bg-opacity-60 rounded-lg p-4 border border-blue-900">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <Shield size={16} className="text-blue-300" />
                </div>
                <span className="font-medium">Smart Contract</span>
              </div>
              <div className="bg-green-900 bg-opacity-30 px-2 py-1 rounded text-xs text-green-300">
                Active
              </div>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Coverage Amount</span>
              <span>$30,000</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Premium</span>
              <span className="text-blue-300">$62/month</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-400">Expires</span>
              <span className="text-yellow-400">In 8 months</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-2 py-2 rounded-lg text-sm transition-colors duration-300">
                File Claim
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-2 py-2 rounded-lg text-sm transition-colors duration-300">
                Extend
              </button>
            </div>
          </div>

          <div className="bg-gray-900 bg-opacity-60 rounded-lg p-4 border border-blue-900">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div className="bg-green-900 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <AlertCircle size={16} className="text-green-300" />
                </div>
                <span className="font-medium">Stablecoin</span>
              </div>
              <div className="bg-green-900 bg-opacity-30 px-2 py-1 rounded text-xs text-green-300">
                Active
              </div>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Coverage Amount</span>
              <span>$12,180</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Premium</span>
              <span className="text-blue-300">$43/month</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-400">Expires</span>
              <span className="text-yellow-400">In 3 months</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-2 py-2 rounded-lg text-sm transition-colors duration-300">
                File Claim
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-2 py-2 rounded-lg text-sm transition-colors duration-300">
                Extend
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
