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
export default function Hero({ isVisible }) {
  return (
    <>
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
    </>
  );
}
