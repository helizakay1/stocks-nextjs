import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Overview({ data, timeSpan }) {
  const XAxisCategories = data.map(
    (item) => `${item.StartDate} ${item.StartTime}`
  );
  const seriesData = data.map((item) => item.Close);

  const options = {
    title: {
      text: "",
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    xAxis: {
      categories: XAxisCategories,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        data: seriesData,
      },
    ],
    accessibility: {
      enabled: false,
    },
  };

  return (
    <div className="overview">
      {data.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <p className="no-data">{`No updates on the last ${timeSpan}`}</p>
      )}
    </div>
  );
}

export default Overview;
