import React from "react";
import QRGenerate from "./QRGenerate";
import "../scss/QRCode.scss";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function QRCode(props) {
  const navigate = useNavigate();

  const navigateToPage = (pageUrl) => {
    navigate(pageUrl);
  };

  const qrCodeValue = "https://eocmanage.vercel.app/admin/NIC";
  const qrCodeSize = 230;
  return (
    <div className="qr__container">
      <div className="qr__content">
        <div className="qr__logo">
          ope<span className="logo__text_highlight">n</span>tek
        </div>
        <QRGenerate value={qrCodeValue} size={qrCodeSize} />
        <p onClick={() => navigateToPage("/homepage")} className="qr__text">
          Scan to login
        </p>
      </div>
      <div onClick={() => alert("Admin opened")} className="qr__admin">
        <FaPen className="admin__icon" />
      </div>
      <div className="qr__underline"></div>
    </div>
  );
}

export default QRCode;
