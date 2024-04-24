import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../scss/CountDown.scss";

const CountDown = ({ pathPage, data }) => {
  const [completedStatus, setCompletedStatus] = useState(null);
  const [timeOver, setTimeOver] = useState(false);

  // const pathPage = {};
  const navigate = useNavigate();

  const navigateToPage = (pageUrl, stateData) => {
    navigate(pageUrl, { state: stateData });
  };

  const [timeLeft, setTimeLeft] = useState(300); //seconds
  const [timeUp, setTimeUp] = useState(false);

  const getCurrentTime = () => {
    let currentDateTime = new Date();

    // Get the year, month, and day components
    let year = currentDateTime.getFullYear();
    // Months are zero-based, so we add 1 to get the correct month
    let month = currentDateTime.getMonth() + 1;
    let day = currentDateTime.getDate();

    // Pad single-digit months and days with a leading zero if needed
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    // Get the hour, minute, and second components
    let hour = currentDateTime.getHours();
    let minute = currentDateTime.getMinutes();
    let second = currentDateTime.getSeconds();

    // Pad single-digit hour, minute, and second with a leading zero if needed
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;

    let formattedTime = `${hour}:${minute}:${second}`;

    let time = `${year}-${month}-${day} ${formattedTime}`;

    return time;
  };

  // console.log(data.token);
  // console.log(data.topUp);
  // console.log(data.agencyId);
  // console.log(data.machineId);

  useEffect(() => {
    if (timeUp && data != null) {
      setTimeOver(true);
    } else if (timeUp) {
      navigateToPage(pathPage);
    }
  }, [timeUp]);

  useEffect(() => {
    if (timeOver) {
      fetch(
        "https://gpc-api-demo-yy.3true.com/mac-api/selling-machine/transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: data.token,
          },
          body: JSON.stringify({
            value: data.topUp,
            machineId: data.machineId,
            time: getCurrentTime(),
            agencyId: data.agencyId,
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Handle response data as needed
          console.log(data);
          setCompletedStatus(data.success);
        })
        .catch((error) => {
          // Handle error
          console.error("There was an error!", error);
        });
    }
  }, [timeOver]);

  useEffect(() => {
    if (completedStatus) {
      navigateToPage(pathPage);
    }
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 0) {
          clearInterval(intervalId);
          setTimeUp(true);
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // Runs only once after the component mounts

  // Format the remaining time into minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="count__container">
      <div className="count__text">
        ({minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds})
      </div>
    </div>
  );
};

export default CountDown;
