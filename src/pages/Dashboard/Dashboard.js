import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Card } from "@nextui-org/react";
import React from "react";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PaymentIcon from "@mui/icons-material/Payment";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import YtdLineChart from "./YtdLineChart";
import Top10Expenses from "./Top10Expenses";

export default function Dashboard() {
  const MockItem = (text, amount, icon) => {
    return (
      <Card>
        <Card.Body>
          {icon}
          {amount} <br />
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

  return (
    <Box
      sx={{
        width: "100vw",
        // border: "1px solid red",
        marginY: "2%",
        marginX: "10%",
      }}
    >
      <Box
      // sx={{
      //   border: "1px solid blue",
      // }}
      >
        <Typography variant="h4">Dashboard</Typography>
        <Typography variant="subtitle">Welcome to your dashboard</Typography>
      </Box>
      <Grid container spacing={2} my={1}>
        <Grid item xs={4}>
          {MockItem("YTD Income", 4000, <LocalAtmIcon />)}
        </Grid>
        <Grid item xs={4}>
          {MockItem("YTD Expense", 2000, <PaymentIcon />)}
        </Grid>
        <Grid item xs={4}>
          {MockItem("Bills", 3, <NotificationsActiveIcon />)}
        </Grid>
      </Grid>
      <Grid container spacing={2} my={1}>
        <Grid item xs={6}>
          {MockItem2(<YtdLineChart />)}
        </Grid>
        <Grid item xs={6}>
          {MockItem2(<Top10Expenses />)}
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
