import { useState } from "react";
import moment from "moment";
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc";

function History({ data }) {
  const [sortKey, setSortKey] = useState("Date");
  const [sortDirection, setSortDirection] = useState(true);
  const TABLE_COLUMNS = ["Date", "High", "Low", "Open", "Close"];

  const sortFunc = (a, b) => {
    if (sortDirection) {
      if (a[sortKey] < b[sortKey]) {
        return -1;
      } else if (a[sortKey] > b[sortKey]) {
        return 1;
      } else {
        return 0;
      }
    } else {
      if (a[sortKey] > b[sortKey]) {
        return -1;
      } else if (a[sortKey] < b[sortKey]) {
        return 1;
      } else {
        return 0;
      }
    }
  };

  const formatTableDate = (date) => {
    return moment(date, "YYYY/MM/DD HH:mm:ss").format("MMM D, YYYY HH:mm");
  };

  return (
    <div className="history">
      <table id="history-table">
        <tbody>
          <tr>
            {TABLE_COLUMNS.map((col, index) => (
              <th key={index}>
                <div className="flex-row">
                  <span className="col-label">{col}</span>
                  <span className="flex-col">
                    <VscTriangleUp
                      onClick={() => {
                        setSortDirection(true);
                        setSortKey(col);
                      }}
                      className={`clickable ${
                        sortKey === col && sortDirection ? "" : "grey"
                      }`}
                    />
                    <VscTriangleDown
                      onClick={() => {
                        setSortDirection(false);
                        setSortKey(col);
                      }}
                      className={`clickable ${
                        sortKey === col && !sortDirection ? "" : "grey"
                      }`}
                    />
                  </span>
                </div>
              </th>
            ))}
          </tr>
          {data.sort(sortFunc).map((dataLine, index) => {
            let { Date, High, Low, Open, Close } = dataLine;
            Date = formatTableDate(Date);
            return (
              <tr key={index}>
                <td>{Date}</td>
                <td>{High}</td>
                <td>{Low}</td>
                <td>{Open}</td>
                <td>{Close}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default History;
