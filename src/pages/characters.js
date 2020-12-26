import React, { useEffect, useState } from "react";

const Characters = () => {
  const [displayName, setDisplayName] = useState("");
  useEffect(() => {
    const ws = new WebSocket("wss://pubsub-edge.twitch.tv");
    ws.addEventListener("open", () => {
      console.log("we are connected");

      const pingInterval = setInterval(() => {
        ws.send(JSON.stringify({ type: "PING" }));
      }, 25000);
      ws.send(
        JSON.stringify({
          type: "LISTEN",
          nonce: "44h1k13746815ab1r2",
          data: {
            topics: [
              `channel-points-channel-v1.${process.env.TWITCH_CHANNEL_ID}`,
            ],
            auth_token: process.env.TWITCH_OAUTH_POINTS,
          },
        })
      );
      return () => pingInterval;
    });
    ws.addEventListener("message", data => {
      let pointsObject = JSON.parse(data.data);

      if (pointsObject.data && pointsObject.data.message) {
        console.log(JSON.parse(pointsObject.data.message));
        setDisplayName(
          JSON.parse(pointsObject.data.message).data.redemption.user
            .display_name
        );
      }
    });
  }, []);

  //TODO: Ping every 5 minutes to save connection

  return (
    <div>
      {displayName !== "" ? <p>{displayName}</p> : <p>Wykup punkty mordo</p>}
    </div>
  );
};

export default Characters;
