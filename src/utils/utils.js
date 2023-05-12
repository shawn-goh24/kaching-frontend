/**
 * Function to convert currency to SGD - Will edit to make change for all currency in the future
 */
export const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: "sgd",
  style: "currency",
  minimumFractionDigits: 0,
});

/**
 * Function that converts date format to yyyy/mmm/dd
 * @param {date} date
 * @returns {string}
 */
export const yyyyMmDdConverter = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

/**
 *
 * @param {object} transactions
 * @returns {object} new map
 */
export const combineExpenseCategoryAmounts = (transactions) => {
  const categoryAmountSet = transactions.reduce((set, transaction) => {
    const category = transaction.Category.name;
    const amount = +transaction.amount;
    if (transaction.Category.incomeExpenseId === 1) {
      if (!set.has(category)) {
        set.set(category, 0);
      }
      set.set(category, set.get(category) + amount);
    }
    return set;
  }, new Map());
  // console.log(categoryAmountSet);
  return categoryAmountSet;
};
export const combineIncomeCategoryAmounts = (transactions) => {
  const categoryAmountSet = transactions.reduce((set, transaction) => {
    const category = transaction.Category.name;
    const amount = +transaction.amount;
    if (transaction.Category.incomeExpenseId === 2) {
      if (!set.has(category)) {
        set.set(category, 0);
      }
      set.set(category, set.get(category) + amount);
    }
    return set;
  }, new Map());
  // console.log(categoryAmountSet);
  return categoryAmountSet;
};

export const getExpenseCategoryColor = (transactions) => {
  const categoryColorSet = transactions.reduce((set, transaction) => {
    const category = transaction.Category.name;
    const color = transaction.Category.color;
    if (transaction.Category.incomeExpenseId === 1) {
      if (!set.has(category)) {
        set.set(category, color);
      }
    }
    return set;
  }, new Map());
  return categoryColorSet;
};
export const getIncomeCategoryColor = (transactions) => {
  const categoryColorSet = transactions.reduce((set, transaction) => {
    const category = transaction.Category.name;
    const color = transaction.Category.color;
    if (transaction.Category.incomeExpenseId === 2) {
      if (!set.has(category)) {
        set.set(category, color);
      }
    }
    return set;
  }, new Map());
  return categoryColorSet;
};
