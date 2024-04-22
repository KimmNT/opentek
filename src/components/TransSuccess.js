import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import "../scss/TransResult.scss";
import CountDown from "./CountDown";

export default function TransSuccess() {
  const [logout, setLogout] = useState(false);
  const [keepGoing, setKeepGoing] = useState(false);
  const [completedStatus, setCompletedStatus] = useState(null);
  const [transMade, setTransMade] = useState(false);

  const { state } = useLocation();
  const machineId = state?.machineId;
  const agencyId = state?.agencyId;
  const token = state?.token;
  const value = state?.value;
  const balance = state?.balance;

  const navigate = useNavigate();

  const navigateToPage = (pageUrl, stateData) => {
    navigate(pageUrl, { state: stateData });
  };

  const getCurrentTime = () => {
    let currentDateTime = new Date();

    // Get the year, month, and day components
    let year = currentDateTime.getFullYear();
    // Months are zero-based, so we add 1 to get the correct month
    let month = currentDateTime.getMonth() + 1;
    let day = currentDateTime.getDate();

    // Pad single-digit months and days with a leading zero if needed
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    // Get the hour, minute, and second components
    let hour = currentDateTime.getHours();
    let minute = currentDateTime.getMinutes();
    let second = currentDateTime.getSeconds();

    // Pad single-digit hour, minute, and second with a leading zero if needed
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;

    let formattedTime = `${hour}:${minute}:${second}`;

    let time = `${year}-${month}-${day} ${formattedTime}`;

    return time;
  };

  //HANDLE UPDATE GTC SYSTEM
  useEffect(() => {
    if (transMade) {
      fetch(
        "https://gpc-api-demo-yy.3true.com/mac-api/selling-machine/transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            value: value,
            machineId: machineId,
            time: getCurrentTime(),
            agencyId: agencyId,
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
          setCompletedStatus(data.success);
        })
        .catch((error) => {
          // Handle error
          console.error("There was an error!", error);
        });
    }
  }, [transMade]);

  useEffect(() => {
    if (logout && completedStatus) {
      navigateToPage("/scanqrcode");
    } else if (keepGoing && completedStatus) {
      navigateToPage("/homepage", {
        balance: balance,
        machineId: machineId,
        agencyId: agencyId,
        token: token,
      });
    }
  }, [completedStatus]);

  const handleLogout = () => {
    setTransMade(true);
    setLogout(true);
  };

  const handleKeepBuy = () => {
    setTransMade(true);
    setKeepGoing(true);
  };

  return (
    <div className="transcom__container">
      <div className="transcom__content">
        <div className="transcom__header">transaction completed</div>
        <div className="transcom__result">
          <div className="transcom__icon_box success">
            <FaCheck className="transcom__icon" />
          </div>
          <div className="confirm__waiting">
            <div className="confirm__waiting_text">
              Thank you for your purchase.
              <br />
              Have a nice day!
            </div>
          </div>
          <div className="transcom__btn_box">
            <div
              onClick={() => handleLogout()}
              className="transcom__btn continue"
            >
              Done
            </div>
            {/* <div
              onClick={() => handleKeepBuy()}
              className="transcom__btn continue"
            >
              Continue
            </div> */}
          </div>
        </div>
      </div>
      <div className="state">
        <div className="state__item done">
          <FaCheck className="state__icon" />
        </div>
        <div className="state__line"></div>
        <div className="state__item done">
          <FaCheck className="state__icon" />
        </div>
        <div className="state__line"></div>
        <div className="state__item done">
          <FaCheck className="state__icon" />
        </div>
      </div>
      <div className="count__down">
        Log out in <CountDown pathPage={"/scanqrcode"} />
      </div>
    </div>
  );
}
