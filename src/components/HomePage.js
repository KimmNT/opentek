import React from "react";
import productDB from "../productDB.json";
import "../scss/Home.scss";
import { FaAngleRight, FaCoins } from "react-icons/fa";

function HomePage(props) {
  return (
    <div className="home__container">
      <div className="home__content">
        <div className="header">
          <div className="header__headline">
            <div className="headline__box"></div>
            <p>What would you like to buy ?</p>
          </div>
          <div className="header__balance">
            <FaCoins />
            <p className="balance__number">12345</p>
          </div>
        </div>
        <div className="product__list">
          {productDB.products.map((product) => (
            <div className="product__item" key={product.productId}>
              <p className="product__name">{product.productName}</p>
              <p className="product__price">{product.productPrice}</p>
              <div className="product__checkout_btn">
                <FaAngleRight className="checkout__icon" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
