import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useState } from "react";
import TotalAmountCard from "./components/TotalAmountCard";
import TotalBillReminderCard from "./components/TotalBillReminderCard";
import { getYtdTotalExpense, getYtdTotalIncome } from "../../utils/utils";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PaymentIcon from "@mui/icons-material/Payment";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

export default function AmountBillRow({ ytdTransactions, billReminders }) {
  const [totalYtdExpense, setTotalYtdExpense] = useState(0);
  const [totalYtdIncome, setTotalYtdIncome] = useState(0);

  useEffect(() => {
    if (ytdTransactions) {
      setTotalYtdExpense(getYtdTotalExpense(ytdTransactions));
      setTotalYtdIncome(getYtdTotalIncome(ytdTransactions));
    }
  }, [ytdTransactions]);

  return (
    <Grid container spacing={2} my={1}>
      <Grid item="true" xs={12} sm={4}>
        <TotalAmountCard
          text="YTD Income"
          amount={totalYtdIncome}
          icon={<LocalAtmIcon fontSize="large" sx={{ color: "#587EDE" }} />}
        />
      </Grid>
      <Grid item="true" xs={12} sm={4}>
        <TotalAmountCard
          text="YTD Expense"
          amount={totalYtdExpense}
          icon={<PaymentIcon fontSize="large" sx={{ color: "#587EDE" }} />}
        />
      </Grid>
      <Grid item="true" xs={12} sm={4}>
        <TotalBillReminderCard
          icon={
            <NotificationsActiveIcon
              fontSize="large"
              sx={{ color: "#587EDE" }}
            />
          }
          count={billReminders ? billReminders.length : 0}
        />
      </Grid>
    </Grid>
  );
}
