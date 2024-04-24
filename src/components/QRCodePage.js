import React, { useEffect, useState } from "react";
import QRGenerate from "./QRGenerate";
import "../scss/QRCode.scss";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CountDown from "./CountDown";
import HomePage from "./HomePage";

function QRCode(props) {
  const navigate = useNavigate();

  const navigateToPage = (pageUrl, stateData) => {
    navigate(pageUrl, { state: stateData });
  };

  const [loginData, setLoginData] = useState({
    // Initialize your form data here
    email: "p010101@p.com",
    password: "123456?a",
    agencyId: 5,
    machineId: "VHI6268944",
  });
  const [token, setToken] = useState(null);
  const [balance, setBalance] = useState(null);
  const [machineId, setMachineId] = useState(null);
  const [agencyId, setAgencyId] = useState(null);
  const [loginStatus, setLoginStatus] = useState(null);
  const [unlockStatus, setUnlockStatus] = useState(null);

  //HANDLE GET UNLOCK STATUS
  useEffect(() => {
    if (loginStatus) {
      fetch(
        "https://gpc-api-demo-yy.3true.com/mac-api/selling-machine/callback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            balance: balance,
            machineId: machineId,
            status: "OK",
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Handle response data as needed
          console.log(data);
          setUnlockStatus(data.success);
        })
        .catch((error) => {
          // Handle error
          console.error("There was an error!", error);
        });
    }
  }, [loginStatus]);
  //HANDLE WHEN UNLOCK STATUS === TRUE
  useEffect(() => {
    if (unlockStatus) {
      navigateToPage("/homepage", {
        balance: balance,
        machineId: machineId,
        agencyId: agencyId,
        token: token,
      });
    }
  }, [unlockStatus, balance, token]);

  //HANDLE GET LOGIN
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://gpc-api-demo-yy.3true.com/mac-api/login/selling-machine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle response data as needed
        console.log(data);
        setLoginStatus(data.success);
        setToken(data.result.token);
        setBalance(data.result.balance);
        setMachineId(data.result.machineId);
        setAgencyId(data.result.agencyId);
      })
      .catch((error) => {
        // Handle error
        console.error("There was an error!", error);
      });
  };

  const qrCodeValue = "https://eocmanage.vercel.app/admin/NIC";
  const qrCodeSize = 280;

  return (
    <div className="qr__container">
      <div className="qr__content">
        <div className="qr__logo">
          ope<span className="logo__text_highlight">n</span>tek
        </div>
        <QRGenerate value={qrCodeValue} size={qrCodeSize} />
        <p onClick={handleSubmit} className="qr__text">
          Scan to login
        </p>
      </div>
      <div
        onClick={() => navigateToPage("/admin-manage-login")}
        className="qr__admin"
      >
        <FaPen className="admin__icon" />
      </div>
      <div onClick={() => navigateToPage("/")} className="countdown">
        <CountDown pathPage={"/"} />
      </div>
      <div className="qr__underline"></div>
    </div>
  );
}

export default QRCode;
