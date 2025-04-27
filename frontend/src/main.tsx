import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { LendingPage } from "./LendingPage";
import { BorrowingPage } from "./BorrowingPage";
import { InsuranceMarketplace } from "./Insurance";
import { ThirdwebProvider } from "thirdweb/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/lending" element={<LendingPage />} />
          <Route path="/borrowing" element={<BorrowingPage />} />
          <Route path="/insurance" element={<InsuranceMarketplace />} />
        </Routes>
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);
