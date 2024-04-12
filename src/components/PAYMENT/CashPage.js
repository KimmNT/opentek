import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaList, FaMoneyBill, FaAngleLeft, FaCheck } from "react-icons/fa";
import "../../scss/PaymentMethod.scss";

export default function CashPage() {
  const navigate = useNavigate();

  const navigateToPage = (pageUrl) => {
    navigate(pageUrl);
  };
  const location = useLocation();
  const { productId, productName, productImage, productPrice, userBalance } =
    location.state;

  const topUp = 7500;

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
        <div className="header__title">Payment - Cash</div>
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
          <div className="method__cash_topup">
            <div className="method__cash_topup_headline">Top up</div>
            <div className="method__cash_topup_number">
              {topUp}
              <span className="currency">GT</span>
            </div>
          </div>
          {topUp - productPrice >= 0 ? (
            <>
              <div className="method__cash_notice">
                Please notice!
                <br />
                We will not refund any remaining money <br /> after the
                transaction completed
              </div>
              <div
                onClick={() => navigateToPage("/trans-completed")}
                className="method__cash_enough"
              >
                continue
              </div>
            </>
          ) : (
            <>
              <div className="method__cash_notice">
                Please notice!
                <br />
                We will not refund any remaining money <br /> after the
                transaction completed
              </div>
              <div className="method__cash">
                <div className="method__bank_notch">
                  <div className="bank__notch_mouth"></div>
                </div>
                <div className="cash">
                  <FaMoneyBill className="cash__icon" />
                </div>
              </div>
            </>
          )}
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
      <div className="method__waiting">
        <div className="method__waiting_text">
          Waiting for the transaction to be completed
        </div>
        <div className="count__down">(01:59s)</div>
      </div>
    </div>
  );
}
