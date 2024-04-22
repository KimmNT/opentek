import React from "react";
import "../scss/Payment.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaList, FaMoneyBill, FaAngleLeft, FaCheck } from "react-icons/fa";
import CountDown from "./CountDown";

export default function PaymentPage() {
  const navigate = useNavigate();

  const navigateToPage = (pageUrl, stateData) => {
    navigate(pageUrl, { state: stateData });
  };

  const { state } = useLocation();
  // const transactionDetail = state?.transactionDetail;
  const productInfo = state?.productInfo;
  const machineId = state?.machineId;
  const agencyId = state?.agencyId;
  const token = state?.token;
  const balance = state?.balance;

  const handelFormat = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  return (
    <div className="payment__container">
      <div className="payment__header">
        <div
          onClick={() =>
            navigateToPage("/homepage", {
              balance: balance,
              machineId: machineId,
              agencyId: agencyId,
              token: token,
            })
          }
          className="header__back"
        >
          <FaAngleLeft className="header__back_icon" />
        </div>
        <div className="header__title">Checkout Order</div>
      </div>
      <div className="payment__content">
        <div className="payment__summary">
          <div className="payment__summary_content">
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
        <div className="payment__method">
          <div
            className="method__item"
            onClick={() =>
              navigateToPage("/payment-cash", {
                productInfo: productInfo,
                machineId: machineId,
                agencyId: agencyId,
                token: token,
                balance: balance,
              })
            }
          >
            <FaMoneyBill className="method__icon" />
            <div className="method__title cash">cash</div>
          </div>
          <div
            onClick={() =>
              navigateToPage("/payment-gtc", {
                productInfo: productInfo,
                machineId: machineId,
                agencyId: agencyId,
                token: token,
                balance: balance,
              })
            }
            className="method__item"
          >
            <div className="method__coin">
              <div className="method__coin_balance">
                {handelFormat(balance)}
              </div>
            </div>
            <div className="method__title gtc">gtc</div>
          </div>
          <div
            onClick={() =>
              navigateToPage("/payment-banking", {
                productInfo: productInfo,
                machineId: machineId,
                agencyId: agencyId,
                token: token,
                balance: balance,
              })
            }
            className="method__item"
          >
            <div className="method__title vnpay">
              <span className="vnpay__vn">VN</span>PAY
            </div>
          </div>
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
      <div onClick={() => navigateToPage("/scanqrcode")} className="logout">
        <div>log out</div>
        <CountDown pathPage={"/scanqrcode"} />
      </div>
    </div>
  );
}
