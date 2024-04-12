import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaList,
  FaMoneyBill,
  FaAngleLeft,
  FaCheck,
  FaQrcode,
  FaCoins,
} from "react-icons/fa";
import "../../scss/GTCwithCash.scss";
import { useNavigate } from "react-router-dom";

export default function GTCwithCash() {
  const navigate = useNavigate();

  const navigateToPage = (pageUrl) => {
    navigate(pageUrl);
  };

  const location = useLocation();
  const { productId, productName, productImage, productPrice, userBalance } =
    location.state;

  const topUp = 10000;

  return (
    <div className="method__container">
      <div className="method__header">
        <Link
          to={`/detail/${productId}`}
          state={{
            productId: productId,
            productName: productName,
            productImage: productImage,
            productPrice: productPrice,
            userBalance: userBalance,
          }}
          className="header__back"
        >
          <FaAngleLeft className="header__back_icon" />
        </Link>
        <div className="header__title">Payment - GTC</div>
      </div>
      <div className="method__content">
        <div className="method__summary">
          <div className="method__summary_content">
            <img
              src={productImage}
              alt={productName}
              className="summary__image"
            />
            <div className="summary__info">
              <div className="summary__price">
                <div className="info__item">{productName}</div>
                <div className="info__item">
                  {productPrice}
                  <span className="currency">GT</span>
                </div>
              </div>
              <div className="summary__line"></div>
              <div className="summary__total">
                <div className="info__total">Total</div>
                <div className="info__total">
                  {productPrice}
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
                  {userBalance}
                  <span className="currency">GT</span>
                </div>
              </div>
            </div>
            <div className="gtc__line"></div>
            <div className="gtc__item">
              <div className="gtc__headline">Top up</div>
              <div className="gtc__coin">
                <div className="gtc__coin_number">
                  {topUp}
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
                    topUp + userBalance - productPrice >= 0
                      ? "gtc__coin_number"
                      : "gtc__coin_number error"
                  }
                >
                  {topUp + userBalance - productPrice}
                  <span className="currency">GT</span>
                </div>
              </div>
            </div>
          </div>
          {topUp + userBalance - productPrice >= 0 ? (
            <div className="addcash__done">
              <div className="addcash__done_headline">
                Please notice!
                <br />
                We will not refund any remaining money <br /> after the
                transaction completed
              </div>
              <div
                onClick={() => navigateToPage("/trans-completed")}
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
        <div className="count__down">(01:59s)</div>
      </div>
      <div className="state">
        <div className="state__item active">
          <FaCheck className="state__icon" />
        </div>
        <div className="stat__line"></div>
        <div className="state__item active">
          <FaMoneyBill className="state__icon" />
        </div>
        <div className="stat__line"></div>
        <div className="state__item ">
          <FaList className="state__icon" />
        </div>
      </div>
    </div>
  );
}
