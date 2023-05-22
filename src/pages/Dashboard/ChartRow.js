import Grid from "@mui/material/Unstable_Grid2";
import { Card } from "@nextui-org/react";
import React from "react";
import { getTopExpensesByCat, getTransactionsByMonth } from "../../utils/utils";
import YtdLineChart from "./YtdLineChart";
import Top10Expenses from "./Top10Expenses";

export default function ChartRow({ ytdTransactions }) {
  return (
    <Grid container spacing={2} my={1}>
      <Grid item xs={12} sm={6}>
        <Card>
          <Card.Body>
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
          </Card.Body>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <Card.Body>
            <Top10Expenses
              topExpensesByCat={
                ytdTransactions ? getTopExpensesByCat(ytdTransactions) : []
              }
            />
          </Card.Body>
        </Card>
      </Grid>
    </Grid>
  );
}
