import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBox,
  FaCoins,
  FaList,
  FaMoneyBill,
  FaCheck,
  FaExclamation,
  FaTimes,
} from "react-icons/fa";
import "../scss/TransResult.scss";

export default function TransFail() {
  const navigate = useNavigate();

  const navigateToPage = (pageUrl) => {
    navigate(pageUrl);
  };

  return (
    <div className="transcom__container">
      <div className="transcom__content">
        <div className="transcom__header">transaction failed</div>
        <div className="transcom__result">
          <div className="transcom__icon_box error">
            <FaExclamation className="transcom__icon" />
          </div>
          <div className="confirm__waiting">
            <div className="confirm__waiting_text">
              There was an issue while processing your transaction <br />
              We apologize for this inconvenience
              <br />
              Please try again later
            </div>
          </div>
          <div className="transcom__btn_box">
            {/* <div
              onClick={() => navigateToPage("/scanqrcode")}
              className="transcom__btn cancel"
            >
              Cancel
            </div> */}
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
        <div className="state__item done">
          <FaCheck className="state__icon" />
        </div>
        <div className="state__line"></div>
        <div className="state__item done">
          <FaCheck className="state__icon" />
        </div>
        <div className="state__line"></div>
        <div className="state__item error">
          <FaTimes className="state__icon" />
        </div>
      </div>
      <div className="count__down">Log out in 01:59s</div>
    </div>
  );
}
