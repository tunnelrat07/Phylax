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
} from "lucide-react";
import { BsDropletHalf } from "react-icons/bs";

export function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 text-gray-100 ">
      {/* Navigation Bar */}
      <nav className="px-4 md:px-8 py-8 flex justify-between items-center bg-gray-900 bg-opacity-80 backdrop-blur-sm mx-10 ">
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

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 md:pt-24 pb-12 md:pb-20">
        <div
          className={`max-w-3xl mx-auto text-center mb-12 transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-200">
            Decentralized Lending, Borrowing & Insurance
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            A secure ecosystem for lenders, borrowers and insurance providers to
            connect and transact seamlessly
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full flex items-center font-semibold transition-all duration-300 transform hover:scale-105">
              Launch App
              <ArrowRight className="ml-2" size={20} />
            </button>
            <button className="bg-transparent border border-blue-500 text-blue-300 hover:border-blue-400 hover:text-blue-200 px-6 py-3 rounded-full flex items-center font-semibold transition-all duration-300">
              Learn More
              <ChevronRight className="ml-2" size={20} />
            </button>
          </div>
        </div>

        {/* Three Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Lender Card */}
          <div
            className={`bg-gray-800 rounded-xl p-6 shadow-lg border border-blue-900 transition-all duration-500 transform hover:scale-105 hover:shadow-xl group ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-800 transition-colors duration-300">
              <DollarSign size={32} className="text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-blue-200">
              I'm a Lender
            </h3>
            <p className="text-gray-300 mb-6">
              Earn attractive yields on your digital assets by lending to
              verified borrowers in our secure ecosystem.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <BarChart size={18} className="text-blue-400 mr-2" />
                <span>Competitive APY rates</span>
              </li>
              <li className="flex items-center">
                <Shield size={18} className="text-blue-400 mr-2" />
                <span>Risk-assessed borrowers</span>
              </li>
              <li className="flex items-center">
                <PieChart size={18} className="text-blue-400 mr-2" />
                <span>Diversified lending options</span>
              </li>
            </ul>
            <a href="/lending">
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white transition-colors duration-300 py-3 rounded-lg flex items-center justify-center font-semibold">
                Start Lending
                <ArrowRight className="ml-2" size={18} />
              </button>
            </a>
          </div>

          {/* Borrower Card */}
          <div
            className={`bg-gray-800 rounded-xl p-6 shadow-lg border border-blue-900 transition-all duration-500 transform hover:scale-105 hover:shadow-xl group ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-800 transition-colors duration-300">
              <Users size={32} className="text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-blue-200">
              I'm a Borrower
            </h3>
            <p className="text-gray-300 mb-6">
              Access funds quickly with competitive rates and flexible terms,
              backed by innovative collateral options.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <DollarSign size={18} className="text-blue-400 mr-2" />
                <span>Low interest rates</span>
              </li>
              <li className="flex items-center">
                <ArrowRight size={18} className="text-blue-400 mr-2" />
                <span>Flexible repayment terms</span>
              </li>
              <li className="flex items-center">
                <Shield size={18} className="text-blue-400 mr-2" />
                <span>Optional loan insurance</span>
              </li>
            </ul>
            <a href="/borrowing">
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white transition-colors duration-300 py-3 rounded-lg flex items-center justify-center font-semibold">
                Get a Loan
                <ArrowRight className="ml-2" size={18} />
              </button>
            </a>
          </div>

          {/* Insurance Provider Card */}
          <div
            className={`bg-gray-800 rounded-xl p-6 shadow-lg border border-blue-900 transition-all duration-500 transform hover:scale-105 hover:shadow-xl group ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-800 transition-colors duration-300">
              <Shield size={32} className="text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-blue-200">
              I'm an Insurance Provider
            </h3>
            <p className="text-gray-300 mb-6">
              Provide coverage for loans and earn premiums while contributing to
              platform stability and security.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <DollarSign size={18} className="text-blue-400 mr-2" />
                <span>Earn insurance premiums</span>
              </li>
              <li className="flex items-center">
                <Users size={18} className="text-blue-400 mr-2" />
                <span>Build insurance reputation</span>
              </li>
              <li className="flex items-center">
                <PieChart size={18} className="text-blue-400 mr-2" />
                <span>Risk management tools</span>
              </li>
            </ul>
            <a href="/insurance">
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white transition-colors duration-300 py-3 rounded-lg flex items-center justify-center font-semibold">
                Provide Insurance
                <ArrowRight className="ml-2" size={18} />
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Subtle blue accents */}
      <div className="fixed top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600 opacity-10 blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-500 opacity-10 blur-3xl pointer-events-none"></div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm px-4 py-6 rounded-xl border border-blue-900 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-blue-300 mb-2">
              $240M+
            </div>
            <div className="text-gray-300">Total Value Locked</div>
          </div>
          <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm px-4 py-6 rounded-xl border border-blue-900 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-blue-300 mb-2">
              15K+
            </div>
            <div className="text-gray-300">Active Users</div>
          </div>
          <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm px-4 py-6 rounded-xl border border-blue-900 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-blue-300 mb-2">
              $32M+
            </div>
            <div className="text-gray-300">Insurance Coverage</div>
          </div>
          <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm px-4 py-6 rounded-xl border border-blue-900 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-blue-300 mb-2">
              8.2%
            </div>
            <div className="text-gray-300">Avg. APY for Lenders</div>
          </div>
        </div>
      </div>

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
