import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Box } from "@mui/material";
import TransactionCol from "./TransactionCol.js";
import BudgetModal from "../../components/form/BudgetModal.js";
import MonthSelection from "./MonthSelection.js";
import BudgetExpenseCol from "./BudgetExpenseCol.js";
import AddCategoryFab from "./AddCategoryFab.js";

export default function Home({ currUser, accessToken }) {
  const [date, setDate] = useState(new Date());
  const [budgetModal, setBudgetModal] = useState(false);
  const [userCategories, setUserCategories] = useState("");
  const [transactions, setTransactions] = useState("");
  const [budgets, setBudgets] = useState("");
  const [openAddTransactionModal, setOpenAddTransactionModal] = useState(false);

  // get all transactions from the user on current month and year
  const getUserTransactionsApi = async () => {
    if (accessToken) {
      const selectedDate = new Date(date);
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();
      let user = await axios.get(
        `http://localhost:8080/transaction/${currUser.id}/${month}/${year}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTransactions(user.data);
    }
  };

  // get all budgets from the user on current month and year
  const getBudgetApi = async () => {
    if (accessToken) {
      const selectedDate = new Date(date);
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();
      let user = await axios.get(
        `http://localhost:8080/budget/${currUser.id}/${month}/${year}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setBudgets(user.data);
    }
  };

  // get all categories owned by user from user route
  const getCategoriesApi = async () => {
    if (accessToken) {
      let categories = await axios.get(
        `http://localhost:8080/user/category/${currUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUserCategories(categories.data);
    }
  };

  // add new budget created by user
  const handleBudget = async (userId, category, date, amount) => {
    if (accessToken) {
      let newBudget = await axios.post(
        `http://localhost:8080/budget/add`,
        {
          userId: userId,
          categoryId: category.value,
          amount: amount,
          date: date,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setBudgets([...budgets, newBudget.data]);
    }
  };

  // upon loaded, get transaction/budget/categories from db
  useEffect(() => {
    getUserTransactionsApi();
    getBudgetApi();
    getCategoriesApi();
  }, [accessToken, date]);

  return (
    <Grid
      container
      rowGap={1}
      columnGap={6}
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
        }}
      >
        <MonthSelection date={date} setDate={setDate} />
      </Grid>
      <Grid item xs={12} md={4}>
        <BudgetExpenseCol
          transactions={transactions}
          budgets={budgets}
          userCategories={userCategories}
          accessToken={accessToken}
          setBudgetModal={setBudgetModal}
          getBudgetApi={getBudgetApi}
        />
      </Grid>
      <Grid item xs={12} md={6} sx={{ height: "100%" }}>
        <h2>Transactions</h2>
        <Box sx={{ height: "95%", overflowX: "scroll" }}>
          <TransactionCol
            currUser={currUser}
            accessToken={accessToken}
            openAddTransactionModal={openAddTransactionModal}
            setOpenAddTransactionModal={setOpenAddTransactionModal}
            date={date}
            transactions={transactions}
            setTransactions={setTransactions}
          />
        </Box>
      </Grid>
      <AddCategoryFab setOpenAddTransactionModal={setOpenAddTransactionModal} />
      <BudgetModal
        title="Add"
        budgetModal={budgetModal}
        setBudgetModal={setBudgetModal}
        userCategories={userCategories}
        date={date}
        handleBudget={handleBudget}
      />
    </Grid>
  );
}
