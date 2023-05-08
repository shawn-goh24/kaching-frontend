export const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: "sgd",
  style: "currency",
  minimumFractionDigits: 0,
});

export const yyyyMmDdConverter = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
