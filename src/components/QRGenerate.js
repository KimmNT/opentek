import React from "react";
import QRCode from "qrcode.react";
import "../scss/QRCodeGenerate.scss";
import qrArea from "../images/qrcode.png";

function QRGenerate({ value, size }) {
  return (
    <div className="qrgene__container">
      {/* <div className="qrgene__area">
        <div className="area topleft"></div>
        <div className="area topright"></div>
        <div className="area bottomleft"></div>
        <div className="area bottomright"></div>
      </div> */}
      <img className="qrgene__area" src={qrArea} />
      <QRCode className="qrgene__icon" value={value} size={size} />
    </div>
  );
}

export default QRGenerate;
