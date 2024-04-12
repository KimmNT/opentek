import React from "react";
import productDB from "../productDB.json";
import "../scss/Home.scss";
import { FaBox, FaCoins, FaList, FaMoneyBill } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Product from "./Product";

function HomePage(props) {
  const navigate = useNavigate();

  const navigateToPage = (pageUrl) => {
    navigate(pageUrl);
  };
  const balance = 5000;

  return (
    <div className="home__container">
      <div className="home__content">
        <div className="header">
          <div className="header__headline">
            <div className="headline__box"></div>
            <p className="headline__text">
              What would you
              <br />
              like to buy ?
            </p>
          </div>
          <div className="header__balance">
            <div className="balance__number">
              {balance}
              <span className="currency">gt</span>
            </div>
          </div>
        </div>
        <Product data={productDB.products} balance={balance} />
      </div>
      <div className="state">
        <div className="state__item active">
          <FaBox className="state__icon" />
        </div>
        <div className="stat__line"></div>
        <div className="state__item ">
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

export default HomePage;
