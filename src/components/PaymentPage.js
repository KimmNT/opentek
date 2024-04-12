import React from "react";
import "../scss/Payment.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaCoins,
  FaList,
  FaMoneyBill,
  FaAngleLeft,
  FaCheck,
  FaUniversity,
  FaCreditCard,
} from "react-icons/fa";

export default function PaymentPage() {
  const navigate = useNavigate();

  const navigateToPage = (pageUrl) => {
    navigate(pageUrl);
  };
  const location = useLocation();
  const { productId, productName, productImage, productPrice, userBalance } =
    location.state;
  // const productId = useParams()
  return (
    <div className="payment__container">
      <div className="payment__header">
        <Link to={"/homepage"} className="header__back">
          <FaAngleLeft className="header__back_icon" />
        </Link>
        <div className="header__title">Checkout Order</div>
      </div>
      <div className="payment__content">
        <div className="payment__summary">
          <div className="payment__summary_content">
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
        <div className="payment__method">
          <Link
            to={`/payment-cash`}
            state={{
              productId: productId,
              productName: productName,
              productImage: productImage,
              productPrice: productPrice,
              userBalance: userBalance,
            }}
            className="method__item"
          >
            <FaMoneyBill className="method__icon" />
            <div className="method__title cash">cash</div>
          </Link>
          <Link
            to={`/payment-gtc`}
            state={{
              productId: productId,
              productName: productName,
              productImage: productImage,
              productPrice: productPrice,
              userBalance: userBalance,
            }}
            className="method__item"
          >
            <div className="method__coin">
              <div className="method__coin_balance">{userBalance}</div>
            </div>
            <div className="method__title gtc">gtc</div>
          </Link>
          <Link
            to={`/payment-banking`}
            state={{
              productId: productId,
              productName: productName,
              productImage: productImage,
              productPrice: productPrice,
              userBalance: userBalance,
            }}
            className="method__item"
          >
            <div className="method__title vnpay">
              <span className="vnpay__vn">VN</span>PAY
            </div>
          </Link>
        </div>
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
      <div onClick={() => navigateToPage("/scanqrcode")} className="logout">
        Log out (01:59)
      </div>
    </div>
  );
}
