import React, { useState } from "react";
import "../../scss/AdminLogin.scss";

export default function AdminLogin() {
  const [isOpenMal, setIsOpenModal] = useState(false);

  return (
    <div className="admin">
      <div>Open modal</div>
      {isOpenMal ? <div>this is modal</div> : <></>}
    </div>
  );
}
