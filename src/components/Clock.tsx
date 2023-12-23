// Clock.tsx

import { sendNotification } from "@tauri-apps/api/notification";
import React, { useState, useEffect } from "react";

interface ClockProps {
  start_timer: boolean;
  value: number;
}

const Clock: React.FC<ClockProps> = ({ start_timer, value }) => {
  const [timer, setTimer] = useState(value);

  useEffect(() => {
    // Start the timer when the component mounts and 'start_timer' is true
    if (start_timer) {
      if (timer === value) setTimer(value); // Set the initial timer value

      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer < 2) {
            sendNotification({
              title: `Time's up!`,
              body: `Congrats on completing a session!🎉`,
            });
            clearInterval(intervalId);
          }

          return prevTimer > 0 ? prevTimer - 1 : 0;
        });
      }, 1000); // Update every second (1000 milliseconds)

      // Cleanup: Stop the timer when the component unmounts or 'start_timer' becomes false
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [start_timer, value]); // Dependency on 'start_timer' and 'value'

  useEffect(() => {
    // Update the timer whenever the 'value' prop changes
    setTimer(value);
  }, [value]);

  return (
    <div>
      <h1 className="timer">
        {Math.floor(timer / 60) < 10
          ? `0${Math.floor(timer / 60)}`
          : Math.floor(timer / 60)}
        :{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
      </h1>
    </div>
  );
};

export default Clock;
