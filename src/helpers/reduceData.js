import moment from "moment";
export const reduceData = (apiResult) => {
  return apiResult.filter((item) => {
    const parsed = moment(item.Date, "YYYY/MM/DD HH:mm:ss");
    return parsed.hours() === 9 && parsed.day() === 1;
  });
};
