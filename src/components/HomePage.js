import React from "react";
import productDB from "../productDB.json";
import "../scss/Home.scss";
import { FaBox, FaList, FaMoneyBill } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import Product from "./Product";
import CountDown from "./CountDown";

function HomePage(props) {
  const { state } = useLocation();
  const balance = state?.balance;
  const machineId = state?.machineId;
  const agencyId = state?.agencyId;
  const token = state?.token;

  const handelFormat = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const navigate = useNavigate();

  const navigateToPage = (pageUrl) => {
    navigate(pageUrl);
  };

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
              {handelFormat(balance)}
              <span className="currency">gt</span>
            </div>
          </div>
        </div>
        <Product
          data={productDB.products}
          balance={balance}
          machineId={machineId}
          agencyId={agencyId}
          token={token}
        />
      </div>
      <div className="state">
        <div className="state__item active">
          <FaBox className="state__icon" />
        </div>
        <div className="state__line"></div>
        <div className="state__item ">
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

export default HomePage;
