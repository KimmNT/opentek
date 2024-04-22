import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaList, FaMoneyBill, FaAngleLeft, FaCheck } from "react-icons/fa";
import "../../scss/GTCwithCash.scss";
import { useNavigate } from "react-router-dom";
import CountDown from "../CountDown";

export default function GTCwithCash() {
  const [transStatus, setTransStatus] = useState(null);
  const [createTransStatus, setCreateTransStatus] = useState(null);
  const [transInfo, setTransInfo] = useState({});
  const [createOrder, setCreateOrder] = useState(false);

  const navigate = useNavigate();

  const navigateToPage = (pageUrl, stateData) => {
    navigate(pageUrl, { state: stateData });
  };

  const { state } = useLocation();
  const productInfo = state?.productInfo;
  const machineId = state?.machineId;
  const agencyId = state?.agencyId;
  const token = state?.token;
  const balance = state?.balance;

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
  //HANDLE CREATE TRANSACTION
  useEffect(() => {
    if (createOrder) {
      fetch(
        "https://gpc-api-demo-yy.3true.com/mac-api/selling-machine/purchase",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            agencyId: agencyId,
            machineId: machineId,
            transaction: 1,
            slot: productInfo.productSlot,
            value: productInfo.productPrice,
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            console.log(response);
          }
          return response.json();
        })
        .then((data) => {
          // Handle response data as needed
          console.log(data);
          setTransInfo(data.result);
          setCreateTransStatus(data.success);
        })
        .catch((error) => {
          // Handle error
          console.log(error.message);
        });
    }
  }, [createOrder]);

  //HANDLE COMPLETE TRANSACTION
  useEffect(() => {
    if (createTransStatus) {
      fetch(
        "https://gpc-api-demo-yy.3true.com/mac-api/selling-machine/result",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            purchaseRequestId: transInfo.purchaseRequestId,
            machineId: machineId,
            transaction: 1,
            slot: productInfo.productSlot,
            value: productInfo.productPrice,
            paymentMethod: 0,
            status: 1,
            totalSale: 1,
            totalMoneySale: productInfo.productPrice,
            time: getCurrentTime(),
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
          setTransStatus(data.success);
        })
        .catch((error) => {
          // Handle error
          console.error("There was an error!", error);
        });
    }
  }, [createTransStatus]);

  useEffect(() => {
    if (transStatus) {
      navigateToPage("/trans-completed", {
        agencyId: agencyId,
        machineId: machineId,
        value: 0,
        token: token,
        balance: transInfo.balance,
      });
    }
  }, [transStatus]);

  const handelFormat = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const topUp = 10000;

  return (
    <div className="method__container">
      <div className="method__header">
        <div
          onClick={() =>
            navigateToPage(`/payment-gtc`, {
              productInfo: productInfo,
              machineId: machineId,
              agencyId: agencyId,
              token: token,
              balance: balance,
            })
          }
          className="header__back"
        >
          <FaAngleLeft className="header__back_icon" />
        </div>
        <div className="header__title">Payment - GTC</div>
      </div>
      <div className="method__content">
        <div className="method__summary">
          <div className="method__summary_content">
            <img
              src={productInfo.productImage}
              alt={productInfo.productName}
              className="summary__image"
            />
            <div className="summary__info">
              <div className="summary__price">
                <div className="info__item">{productInfo.productName}</div>
                <div className="info__item">
                  {handelFormat(productInfo.productPrice)}
                  <span className="currency">GT</span>
                </div>
              </div>
              <div className="summary__line"></div>
              <div className="summary__total">
                <div className="info__total">Total</div>
                <div className="info__total">
                  {handelFormat(productInfo.productPrice)}
                  <span className="currency">GT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="method__transaction">
          <div className="gtc__content">
            <div className="gtc__item">
              <div className="gtc__headline">Current balance</div>
              <div className="gtc__coin">
                <div className="gtc__coin_number">
                  {handelFormat(balance)}
                  <span className="currency">GT</span>
                </div>
              </div>
            </div>
            <div className="gtc__line"></div>
            <div className="gtc__item">
              <div className="gtc__headline">Top up</div>
              <div className="gtc__coin">
                <div className="gtc__coin_number">
                  {handelFormat(topUp)}
                  <span className="currency">GT</span>
                </div>
              </div>
            </div>
            <div className="gtc__line"></div>
            <div className="gtc__item">
              <div className="gtc__headline">Remaining</div>
              <div className="gtc__coin">
                <div
                  className={
                    topUp + balance - productInfo.productPrice >= 0
                      ? "gtc__coin_number"
                      : "gtc__coin_number error"
                  }
                >
                  {handelFormat(topUp + balance - productInfo.productPrice)}
                  <span className="currency">GT</span>
                </div>
              </div>
            </div>
          </div>
          {topUp + balance - productInfo.productPrice >= 0 ? (
            <div className="addcash__done">
              <div className="addcash__done_headline">
                Please notice!
                <br />
                We will not refund any remaining money <br /> after the
                transaction completed
              </div>
              <div
                onClick={() => setCreateOrder(true)}
                className="addcash__done_btn"
              >
                continue
              </div>
            </div>
          ) : (
            <div className="addcash__waiting">
              Insert your cash into the bank notch
            </div>
          )}
        </div>
      </div>
      <div className="method__waiting">
        <div className="method__waiting_text">
          Waiting for the transaction to be completed
        </div>
        <div className="count__down">
          <CountDown
            pathPage={"/scanqrcode"}
            data={{
              machineId: machineId,
              agencyId: agencyId,
              topUp: topUp,
              token: token,
            }}
          />
        </div>
      </div>
      <div className="state">
        <div className="state__item done">
          <FaCheck className="state__icon" />
        </div>
        <div className="state__line"></div>
        <div className="state__item active">
          <FaMoneyBill className="state__icon" />
        </div>
        <div className="state__line"></div>
        <div className="state__item ">
          <FaList className="state__icon" />
        </div>
      </div>
    </div>
  );
}
