import { useState } from "react";
import { Periods } from "../constants/periods";

function TimeframeSelector({ handleTimeframeChange }) {
  const [activeTimeframe, setActiveTimeframe] = useState("1-minute");
  return (
    <div className="timeframe-selector">
      <ul className="timeframe-list">
        {Periods.map((period) => {
          return (
            <li
              key={period.key}
              className={`timeframe-item ${
                activeTimeframe === period.key ? "timeframe-item--active" : ""
              }`}
              onClick={() => {
                setActiveTimeframe(period.key);
                handleTimeframeChange(period.key);
              }}
            >
              {period.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TimeframeSelector;
