import React, { useState } from "react";
import "../../scss/AdminBoxes.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

export default function BoxesControl() {
  const [isOpenBox, setIsOpenBox] = useState(false);
  const [isOpenAll, setIsOpenAll] = useState(false);
  const [userPIN, setUserPIN] = useState(0);
  const [isPIN, setIsPIN] = useState("");
  const [slot, setSlot] = useState(0);

  const { state } = useLocation();
  const userInfo = state?.userInfo;

  const navigate = useNavigate();

  const navigateToPage = (pageUrl, stateData) => {
    navigate(pageUrl, { state: stateData });
  };

  let allSlots = [
    { productSlot: 1 },
    { productSlot: 2 },
    { productSlot: 3 },
    { productSlot: 4 },
    { productSlot: 5 },
    { productSlot: 6 },
    { productSlot: 7 },
    { productSlot: 8 },
    { productSlot: 9 },
    { productSlot: 10 },
    { productSlot: 11 },
    { productSlot: 12 },
    { productSlot: 13 },
    { productSlot: 14 },
    { productSlot: 15 },
    { productSlot: 16 },
    { productSlot: 17 },
    { productSlot: 18 },
    { productSlot: 19 },
    { productSlot: 20 },
  ];

  //OPEN BOX BY SLOT
  const handleOpenBox = () => {
    if (userPIN == userInfo.userPIN) {
      console.log(`OPEN BOX: ${slot}`);
      setIsOpenAll(false);
      setUserPIN(0);
      setIsPIN("");
    } else {
      setIsPIN("Incorrect PIN. Please try again!");
      setUserPIN(0);
    }
  };

  //OPEN ALL BOXES
  const handleOpenAllBoxes = () => {
    if (userPIN == userInfo.userPIN) {
      console.log(`ALL BOXES IS OPENED`);
      setIsOpenAll(false);
      setUserPIN(0);
      setIsPIN("");
    } else {
      setIsPIN("Incorrect PIN. Please try again!");
      setUserPIN(0);
    }
  };

  return (
    <div className="boxes__container">
      <div className="boxes__header">
        <div
          onClick={() =>
            navigateToPage("/admin-management", {
              userInfo: userInfo,
            })
          }
          className="header__back"
        >
          <FaAngleLeft className="header__back_icon" />
        </div>
        <div className="header__title">Open Boxes</div>
      </div>
      <div className="boxes__content">
        <div className="boxes__list">
          {allSlots.map((item, index) => (
            <div
              key={index}
              className="box__number"
              onClick={() => {
                setIsOpenBox(true);
                setSlot(item.productSlot);
              }}
            >
              <div className="number">{item.productSlot}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="open__all">
        <div className="open__all_text" onClick={() => setIsOpenAll(true)}>
          open all
        </div>
      </div>
      {isOpenBox ? (
        <div className="modal">
          <div className="modal__content">
            <div className="open__container">
              <div className="open__header">
                Please enter PIN to open box - {slot} <br />
                <span className="open__header_recommend">
                  Your 6 digits number
                </span>
              </div>
              <div className="open__pin">
                <input
                  type="password"
                  placeholder="enter your PIN"
                  value={userPIN}
                  onChange={(e) => setUserPIN(e.target.value)}
                />
                <div className="open__pin_status">{isPIN}</div>
              </div>
              <div className="open__controller">
                <div
                  className="open__btn cancel"
                  onClick={() => setIsOpenBox(false)}
                >
                  Cancel
                </div>
                <div className="open__btn confirm" onClick={handleOpenBox}>
                  OK
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {isOpenAll ? (
        <div className="modal">
          <div className="modal__content">
            <div className="open__container">
              <div className="open__header">
                Please enter PIN to open all boxes
                <br />
                <span className="open__header_recommend">
                  Your 6 digits number
                </span>
              </div>
              <div className="open__pin">
                <input
                  type="password"
                  placeholder="enter your PIN"
                  value={userPIN}
                  onChange={(e) => setUserPIN(e.target.value)}
                />
                <div className="open__pin_status">{isPIN}</div>
              </div>
              <div className="open__controller">
                <div
                  className="open__btn cancel"
                  onClick={() => setIsOpenAll(false)}
                >
                  Cancel
                </div>
                <div className="open__btn confirm" onClick={handleOpenAllBoxes}>
                  OK
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
