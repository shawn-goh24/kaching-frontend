import { Box, Container, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import BillModal from "../../components/form/BillModal";
import AmountBillRow from "./AmountBillRow";
import ChartRow from "./ChartRow";
import TransactionBillRow from "./TransactionBillRow";
import { AccessTokenContext, CurrUserContext } from "../../App";

export default function Dashboard() {
  const [ytdTransactions, setYtdTransactions] = useState();
  const [billReminders, setBillReminders] = useState();
  const [addBillModal, setAddBillModal] = useState(false);
  const [editBillModal, setEditBillModal] = useState(false);

  const accessToken = useContext(AccessTokenContext);
  const currUser = useContext(CurrUserContext);

  const [tmp, setTmp] = useState();

  useEffect(() => {
    getYtdTransactionsApi();
    getBillReminderApi();
  }, [accessToken]);

  // get all user transactions for the current year
  const getYtdTransactionsApi = async () => {
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

  // get all bill reminders from database
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

      setBillReminders(response.data);
    }
  };

  // open edit bill modal
  const handleOpenEditBillModal = (bill) => {
    setTmp(bill);
    setEditBillModal(true);
  };

  // handle deletion of bills
  const handleDeleteBill = async (billId) => {
    if (accessToken) {
      const response = await axios.delete(
        `http://localhost:8080/bill/${currUser.id}/${billId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setBillReminders(response.data);
    }
  };

  // handle the edit of bill
  const handleEditBill = async (billId, name, date) => {
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

  // handle add new bill reminder
  const handleAddBill = async (name, date) => {
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
    <Container maxWidth="xl" sx={{ minHeight: "100vh" }}>
      <Box sx={{ pt: 3 }}>
        <Typography variant="h4">
          <strong>Dashboard</strong>
        </Typography>
        <Typography variant="subtitle" sx={{ color: "#587EDE" }}>
          Welcome to your dashboard
        </Typography>
      </Box>
      <AmountBillRow
        ytdTransactions={ytdTransactions}
        billReminders={billReminders}
      />
      <ChartRow ytdTransactions={ytdTransactions} />
      <TransactionBillRow
        ytdTransactions={ytdTransactions}
        setAddBillModal={setAddBillModal}
        billReminders={billReminders}
        handleDelete={handleDeleteBill}
        handleOpenEditBillModal={handleOpenEditBillModal}
      />
      <BillModal
        title="Add"
        billModal={addBillModal}
        setBillModal={setAddBillModal}
        handleAdd={handleAddBill}
      />
      <BillModal
        title="Edit"
        billModal={editBillModal}
        setBillModal={setEditBillModal}
        bill={tmp}
        handleEdit={handleEditBill}
      />
    </Container>
  );
}
