import moment from "moment/moment";

function parseDate(dateStr) {
  return moment(dateStr).format("DD.MM.YY HH:mm:ss");
}

export default parseDate;