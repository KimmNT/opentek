import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdsPage from "./components/AdsPage";
import HomePage from "./components/HomePage";
import QRCode from "./components/QRCodePage";

function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdsPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/scanqrcode" element={<QRCode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
