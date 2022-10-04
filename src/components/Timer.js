import React, { useEffect, useState } from "react";
import { formatTime, getCount } from "./utils/utils";


function Timer ({ chars, start, sendTime }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (start && getCount(chars) > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      if (time > 0) sendTime(time);
    }
    
    return () => clearInterval(interval);
  }, [chars, start]);

  return (
    <div id="timer">
      {formatTime(time)}
    </div>
  )
}

export default Timer;