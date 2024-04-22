import React, { useEffect, useState } from "react";

export default function TestAPI() {
  const [createTrans, setCreateTrans] = useState(false);

  //HANDLE GET UNLOCK STATUS
  useEffect(() => {
    if (createTrans) {
      fetch(
        "https://gpc-api-demo-yy.3true.com/mac-api/selling-machine/purchase",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUyNDIsImlhdCI6MTcxMzMyMTc4OCwiZXhwIjoxNzEzNDA4MTg4fQ.MQ_2pVftn5n-wwD93s8PAWew0PJrF1Mfm4-HtyrEx94",
          },
          body: JSON.stringify({
            agencyId: 5,
            machineId: "VHI6268944",
            transaction: 1,
            slot: 6,
            value: 40000,
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
        })
        .catch((error) => {
          // Handle error
          console.error("There was an error!", error);
        });
    }
  }, [createTrans]);

  return (
    <div style={{ fontSize: 40 }}>
      <div onClick={() => setCreateTrans(true)}>Create a transaction</div>
    </div>
  );
}
