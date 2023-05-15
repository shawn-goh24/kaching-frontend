import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Card } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PaymentIcon from "@mui/icons-material/Payment";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import YtdLineChart from "./YtdLineChart";
import Top10Expenses from "./Top10Expenses";
import axios from "axios";
import {
  currencyFormatter,
  getTransactionsByMonth,
  getYtdTotalExpense,
  getYtdTotalIncome,
  getTopExpensesByCat,
} from "../../utils/utils";

export default function Dashboard({ accessToken, currUser }) {
  const [ytdTransactions, setYtdTransactions] = useState();
  const [totalYtdExpense, setTotalYtdExpense] = useState(0);
  const [totalYtdIncome, setTotalYtdIncome] = useState(0);

  useEffect(() => {
    getYtdTransactions();
  }, [accessToken]);

  useEffect(() => {
    if (ytdTransactions) {
      setTotalYtdExpense(getYtdTotalExpense(ytdTransactions));
      setTotalYtdIncome(getYtdTotalIncome(ytdTransactions));
    }
  }, [ytdTransactions]);

  // get all user transactions
  const getYtdTransactions = async () => {
    const currentYear = new Date().getFullYear();
    if (accessToken) {
      let user = await axios.get(
        `http://localhost:8080/transaction/${currUser.id}/${currentYear}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setYtdTransactions(user.data);
      console.log("YTD Transactions", user.data);
    }
  };

  const MockItem = (text, amount, icon) => {
    return (
      <Card>
        <Card.Body>
          {icon}
          {currencyFormatter.format(amount)} <br />
          {text}
        </Card.Body>
      </Card>
    );
  };
  const MockItem2 = (chart) => {
    return (
      <Card>
        <Card.Body>{chart}</Card.Body>
      </Card>
    );
  };

  if (ytdTransactions) {
    getTopExpensesByCat(ytdTransactions);
  }

  return (
    <Box
      sx={{
        width: "100vw",
        marginY: "2%",
        marginX: "10%",
      }}
    >
      <Box>
        <Typography variant="h4">Dashboard</Typography>
        <Typography variant="subtitle">Welcome to your dashboard</Typography>
      </Box>
      <Grid container spacing={2} my={1}>
        <Grid item xs={4}>
          {MockItem("YTD Income", totalYtdIncome, <LocalAtmIcon />)}
        </Grid>
        <Grid item xs={4}>
          {MockItem("YTD Expense", totalYtdExpense, <PaymentIcon />)}
        </Grid>
        <Grid item xs={4} sx={{ backgroundColor: "yellow" }}>
          {MockItem("Bills", 3, <NotificationsActiveIcon />)}
        </Grid>
      </Grid>
      <Grid container spacing={2} my={1}>
        <Grid item xs={6}>
          {MockItem2(
            <YtdLineChart
              expenseLine={
                ytdTransactions
                  ? getTransactionsByMonth(ytdTransactions, 1)
                  : []
              }
              incomeLine={
                ytdTransactions
                  ? getTransactionsByMonth(ytdTransactions, 2)
                  : []
              }
            />
          )}
        </Grid>
        <Grid item xs={6}>
          {MockItem2(
            <Top10Expenses
              topExpensesByCat={
                ytdTransactions ? getTopExpensesByCat(ytdTransactions) : [{}]
              }
            />
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2} my={1}>
        <Grid item xs={7}>
          {MockItem("Recent 10 Transactions")}
        </Grid>
        <Grid item xs={5}>
          {MockItem("Bill Reminders")}
        </Grid>
      </Grid>
    </Box>
  );
}
