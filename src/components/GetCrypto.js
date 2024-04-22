import React, { useState } from "react";

export default function GetCrypto() {
  const [machineId, setMachineId] = useState("");
  const [agencyId, setAgencyId] = useState("");
  return (
    <div>
      <div>
        <h1>Encryt</h1>
        <div>
          <div>
            <div>Machine ID</div>
            <input
              placeholder="enter machineId"
              value={machineId}
              onChange={(e) => setMachineId(e.target.value)}
            />
          </div>
          <div>
            <div>Agency ID</div>
            <input
              placeholder="enter agencyId"
              value={agencyId}
              onChange={(e) => setAgencyId(e.target.value)}
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
