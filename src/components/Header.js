import { useEffect, useState, useRef } from "react";
import { BsTriangleFill } from "react-icons/bs";
import moment from "moment";

function Header() {
  const PAGE_TITLE = "Apple Inc";
  const WEB_SOCKET_URL = "wss://wstest.fxempire.com?token=btctothemoon";

  const [data, setData] = useState({
    last: "",
  });
  const ws = useRef(null); // web socket ref
  useEffect(() => {
    if (!ws.current) {
      let socket = new WebSocket(WEB_SOCKET_URL);

      socket.onopen = () => {
        socket.send(
          JSON.stringify({ type: "SUBSCRIBE", instruments: ["s-aapl"] })
        );
      };
      socket.onmessage = (e) => {
        setData(JSON.parse(e.data)["s-aapl"]);
      };

      //Unsubscribe and close socket when leaving the page
      window.onbeforeunload = () => {
        socket.send(
          JSON.stringify({ type: "UNSUBSCRIBE", instruments: ["s-aapl"] })
        );
        socket.close();
      };

      ws.current = socket;
    }
  }, []);

  const toUTCString = (time) => {
    return `${moment(time).utc().format("MMM DD, YYYY HH:mm")} UTC`;
  };

  const toStringWithSign = (number) => {
    return +number > 0 ? `+${number}` : number;
  };

  return (
    <div className="header">
      <div className="left-container">
        <h1 className="title">{PAGE_TITLE}</h1>
        {data?.lastUpdate && (
          <h3 className="last-updated">
            {`As of: ${toUTCString(data.lastUpdate)} `}
          </h3>
        )}
      </div>
      <div className="right-container">
        {data?.last && <h1 className="price">{data.last}</h1>}
        {data?.change && (
          <div className={`${+data.change > 0 ? "green" : "red"}`}>
            <BsTriangleFill
              className={`triangle-icon ${+data.change < 0 ? "reverse" : ""}`}
            />
            <h2 className="change change-abolute">
              {toStringWithSign(+data.change)}
            </h2>
            <h2 className="change change-percent">
              {`${toStringWithSign(+data.percentChange)}%`}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
