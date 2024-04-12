import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBox, FaCoins, FaList, FaMoneyBill, FaCheck } from "react-icons/fa";
import "../scss/TransResult.scss";

export default function TransSuccess() {
  const navigate = useNavigate();

  const navigateToPage = (pageUrl) => {
    navigate(pageUrl);
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
              Would you like to continue shopping ?
            </div>
          </div>
          <div className="transcom__btn_box">
            <div
              onClick={() => navigateToPage("/scanqrcode")}
              className="transcom__btn cancel"
            >
              Cancel
            </div>
            <div
              onClick={() => navigateToPage("/homepage")}
              className="transcom__btn continue"
            >
              Continue
            </div>
          </div>
        </div>
      </div>
      <div className="state">
        <div className="state__item active">
          <FaCheck className="state__icon" />
        </div>
        <div className="stat__line"></div>
        <div className="state__item active">
          <FaCheck className="state__icon" />
        </div>
        <div className="stat__line"></div>
        <div className="state__item active">
          <FaCheck className="state__icon" />
        </div>
      </div>
      <div className="count__down">Log out in 01:59s</div>
    </div>
  );
}
