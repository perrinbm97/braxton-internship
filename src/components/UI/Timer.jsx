import React, { useEffect, useState } from "react";

const Timer = ({ expiration, startTime }) => {
  const [secs, setSecs] = useState(expiration - startTime);

  useEffect(() => {
    if (secs <= 0) return;

    const intervalId = setInterval(() => {
      setSecs((prev) => prev-1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secs]);

  return secs;
};

export default Timer;
