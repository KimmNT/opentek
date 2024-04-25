import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../scss/AdminLogin.scss";
import { useNavigate } from "react-router-dom";
import LoginThumb from "../../images/loginThumb.jpg";
import CountDown from "../CountDown";

export default function AdminLogin() {
  ///LOGIN
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMachineId, setIsMachineId] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const navigate = useNavigate();

  const navigateToPage = (pageUrl, stateData) => {
    navigate(pageUrl, { state: stateData });
  };

  const DBurl = "http://localhost:5000";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${DBurl}/login`, { username, password });
      if (res.data.success) {
        // Login successful, you can redirect the user or do something else
        console.log("Login successful");
        setUserInfo(res.data.result);
        setIsMachineId(true);
      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setErrorMessage("An error occurred while logging in");
    }
  };

  useEffect(() => {
    if (isMachineId) {
      navigateToPage("/admin-management", { userInfo: userInfo });
    }
  }, [isMachineId]);

  return (
    <div className="admin__login_container">
      {/* {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>} */}
      <div className="logo">
        ope<span className="logo_hl">n</span>tek
      </div>
      <div className="admin__login_content">
        <div className="admin__login_image">
          <img src={LoginThumb} className="image" />
        </div>
        <div className="admin__login_form">
          <div className="admin__login_header">
            Login
            <br />
            <span className="admin__login_header_reminder">
              Use your admin account to login
            </span>
          </div>
          <div className="admin__login_entering">
            <div className="admin__login_input">
              <label className="input__title">Username</label>
              <input
                className="input__field"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="admin__login_input">
              <label className="input__title">Password</label>
              <input
                className="input__field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div onClick={handleLogin} className="admin__login_btn">
            Login
          </div>
        </div>
      </div>
      <div onClick={() => navigateToPage("/scanqrcode")} className="logout">
        <div>log out</div>
        <CountDown pathPage={"/scanqrcode"} />
      </div>
    </div>
  );
}
