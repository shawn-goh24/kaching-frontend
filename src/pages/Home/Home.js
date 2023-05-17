import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { months } from "../../data/constants.js";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Grid, Tab, Typography, Box, IconButton } from "@mui/material";
import PieChart from "./PieChart.js";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import useMediaQuery from "../../hooks/useMediaQuery";
import BudgetBar from "./BudgetBar.js";
import TransactionCol from "./TransactionCol.js";

import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BudgetList from "./BudgetList.js";
import { Button } from "@nextui-org/react";
import BudgetModal from "../../components/form/BudgetModal.js";

export default function Home(props) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [date, setDate] = useState(new Date());
  const [value, setValute] = useState("1");
  const [currUser, setCurrUser] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [budgetModal, setBudgetModal] = useState(false);
  const [userCategories, setUserCategories] = useState("");
  const [budget, setBudget] = useState("");

  const [transactions, setTransactions] = useState("");
  const [budgets, setBudgets] = useState("");

  // speed dial
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const handleSpeedDialOpen = () => setOpenSpeedDial(true);
  const handleSpeedDialClose = () => setOpenSpeedDial(false);
  const [openAddTransactionModal, setOpenAddTransactionModal] = useState(false);

  // check if screen is md or lower
  const isSmallScreen = useMediaQuery("(max-width: 960px)");

  const getUserApi = async () => {
    let token = await getAccessTokenSilently();
    console.log(token);
    // check user
    let request = await axios.post(
      "http://localhost:8080/user/home",
      {
        user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(request.data);
    setAccessToken(token);
    setCurrUser(request.data);
    // get user
  };
  // get all transactions from the user
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
      // console.log(user.data);
      setTransactions(user.data);
    }
  };
  // get all budget from the user
  const getUserBudgetApi = async () => {
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
      // console.log(user.data);
      // console.log("user.data");
      setBudgets(user.data);
    }
  };
  // get all categories from user
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
      // console.log(categories.data);
      setUserCategories(categories.data);
    }
  };

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

  useEffect(() => {
    if (isAuthenticated && user) {
      getUserApi();
      // getUserTransactionsApi();
    }
  }, [isAuthenticated]);

  // get transaction
  useEffect(() => {
    getUserTransactionsApi();
    getUserBudgetApi();
    getCategoriesApi();
  }, [accessToken, date]);

  const handleChange = (e, newValue) => {
    setValute(newValue);
  };

  const prevMonth = (date) => {
    const tmp = new Date(date);
    let month = tmp.getMonth() - 1;
    let year = tmp.getFullYear();
    if (month < 0) {
      month = 11;
      year = tmp.getFullYear() - 1;
    }
    setDate(new Date(year, month));
  };
  const nextMonth = (date) => {
    const tmp = new Date(date);
    let month = tmp.getMonth() + 1;
    let year = tmp.getFullYear();
    if (month < 0) {
      month = 11;
      year = tmp.getFullYear() + 1;
    }
    setDate(new Date(year, month));
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
        <IconButton sx={{ marginRight: 10 }} onClick={() => prevMonth(date)}>
          <NavigateBeforeIcon />
        </IconButton>
        <Typography variant={isSmallScreen ? "h4" : "h2"}>
          {months[date.getMonth()]} {date.getFullYear()}
        </Typography>
        <IconButton sx={{ marginLeft: 10 }} onClick={() => nextMonth(date)}>
          <NavigateNextIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} md={4}>
        <TabContext
          value={value}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
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
      <Backdrop open={openSpeedDial} sx={{ zIndex: "999" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleSpeedDialClose}
        onOpen={handleSpeedDialOpen}
        open={openSpeedDial}
      >
        <SpeedDialAction
          key="addTransaction"
          icon={<ReceiptIcon />}
          tooltipTitle="Add Transaction"
          onClick={() => {
            console.log("Open");
            setOpenAddTransactionModal(true);
            handleSpeedDialClose();
          }}
        />
        {/* <SpeedDialAction
          key="addCategory"
          icon={<FileCopyIcon />}
          tooltipTitle="Add Category"
          onClick={handleSpeedDialClose}
        /> */}
      </SpeedDial>
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
