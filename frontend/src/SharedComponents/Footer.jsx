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
export default function Footer() {
  return (
    <>
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
    </>
  );
}
