import { Box, Container, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Card } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PaymentIcon from "@mui/icons-material/Payment";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import YtdLineChart from "./YtdLineChart";
import Top10Expenses from "./Top10Expenses";
import axios from "axios";
import BillModal from "../../components/form/BillModal";
import AddIcon from "@mui/icons-material/Add";
import {
  currencyFormatter,
  getTransactionsByMonth,
  getYtdTotalExpense,
  getYtdTotalIncome,
  getTopExpensesByCat,
} from "../../utils/utils";
import BillCard from "./BillCard";

export default function Dashboard({ accessToken, currUser }) {
  const [ytdTransactions, setYtdTransactions] = useState();
  const [totalYtdExpense, setTotalYtdExpense] = useState(0);
  const [totalYtdIncome, setTotalYtdIncome] = useState(0);
  const [billReminders, setBillReminders] = useState();
  const [addBillModal, setAddBillModal] = useState(false);
  const [editBillModal, setEditBillModal] = useState(false);

  const [tmp, setTmp] = useState();

  useEffect(() => {
    getYtdTransactions();
    getBillReminderApi();
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
    }
  };

  const MockItem = (text, amount, icon) => {
    return (
      <Card>
        <Card.Body>
          {icon}
          {currencyFormatter(currUser.mainCurrency).format(amount)} <br />
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
  const MockItem3 = (chart) => {
    return (
      <Card>
        <Card.Header>Recent 5 Transactions</Card.Header>
        <Card.Body>{chart}</Card.Body>
      </Card>
    );
  };

  const recentTransactions = () => {
    return ytdTransactions
      ? ytdTransactions.map((transaction, index) => {
          if (index < 5) {
            return (
              <Card
                key={transaction.id}
                variant="bordered"
                css={{ margin: 3, width: "95%" }}
              >
                <Card.Body
                  css={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>{transaction.name}</div>
                  <div style={{ marginRight: "50px" }}>
                    {currencyFormatter(currUser.mainCurrency).format(
                      transaction.amount
                    )}
                  </div>
                </Card.Body>
              </Card>
            );
          }
        })
      : undefined;
  };
  const billList = () => {
    return billReminders.map((bill) => {
      return (
        <BillCard
          key={bill.id}
          bill={bill}
          handleDelete={handleDelete}
          handleOpenEditBillModal={handleOpenEditBillModal}
        />
      );
    });
  };

  const getBillReminderApi = async () => {
    if (accessToken) {
      const response = await axios.get(
        `http://localhost:8080/bill/${currUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Bill reminders", response.data);
      setBillReminders(response.data);
    }
  };

  const handleDelete = async (billId) => {
    if (accessToken) {
      const response = await axios.delete(
        `http://localhost:8080/bill/${currUser.id}/${billId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Bill reminders", response.data);
      setBillReminders(response.data);
    }
  };
  const handleOpenEditBillModal = (bill) => {
    setTmp(bill);
    setEditBillModal(true);
  };
  const handleEdit = async (billId, name, date) => {
    if (accessToken) {
      const response = await axios.put(
        `http://localhost:8080/bill/${currUser.id}/${billId}`,
        {
          name: name,
          amount: 0,
          date: date,
          interval: "Monthly",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setBillReminders(response.data);
    }
  };
  const handleAdd = async (name, date) => {
    if (accessToken) {
      const response = await axios.post(
        `http://localhost:8080/bill/new`,
        {
          userId: currUser.id,
          name: name,
          amount: 0,
          date: date,
          interval: "Monthly",
          user: currUser,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setBillReminders([...billReminders, response.data]);
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={
        {
          // width: "100vw",
          // marginY: "2%",
          // marginX: "15%",
        }
      }
    >
      <Box>
        <Typography variant="h4">Dashboard</Typography>
        <Typography variant="subtitle">Welcome to your dashboard</Typography>
      </Box>
      <Grid container spacing={2} my={1}>
        <Grid item xs={12} sm={4}>
          {MockItem("YTD Income", totalYtdIncome, <LocalAtmIcon />)}
        </Grid>
        <Grid item xs={12} sm={4}>
          {MockItem("YTD Expense", totalYtdExpense, <PaymentIcon />)}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <Card.Body>
              <NotificationsActiveIcon />
              {billReminders ? billReminders.length : undefined}
              <br />
              Bills
            </Card.Body>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} my={1}>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          {MockItem2(
            <Top10Expenses
              topExpensesByCat={
                ytdTransactions ? getTopExpensesByCat(ytdTransactions) : []
              }
            />
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2} my={1}>
        <Grid item xs={12} sm={7}>
          {MockItem3(recentTransactions())}
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card css={{ height: "100%" }}>
            <Card.Header>
              Bill Reminders
              <IconButton onClick={() => setAddBillModal(true)}>
                <AddIcon />
              </IconButton>
            </Card.Header>
            <Card.Body
              css={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
              {billReminders ? billList() : undefined}
            </Card.Body>
          </Card>
        </Grid>
      </Grid>
      <BillModal
        title="Add"
        billModal={addBillModal}
        setBillModal={setAddBillModal}
        handleAdd={handleAdd}
      />
      <BillModal
        title="Edit"
        billModal={editBillModal}
        setBillModal={setEditBillModal}
        bill={tmp}
        handleEdit={handleEdit}
      />
    </Container>
  );
}
