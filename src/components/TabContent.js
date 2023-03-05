import { useEffect, useState, useRef } from "react";
import TimeframeSelector from "./TimeframeSelector";
import Overview from "./Overview";
import History from "./History";
import moment from "moment";
import { TabsEnum } from "../constants/tabs";
import { Periods } from "../constants/periods";
import { reduceData } from "../helpers/reduceData";

function TabContent({ content }) {
  const [period, setPeriod] = useState(1);
  const [precision, setPrecision] = useState("Minutes");
  const [startTime, setStartTime] = useState(
    moment().subtract(1, "hour").format("MM/DD/YYYY%20HH:mm")
  );
  const [endTime, setEndTime] = useState(moment().format("MM/DD/YYYY%20HH:mm"));
  const [timeSpan, setTimeSpan] = useState("day");
  const [stockData, setStockData] = useState([]);
  const [reduce, setReduce] = useState(false);

  const cache = useRef({});

  useEffect(() => {
    if (!cache.current[`${period}${precision}${startTime}${endTime}`]) {
      // API CALL
      fetch(
        `https://test.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=${period}&Precision=${precision}&StartTime=${startTime}&EndTime=${endTime}&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume`
      )
        .then((response) => response.json())
        .then((result) => {
          if (reduce) {
            const reducedResult = reduceData(result);
            cache.current[`${period}${precision}${startTime}${endTime}`] =
              reducedResult;
            setStockData(reducedResult);
          } else {
            cache.current[`${period}${precision}${startTime}${endTime}`] =
              result;
            setStockData(result);
          }
        });
    } else {
      // GET FROM CACHE
      setStockData(
        cache.current[`${period}${precision}${startTime}${endTime}`]
      );
    }
  }, [period, precision, startTime, endTime]);

  const handleTimeframeChange = (timeFrameString) => {
    const current = Periods.find((p) => p.key === timeFrameString);

    setPeriod(current.period);
    setPrecision(current.precision);
    setTimeSpan(current.timeSpan);
    setStartTime(
      moment().subtract(1, current.timeSpan).format("MM/DD/YYYY%20HH:mm")
    );
    setEndTime(moment().format("MM/DD/YYYY%20HH:mm"));
    setReduce(current.reduce);
  };

  return (
    <div className="tab-content">
      <TimeframeSelector handleTimeframeChange={handleTimeframeChange} />
      <div className="tab-component">
        {content === TabsEnum.Overview && (
          <Overview data={stockData} timeSpan={timeSpan} />
        )}
        {content === TabsEnum.History && <History data={stockData} />}
      </div>
    </div>
  );
}

export default TabContent;
