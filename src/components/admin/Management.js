import React, { useState } from "react";
import "../../scss/AdminManage.scss";

export default function Management() {
  const [isOpenMal, setIsOpenModal] = useState(false);

  return (
    <div className="admin__manage_container">
      <div onClick={() => setIsOpenModal(true)}>Open modal</div>
      {isOpenMal ? (
        <div className="admin__manage_modal">
          <div className="modal">
            <div>this is modal</div>
            <div onClick={() => setIsOpenModal(false)}>close this modal</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
