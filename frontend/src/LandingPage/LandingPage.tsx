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
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import Navbar from "../SharedComponents/NavigationBar.jsx";
import Hero from "./Components/Hero";
import Subtle from "./Components/SubtleBlueAccents";
import Stats from "./Components/Stats";
import Footer from "../SharedComponents/Footer.jsx";
function ConnectedAccount() {
  const account = useCurrentAccount();

  if (!account) {
    return null;
  }

  return <div>Connected to {account.address}</div>;
}
export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900 text-gray-100 ">
      {/* Navigation Bar */}

      <Navbar isMenuOpen={isMenuOpen} />

      {/* Hero Section */}
      <Hero isVisible={isVisible} />

      {/* Subtle blue accents */}
      <Subtle />

      {/* Stats Section */}
      <Stats />

      {/* Footer */}
      <Footer />
    </div>
  );
}
