import React from "react";
import { createRoot } from "react-dom/client";
import { LandingPage } from "./LandingPage/LandingPage";
import { LendingPage } from "./LendingPage/LendingPage";
import { BorrowingPage } from "./BorrowingPage/BorrowingPage";
import { InsuranceMarketplace } from "./Insurance/Insurance";
import { ThirdwebProvider } from "thirdweb/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import "@mysten/dapp-kit/dist/index.css";

const queryClient = new QueryClient();
const networks = {
  devnet: { url: getFullnodeUrl("devnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
};

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="devnet">
        <WalletProvider autoConnect={true}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/lending" element={<LendingPage />} />
              <Route path="/borrowing" element={<BorrowingPage />} />
              <Route path="/insurance" element={<InsuranceMarketplace />} />
            </Routes>
          </BrowserRouter>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
