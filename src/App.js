import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdsPage from "./components/AdsPage";
import HomePage from "./components/HomePage";
import QRCode from "./components/QRCodePage";
import Product from "./components/Product";
import PaymentPage from "./components/PaymentPage";
import CashPage from "./components/PAYMENT/CashPage";
import BankingPage from "./components/PAYMENT/BankingPage";
import GTCPage from "./components/PAYMENT/GTCPage";
import TransSuccess from "./components/TransSuccess";
import TransFail from "./components/TransFail";
import GTCwithCash from "./components/PAYMENT/GTCwithCash";
import GetCrypto from "./components/GetCrypto";
import TestAPI from "./components/TestAPI";
import Management from "./components/admin/Management";
import AdminLogin from "./components/admin/AdminLogin";

function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdsPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/scanqrcode" element={<QRCode />} />
        <Route path="/test" element={<Product />} />
        <Route path="/detail/:productId" element={<PaymentPage />} />
        <Route path="/payment-cash" element={<CashPage />} />
        <Route path="/payment-banking" element={<BankingPage />} />
        <Route path="/payment-gtc" element={<GTCPage />} />
        <Route
          path="/payment-gtc/payment-gtc-with-cash"
          element={<GTCwithCash />}
        />
        <Route path="/trans-completed" element={<TransSuccess />} />
        <Route path="/trans-failed" element={<TransFail />} />
        <Route path="/getCrypto" element={<GetCrypto />} />
        <Route path="/testAPI" element={<TestAPI />} />
        <Route path="/admin-manage-login" element={<AdminLogin />} />
        <Route path="/admin-management" element={<Management />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
