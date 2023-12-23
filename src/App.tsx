import "./App.css";
import Clock from "./components/Clock";
import { useState } from "react";
import { ask } from "@tauri-apps/api/dialog";

function App() {
  const [startTimer, setStartTimer] = useState(true);
  const [value, setValue] = useState(900);

  const triggerRestDialog = async () => {
    let shouldReset = await ask("Do you want to reset Timer?", {
      title: "Pomodoro Timer",
      type: "warning",
    });

    if (shouldReset) {
      setValue(0);
      setStartTimer(false);
    }
  };
  return (
    <div className="main">
      <h1>Pomodoro Timer</h1>
      <Clock start_timer={startTimer} value={value} />
      <div>
        <button
          className="btn btn-start"
          onClick={() => {
            setStartTimer(!startTimer);
          }}
        >
          {` ${!startTimer ? "Start" : "Stop"}`}
        </button>
        <button
          className="btn btn-reset"
          onClick={() => {
            triggerRestDialog();
          }}
        >
          Reset
        </button>
      </div>

      <div>
        <button
          className="btn-inc"
          value={900}
          onClick={(e) => {
            setValue(parseInt(e.currentTarget.value));
          }}
        >
          15 minutes
        </button>
        <button
          className="btn-inc"
          value={1800}
          onClick={(e) => {
            setValue(parseInt(e.currentTarget.value));
          }}
        >
          30 minutes
        </button>
        <button
          className="btn-inc"
          value={3600}
          onClick={(e) => {
            setValue(parseInt(e.currentTarget.value));
          }}
        >
          60 minutes
        </button>
      </div>
    </div>
  );
}

export default App;
