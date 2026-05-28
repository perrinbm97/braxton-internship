import React, { useEffect, useState } from "react";

const Timer = ({ expiration }) => {
  const [startTime] = useState(Date.now());
  const [time, setTime] = useState(expiration - startTime);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (time <= 0) {
      setIsFinished(true);
      return;
    }

    const intervalId = setInterval(() => {
      setTime((prev) => prev - 1000);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time]);

  function padTimer(integer, length) {
    return Math.floor(integer).toString().padStart(length, "0");
  }

  const formatTime = (milliseconds) => {
    let total_secs = Math.floor(milliseconds / 1000);
    let total_mins = Math.floor(total_secs / 60);
    let total_hours = Math.floor(total_mins / 60);

    let sec_display = padTimer(total_secs % 60, 2);
    let min_display = padTimer(total_mins % 60, 2);
    let hour_display = padTimer(total_hours % 24, 1);

    return isFinished
      ? "Expired"
      : `${hour_display}h : ${min_display}m : ${sec_display}s`;
  };

  return formatTime(time);
};

export default Timer;
