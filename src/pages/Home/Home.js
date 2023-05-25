import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Box, Typography } from "@mui/material";
import TransactionCol from "./TransactionCol.js";
import BudgetModal from "../../components/form/BudgetModal.js";
import MonthSelection from "./MonthSelection.js";
import BudgetExpenseCol from "./BudgetExpenseCol.js";
import AddCategoryFab from "./AddCategoryFab.js";
import Loader from "../../components/ui/Loader.js";
import useMediaQuery from "../../hooks/useMediaQuery.js";

export default function Home({ currUser, accessToken }) {
  const [date, setDate] = useState(new Date());
  const [budgetModal, setBudgetModal] = useState(false);
  const [userCategories, setUserCategories] = useState("");
  const [transactions, setTransactions] = useState("");
  const [budgets, setBudgets] = useState("");
  const [openAddTransactionModal, setOpenAddTransactionModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const isSmallHeight = useMediaQuery("(max-height: 960px)");

  // upon loaded, get transaction/budget/categories from db
  useEffect(() => {
    getUserTransactionsApi();
    getBudgetApi();
    getCategoriesApi();
  }, [accessToken, date]);

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
  const handleAddBudget = async (userId, category, date, amount) => {
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

  //  useeffects to check if loading, and set timeout to display loader
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);
  useEffect(() => {
    setLoading(!loading);
    setTimeout(() => {
      setLoading(!loading);
    }, 1000);
  }, []);

  if (loading) return <Loader />;

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
      <Grid item xs={12} md={4} sx={{ height: "95%" }}>
        <BudgetExpenseCol
          transactions={transactions}
          budgets={budgets}
          userCategories={userCategories}
          accessToken={accessToken}
          setBudgetModal={setBudgetModal}
          getBudgetApi={getBudgetApi}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ maxHeight: `${isSmallHeight ? "95%" : "100%"}` }}
      >
        <h2 style={{ marginBottom: "10px" }}>Transactions</h2>
        <Box
          sx={{
            maxHeight: `${isSmallHeight ? "95%" : "100%"}`,
            overflowY: "scroll",
          }}
        >
          {transactions.length > 0 ? (
            <TransactionCol
              currUser={currUser}
              accessToken={accessToken}
              openAddTransactionModal={openAddTransactionModal}
              setOpenAddTransactionModal={setOpenAddTransactionModal}
              date={date}
              transactions={transactions}
              setTransactions={setTransactions}
            />
          ) : (
            <Typography>No transactions this month</Typography>
          )}
        </Box>
      </Grid>
      <AddCategoryFab setOpenAddTransactionModal={setOpenAddTransactionModal} />
      <BudgetModal
        title="Add"
        budgetModal={budgetModal}
        setBudgetModal={setBudgetModal}
        userCategories={userCategories}
        date={date}
        handleBudget={handleAddBudget}
      />
    </Grid>
  );
}
