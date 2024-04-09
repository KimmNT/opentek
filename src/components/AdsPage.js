import React from "react";
import { useNavigate } from "react-router-dom";
import "../scss/Ads.scss";
import VideoPlayer from "./Video";
import adsVideo from "../images/ads2.mp4";

function AdsPage(props) {
  const navigate = useNavigate();

  const navigateToPage = (pageUrl) => {
    navigate(pageUrl);
  };

  return (
    <div className="ads__container">
      <div
        onClick={() => navigateToPage("/scanqrcode")}
        className="ads__layer_click"
      ></div>
      <VideoPlayer src={adsVideo} />
    </div>
  );
}

export default AdsPage;
