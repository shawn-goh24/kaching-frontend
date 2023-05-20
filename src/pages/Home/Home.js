import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Tab, Box, Fab, Tooltip } from "@mui/material";
import PieChart from "./PieChart.js";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import useMediaQuery from "../../hooks/useMediaQuery";
import TransactionCol from "./TransactionCol.js";
import BudgetList from "./BudgetList.js";
import { Button } from "@nextui-org/react";
import BudgetModal from "../../components/form/BudgetModal.js";
import AddIcon from "@mui/icons-material/Add";
import MonthSelection from "./MonthSelection.js";

export default function Home({ currUser, accessToken }) {
  const [date, setDate] = useState(new Date());
  const [tabValue, setTabValue] = useState("1");
  const [budgetModal, setBudgetModal] = useState(false);
  const [userCategories, setUserCategories] = useState("");
  const [transactions, setTransactions] = useState("");
  const [budgets, setBudgets] = useState("");
  const [openAddTransactionModal, setOpenAddTransactionModal] = useState(false);
  // check if screen is md or lower
  const isSmallScreen = useMediaQuery("(max-width: 960px)");

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

  // handle tab value to change between expense/income piechart tab
  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

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
        <TabContext
          value={tabValue}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Expense" value="1" />
              <Tab label="Income" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <PieChart transactions={transactions} isExpense={true} />
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <PieChart transactions={transactions} isExpense={false} />
            </Box>
          </TabPanel>
        </TabContext>
        <BudgetList
          budgets={budgets}
          setBudgets={setBudgets}
          transactions={transactions}
          userCategories={userCategories}
          accessToken={accessToken}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>
          <Button onClick={() => setBudgetModal(true)}>Add new budget</Button>
        </Box>
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
      <Box
        sx={{
          position: "fixed",
          bottom: 62,
          right: 62,
          zIndex: 1,
        }}
      >
        <Tooltip title="Add Transaction" placement="top-start">
          <Fab
            onClick={() => {
              setOpenAddTransactionModal(true);
            }}
            color="secondary"
            aria-label="Add"
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
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
