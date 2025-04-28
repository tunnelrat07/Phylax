import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { BsDropletHalf } from "react-icons/bs";
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

export default function Navbar({ isMenuOpen }) {
  return (
    <>
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
          {/* 
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full flex items-center transition-all duration-300 transform hover:scale-105"> */}
          <ConnectButton />

          {/* </button> */}
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
          <ConnectButton />
        </div>
      )}
    </>
  );
}
