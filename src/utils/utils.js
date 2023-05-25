/**
 * Function to convert currency to SGD - Will edit to make change for all currency in the future
 */
export const currencyFormatter = (currency) =>
  new Intl.NumberFormat(undefined, {
    currency: currency ? currency : "sgd",
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

export const getYtdTotalExpense = (transactions) => {
  const total = transactions.reduce((acc, i) => {
    if (i.Category.IncomeExpenseId === 1) {
      return acc + +i.amount;
    }
    return acc + 0;
  }, 0);
  return total;
};
export const getYtdTotalIncome = (transactions) => {
  const total = transactions.reduce((acc, i) => {
    if (i.Category.IncomeExpenseId === 2) {
      return acc + +i.amount;
    }
    return acc + 0;
  }, 0);
  return total;
};

/**
 * Function that gets total amount by month
 * @params {object} transactions
 * @returns {object}
 */
export const getTransactionsByMonth = (transactions, incomeExpenseId) => {
  const expensesArray = [];
  const date = new Date().getMonth();
  if (incomeExpenseId === 1) {
    for (let month = 0; month <= 11; month++) {
      const totalWithinMonth = transactions.reduce((acc, currentValue) => {
        const date = new Date(currentValue.date).getMonth();
        if (date === month && currentValue.Category.IncomeExpenseId === 1) {
          return acc + +currentValue.amount;
        }
        return acc + 0;
      }, 0);
      if (totalWithinMonth === 0) {
        if (month < date) {
          expensesArray.push(0);
        } else {
          expensesArray.push(null);
        }
      } else {
        expensesArray.push(totalWithinMonth.toFixed(2));
      }
    }

    return expensesArray;
  } else {
    for (let month = 0; month <= 11; month++) {
      const totalWithinMonth = transactions.reduce((acc, currentValue) => {
        const date = new Date(currentValue.date).getMonth();
        if (date === month && currentValue.Category.IncomeExpenseId === 2) {
          return acc + +currentValue.amount;
        }
        return acc + 0;
      }, 0);
      if (totalWithinMonth === 0) {
        if (month < date) {
          expensesArray.push(0);
        } else {
          expensesArray.push(null);
        }
      } else {
        expensesArray.push(totalWithinMonth);
      }
    }

    return expensesArray;
  }
};

/**
 * Function that get top category spends
 * @param {*} transactions
 * @returns {object}
 */
export const getTopExpensesByCat = (transactions) => {
  const treemapArray = [];
  const categories = combineExpenseCategoryAmounts(transactions);
  for (const category of categories) {
    const dataMap = { x: null, y: null };
    dataMap.x = category[0];
    dataMap.y = +category[1];
    treemapArray.push(dataMap);
  }
  return treemapArray;
};

// check if transactions contains expense
export const checkIfContainIncomeOrExpense = (transactions, selection) => {
  let state = false;
  for (const transaction of transactions) {
    // console.log(transaction);
    if (selection === "expense" && transaction.Category.incomeExpenseId === 1) {
      state = true;
    } else if (
      selection === "income" &&
      transaction.Category.incomeExpenseId === 2
    ) {
      state = true;
    }
  }
  return state;
};

export const getGroupedCategories = (categories) => {
  let categoryLists;
  if (categories.Categories) {
    categoryLists = categories.Categories.map((cat) => ({
      value: cat.id,
      label: cat.name,
    }));
  }
  let expenseCategories;
  if (categories.Categories) {
    expenseCategories = categories.Categories.map(
      (cat) =>
        cat.incomeExpenseId === 1 && {
          value: cat.id,
          label: cat.name,
        }
    ).filter((cat) => cat !== false);
  }
  let incomeCategories;
  if (categories.Categories) {
    incomeCategories = categories.Categories.map(
      (cat) =>
        cat.incomeExpenseId === 2 && {
          value: cat.id,
          label: cat.name,
        }
    ).filter((cat) => cat !== false);
  }
  let groupedOptions;
  if (categories.Categories) {
    groupedOptions = [
      {
        label: "Expense",
        options: expenseCategories,
      },
      {
        label: "Income",
        options: incomeCategories,
      },
    ];
  }
  return [groupedOptions, categoryLists];
};
