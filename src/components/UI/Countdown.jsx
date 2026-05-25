import React from "react";

const Countdown = ({ expiration, startTime }) => {
  let millisElapsed = Date.now() - startTime;
  let timeRemain = expiration - millisElapsed;
  let secRemain = timeRemain / 1000;
  let minRemain = secRemain / 60;
  let hourRemain = minRemain / 60;

  const padTimer = (integer, length) => {
    return Math.floor(integer).toString().padStart(length, "0");
  };

  let obj = {
    h: padTimer(hourRemain % 24, 1),
    m: padTimer(minRemain % 60, 2),
    s: padTimer(secRemain % 60, 2),
  };

  return obj;
  // <>
  //   {padTimer(hourRemain % 24, 1) + "h"} {padTimer(minRemain % 60, 2) + "m"}{" "}
  //   {padTimer(secRemain % 60, 2) + "s"}
  // </>
};

export default Countdown;
